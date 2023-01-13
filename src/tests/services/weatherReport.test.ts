import fetch, { Response } from 'node-fetch'
import Location from '../../models/location';
import WeatherReport from '../../models/weatherReport';
import { getWeatherReport } from '../../services/weatherReport';

jest.mock('node-fetch');
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('Get Weather Report',()=>{
    test('By lat & lng values',()=>{
        const json = jest.fn() as jest.MockedFunction<any>;
        const result = {
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
        }
        json.mockResolvedValue(result);
        mockedFetch.mockResolvedValue({ ok: true, json } as Response);
        return getWeatherReport(new Location([{"longitude": "80.3083", "latitude": "16.3375"}])).then((data:WeatherReport)=>{
          // console.log(data)
          expect(data.weather[0].main).toEqual("Clouds")
        })
    })
})