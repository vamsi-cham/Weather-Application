type geo ={
  lat : string;
  lng : string
}
type address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: geo;
};
export default class UsersModel {
  constructor(
    public id: number,
    public name: string,
    public username: string,
    public email: string,
    public address: address,
    public phone: string,
    public website: string,
    public company: { name: string; catchPhrase: string; bs: string }, // company type
  ) {}
}
