import { NextFunction } from 'express';
import { weatherAPI, weatherApikey } from "../config/config";
import fetch from 'node-fetch';
import Location from "../models/location";
import WeatherReport from "../models/weatherReport";

export const getWeatherReport = async (Location:Location) => {
  const report: WeatherReport = await(
    await fetch(`${weatherAPI}?lat=${Location.places[0].latitude}&lon=${Location.places[0].longitude}&appid=${weatherApikey}`)
    ).json();
  return report;                        
}
