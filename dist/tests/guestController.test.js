"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const location_1 = __importDefault(require("../models/location"));
const locationFinder_1 = require("../services/locationFinder");
const weatherReport_1 = require("../services/weatherReport");
jest.mock('../services/locationFinder', () => ({
    locationFinder: jest.fn()
}));
jest.mock('../services/weatherReport', () => ({
    getWeatherReport: jest.fn()
}));
const mockedLocationFinder = locationFinder_1.locationFinder;
const mockedWeatherReport = weatherReport_1.getWeatherReport;
describe('Get Weather Report By Location', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should get a weather report by pincode', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedLocationFinder.mockResolvedValue(new location_1.default([{ "longitude": "80.3083", "latitude": "16.3375" }]));
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
        });
        const res = yield (0, supertest_1.default)(app_1.default).get('/guest?pincode=522002');
        console.log(res.error);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        // expect(mockedLocationFinder).toBeCalledTimes(1);
        // expect(mockedWeatherReport).toBeCalledTimes(1);
    }));
    test('invalid request error validation failed test', () => __awaiter(void 0, void 0, void 0, function* () {
        // const res = await request(app).get("/api/v1/exchangeRate/a1ustralia/100");
        // expect(res.statusCode).toEqual(422);
        // expect(mockedCurrencyCode).toBeCalledTimes(0);
        // expect(mockedExchangeRate).toBeCalledTimes(0);
    }));
    test('throwing 404 error when no country found test', () => __awaiter(void 0, void 0, void 0, function* () {
        // let err:ResponseHttpException = new ResponseHttpException({status:404,statusText:"Not Found"})
        // mockedCurrencyCode.mockRejectedValue(err);
        // mockedExchangeRate.mockResolvedValue({"data":{
        //     "result": "success",
        //     "documentation": "https://www.exchangerate-api.com/docs",
        //     "terms_of_use": "https://www.exchangerate-api.com/terms",
        //     "time_last_update_unix": 1672531201,
        //     "time_last_update_utc": "Sun, 01 Jan 2023 00:00:01 +0000",
        //     "time_next_update_unix": 1672617601,
        //     "time_next_update_utc": "Mon, 02 Jan 2023 00:00:01 +0000",
        //     "base_code": "INR",
        //     "target_code": "AUD",
        //     "conversion_rate": 0.01778,
        //     "conversion_result": 1.778
        // }})
        // const res = await request(app).get("/api/v1/exchangeRate/rteyuio/100");
        // expect(res.statusCode).toEqual(404);
        // expect(mockedCurrencyCode).toBeCalledTimes(1);
        // expect(mockedExchangeRate).toBeCalledTimes(0);
    }));
    test('test route not found', () => __awaiter(void 0, void 0, void 0, function* () {
        // const res = await request(app).get("/xyz/not/exists");
        // expect(res.statusCode).toEqual(404);
    }));
});
