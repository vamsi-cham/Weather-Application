import { NextFunction, Request, Response } from 'express';
import logger from '../../logger';
import Location from '../../models/location';
import WeatherReport from '../../models/weatherReport';
import { locationFinder } from '../../services/locationFinder';
import { getWeatherReport } from '../../services/weatherReport';

export type RequestSearchQuery={
  country:string,
  pincode:string,
  state:string,
  city:string
}

export const guestReport = async (req:Request,res:Response,next:NextFunction)=>{
  const query = req.query as RequestSearchQuery;
  if(!query.state && !query.city && !query.pincode){
    logger.error('Enter pincode to get the weather report.');
    return res.status(400).json({message:'Enter pincode to get the weather report.'});
  }
  else if((!query.state || !query.city)&& !query.pincode){
   logger.error('City or State is missing.');
   return res.status(400).json({message:'City or State is missing.'});
  }
  
  try{
    //First open api
    const Location:Location= await locationFinder(query);
    if(!Location.places) {
      logger.error('No weather report available at this location. Try other location');
      return res.status(404).json({
        message:'No weather report available at this location. Try other location'
      });
    }
    
    //Second open api
    const Report: WeatherReport = await getWeatherReport(Location);
    if(Report.cod!==200) {
      logger.error(Report.message);
      return res.status(Report.cod).json({message:Report.message});
    }       
    res.status(200).json({
       message: 'Search completed', 
       data:Report,
    });
  } catch (err:any){
    logger.error(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }                                                          
}
