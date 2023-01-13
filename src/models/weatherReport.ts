
type weather ={
  main : string,
  description : string,
}
type main = {
  temp:number,
  feels_like:number,
  temp_min:number,
  temp_max:number,
  pressure:number,
  humidity:number,
  sea_level:number,
  grnd_level:number
}
type wind ={
  speed:number,
  deg:number,
  gust:number
}
export default class WeatherReport {
  constructor(
    public weather: weather[],
    public main: main,
    public wind:wind,
    public cod:number,
    public message:string
  ) {}
}