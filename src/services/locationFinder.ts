import { RequestSearchQuery } from "../controllers/guest/guestController";
import { locationAPI } from "../config/config";
import fetch from 'node-fetch';
import Location from "../models/location";
export const locationFinder = async (query:RequestSearchQuery) => {

  const country = (!query.country) ? "in" : query.country;

  const location :Location= ((!query.city || !query.state) ) ? 
                            await (await fetch(`${locationAPI}/${country}/${query.pincode}`)).json() : 
                            await (await fetch(`${locationAPI}/${country}/${query.state}/${query.city}`)).json();

  return location;                         
}
