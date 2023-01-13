type place ={
  latitude : string;
  longitude : string;
}
export default class Location {
  constructor(
    public places: place[],
  ) {
    this.places = places;
  }
}