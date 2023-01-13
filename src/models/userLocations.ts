
export type geo ={
  lat : string;
  lng : string
}
export default class UserLocations {
  constructor(
    public userid: number,
    public username: string,
    public primary_location: geo,
    public all_locations: geo[],
  ) {}
}