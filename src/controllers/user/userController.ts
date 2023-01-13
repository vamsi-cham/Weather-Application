import fetch from 'node-fetch';
import UserLocations, { geo } from '../../models/userLocations';
import { NextFunction, Request, Response } from 'express';
import WeatherReport from '../../models/weatherReport';
import { weatherAPI, weatherApikey } from '../../config/config';
import { loggedUsers, usersLocations } from '../../middleware/user/user-locations';

type weather ={
  username:string,
  main:string,
  temp:number,
  feels_like:number
}
export const allweather_reports = async(req:Request,res:Response,next:NextFunction)=>{
  let index: number= usersLocations.findIndex(
                                  (userLocations:UserLocations) => 
                                  userLocations.userid.toString()===req.params.userId
                                  );
  if(index===-1){
    return res.status(404).json({  message: 'User not found'});
  }                             
  const user_locations = usersLocations[index].all_locations;
  const weather_reports: weather[] =[];
  // const user = loggedUsers.find((user:UsersModel)=>user.id.toString()===req.params.userId);
  for(let i=0; i<user_locations.length;i++){
    await fetch(`${weatherAPI}?lat=${user_locations[i].lat}&lon=${user_locations[i].lng}&appid=${weatherApikey}`)
    .then(response => response.json())
    .then(
      (report:WeatherReport) => {
        if(report.cod!==200) {
          return res.status(report.cod).json({message:report.message});
          }  
        weather_reports.push({
          username: usersLocations[index].username,
          main: report.weather[0].main,
          temp: report.main.temp,
          feels_like: report.main.feels_like
        });
      }
    ).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });        
  }
  res.status(200).json({  message: 'User weather reports', data: weather_reports });
}

export const detailed_report = async (req:Request,res:Response,next:NextFunction) => {

  let index: number= usersLocations.findIndex(
                      (userLocations:UserLocations) => 
                      userLocations.userid.toString()===req.params.userId
                      );
  if(index===-1){
    return res.status(404).json({  message: 'User not found'});
  } 

  const primary_location = usersLocations[index].primary_location;
  const query = req.query as geo;

  if(query.lat && query.lng){
    const userlocation = usersLocations[index].all_locations.
    find((location:geo) =>(location.lat===query.lat && location.lng===query.lng));
    if(!userlocation){
      return res.status(404).json({  message: 'User location not found'});
    }
  }
  
  const Report: WeatherReport = (!query.lat || !query.lng) ? 
                      await fetch(`${weatherAPI}?lat=${primary_location.lat}&lon=${primary_location.lng}&appid=${weatherApikey}`)
                      .then(response => response.json())
                      .then(
                        report => {return report}
                      ).catch(err => {
                        if (!err.statusCode) {
                          err.statusCode = 500;
                        }
                        next(err);
                      })  :   
                      await fetch(`${weatherAPI}?lat=${query.lat}&lon=${query.lng}&appid=${weatherApikey}`)
                      .then(response => response.json())
                      .then(
                        report => {return report}
                      ) .catch(err => {
                        if (!err.statusCode) {
                          err.statusCode = 500;
                        }
                        next(err);
                      });                                  
  if(Report.cod!==200) {
     return res.status(Report.cod).json({message:Report.message});
  } 
  res.status(200).json({ message: 'User Detailed Weather Report', data:Report });
}