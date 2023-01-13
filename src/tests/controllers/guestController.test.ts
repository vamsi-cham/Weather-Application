import request from "supertest";
import app from "../../app";
import Location from "../../models/location";
import { locationFinder } from '../../services/locationFinder';
import { getWeatherReport } from '../../services/weatherReport';

jest.mock('../../services/locationFinder',()=>({
    locationFinder:jest.fn()
}));
jest.mock('../../services/weatherReport',()=>({
    getWeatherReport:jest.fn()
}));
const mockedLocationFinder = locationFinder as jest.Mock
const mockedWeatherReport = getWeatherReport as jest.Mock

describe('Get Weather Report By Location',()=>{

    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should get a weather report by pincode', async()=>{
        mockedLocationFinder.mockResolvedValue(new Location([{"longitude": "80.3083", "latitude": "16.3375"}]));
        mockedWeatherReport.mockResolvedValue({
            "weather": [
              {
                "id": 802,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03d"
              }
            ],
            "main": {
              "temp": 300.44,
              "feels_like": 301.52,
              "temp_min": 300.44,
              "temp_max": 300.44,
              "pressure": 1015,
              "humidity": 59,
              "sea_level": 1015,
              "grnd_level": 1008
            },
            "wind": {
              "speed": 5.51,
              "deg": 114,
              "gust": 5.96
            },
            "cod": 200
        })
        const res = await request(app).get('/guest?pincode=522002');
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(mockedLocationFinder).toBeCalledTimes(1);
        expect(mockedWeatherReport).toBeCalledTimes(1);
    })
    test('should get a weather report by state & city in different country', async()=>{
        mockedLocationFinder.mockResolvedValue(new Location([{"longitude": "80.3083", "latitude": "16.3375"}]));
        mockedWeatherReport.mockResolvedValue({
            "weather": [
              {
                "id": 802,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03d"
              }
            ],
            "main": {
              "temp": 300.44,
              "feels_like": 301.52,
              "temp_min": 300.44,
              "temp_max": 300.44,
              "pressure": 1015,
              "humidity": 59,
              "sea_level": 1015,
              "grnd_level": 1008
            },
            "wind": {
              "speed": 5.51,
              "deg": 114,
              "gust": 5.96
            },
            "cod": 200
        })
        const res = await request(app).get('/guest?state=ap&city=guntur');
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
        expect(mockedLocationFinder).toBeCalledTimes(1);
        expect(mockedWeatherReport).toBeCalledTimes(1);
    })
    test('should need a location to fetch',async()=>{
        let res = await request(app).get('/guest');
        expect(res.statusCode).toEqual(400)
        expect(res.body).toMatchObject({message:'Enter pincode to get the weather report.'})
        expect(mockedLocationFinder).toBeCalledTimes(0);
        expect(mockedWeatherReport).toBeCalledTimes(0);
    })
    test('state or city is expected',async()=>{
        let res = await request(app).get('/guest/?state=ap');
        // console.log(res.body);
        expect(res.statusCode).toEqual(400)
        expect(res.body).toMatchObject({message:'City or State is missing.'})
        expect(mockedLocationFinder).toBeCalledTimes(0);
        expect(mockedWeatherReport).toBeCalledTimes(0);
    })    
    test('Incorrect location',async () => {
        mockedLocationFinder.mockReturnValue({});
        mockedWeatherReport.mockResolvedValue({
            "weather": [
              {
                "id": 802,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03d"
              }
            ],
            "main": {
              "temp": 300.44,
              "feels_like": 301.52,
              "temp_min": 300.44,
              "temp_max": 300.44,
              "pressure": 1015,
              "humidity": 59,
              "sea_level": 1015,
              "grnd_level": 1008
            },
            "wind": {
              "speed": 5.51,
              "deg": 114,
              "gust": 5.96
            },
            "cod": 200
        })
        let res = await request(app).get('/guest/?pincode=5220022');
        expect(res.statusCode).toEqual(404)
        expect(mockedLocationFinder).toBeCalledTimes(1);
        expect(mockedWeatherReport).toBeCalledTimes(0);
        expect(res.body).toMatchObject({
            message:'No weather report available at this location. Try other location'
        })
    })
    test('Weather api key error',async () => {  
      mockedLocationFinder.mockResolvedValue(new Location([{"longitude": "80.3083", "latitude": "16.3375"}]));
      mockedWeatherReport.mockResolvedValue({"cod":401, "message": "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."})
      const res = await request(app).get("/guest?pincode=522002");
      expect(res.statusCode).toEqual(401);
    })
    test('Incorrect path',async () => {   
        const res = await request(app).get("/guest/abc");
        expect(res.statusCode).toEqual(500);
    })
    test('Unexpected Error',async () => {   
      mockedLocationFinder.mockRejectedValue(new Error("error recorded"))
      const res = await request(app).get("/guest?pincode=522002");
      expect(res.statusCode).toEqual(500);
  })
})