import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
import UsersModel from '../../models/user';
import UserLocations from '../../models/userLocations';

export const loggedUsers:UsersModel[]=[];
export const usersLocations:UserLocations[]=[];

const user_locations = async (req:Request,res:Response,next:NextFunction) => {
  await fetch(`https://jsonplaceholder.typicode.com/users`)
   .then( response => response.json())
   .then(
     (users:UsersModel[]) => {
       for(let i=0; i<users.length; i++){
         loggedUsers.push(users[i]);
         let userLocation: UserLocations = {
           userid:users[i].id,
           username:users[i].username,
           primary_location :users[i].address.geo,
           all_locations : [users[i].address.geo],
         };
         usersLocations.push(userLocation);
       }
     }
   ).catch(err => {
     if (!err.statusCode) {
       err.statusCode = 500;
     }
     next(err);
   }); 
     next();
 }

 export default user_locations;