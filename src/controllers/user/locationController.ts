import UserLocations,{geo} from '../../models/userLocations';
import { NextFunction, Request, Response } from 'express';
import { RequestSearchQuery } from '../guest/guestController';
import { usersLocations } from '../../middleware/user/user-locations';
import { locationFinder } from '../../services/locationFinder';


export const add_location = async(req:Request,res:Response,next:NextFunction) =>{
  let index: number= usersLocations.findIndex(
                      (userLocations:UserLocations) => 
                      userLocations.userid===req.body.userId); 
  if(index===-1){
    return res.status(404).json({  message: 'User not found'});
  }
  const query = req.query as RequestSearchQuery;
  if(!query.state && !query.city && !query.pincode){
    return res.status(400).json({message:'Enter pincode to get the weather report.'});
  }
  else if((!query.state || !query.city)&& !query.pincode){
   return res.status(400).json({message:'City or State is missing.'});
  }
  const Location:any= await locationFinder(query);

  if(!Location.places) {
    return res.status(404).json({
      message:'No weather report available at this location. Try other location'
    });
  }                        
  const coordinates: geo = {
    lat: Location.places[0].latitude,
    lng: Location.places[0].longitude
  };
  const all_locations = usersLocations[index].all_locations
  //check location already exists
  for(let i=0;i<all_locations.length;i++){
    if(coordinates.lat===all_locations[i].lat && coordinates.lng===all_locations[i].lng){
      return res.status(403).json({
        message: `This Location is already added for the userid: ${req.body.userId}`
       });  
    }
  }

  usersLocations[index].all_locations.push(coordinates); 
  res.status(200).json({ message: `Location added for the userid: ${req.body.userId}`, data: coordinates});                  
}

export const del_location = (req:Request,res:Response) =>{
  let index: number= usersLocations.
                    findIndex((userLocations:UserLocations) => userLocations.userid===req.body.userId); 
  if(index===-1){
    return res.status(404).json({  message: 'User not found'});
  }                  
  if(usersLocations[index].all_locations.length===1) {
    return res.status(409).json({ message: `Location can't be deleted for the userid: ${req.body.userId}, Atleast one required`});  
  }
  const params = req.params as geo;
  let all_locations = usersLocations[index].all_locations;
  const locations =all_locations.filter((location:geo) =>!(location.lat===params.lat 
                                          && location.lng===params.lng));
  if(all_locations.length===locations.length){
    return res.status(404).json({  message: 'User location not found'});
  }                                                                                
  if(params.lat === usersLocations[index].primary_location.lat 
    && params.lng=== usersLocations[index].primary_location.lng){
    usersLocations[index].primary_location = locations[0];
  }
  usersLocations[index].all_locations = locations;                                        
  res.status(200).json({ message: `Location deleted for the userid: ${req.body.userId}`,data: {lat: params.lat,lng:params.lng}});                  
}

export const primary_location = (req:Request,res:Response)=>{

  let index: number= usersLocations.findIndex((userLocations:UserLocations) => userLocations.userid===req.body.userId);
  if(index===-1){
    return res.status(404).json({  message: 'User not found'});
  } 
  const params = req.params as geo;
  const location: geo = {
    lat: params.lat,
    lng: params.lng
  }; 
  const userlocation = usersLocations[index].all_locations.
  find((location:geo) =>(location.lat===params.lat && location.lng===params.lng));

  if(!userlocation){
    return res.status(404).json({  message: 'User location not found'});
  }
  usersLocations[index].primary_location = location;
  res.status(200).json({ message: `Primary Location updated for the userid: ${req.body.userId}`,data: location});
}