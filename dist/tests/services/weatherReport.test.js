"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const location_1 = __importDefault(require("../../models/location"));
const weatherReport_1 = require("../../services/weatherReport");
jest.mock('node-fetch');
const mockedFetch = node_fetch_1.default;
describe('Get Weather Report', () => {
    test('By lat & lng values', () => {
        const json = jest.fn();
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
        };
        json.mockResolvedValue(result);
        mockedFetch.mockResolvedValue({ ok: true, json });
        return (0, weatherReport_1.getWeatherReport)(new location_1.default([{ "longitude": "80.3083", "latitude": "16.3375" }])).then((data) => {
            // console.log(data)
            expect(data.weather[0].main).toEqual("Clouds");
        });
    });
});
