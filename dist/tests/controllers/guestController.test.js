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
const app_1 = __importDefault(require("../../app"));
const location_1 = __importDefault(require("../../models/location"));
const locationFinder_1 = require("../../services/locationFinder");
const weatherReport_1 = require("../../services/weatherReport");
jest.mock('../../services/locationFinder', () => ({
    locationFinder: jest.fn()
}));
jest.mock('../../services/weatherReport', () => ({
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
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(mockedLocationFinder).toBeCalledTimes(1);
        expect(mockedWeatherReport).toBeCalledTimes(1);
    }));
    test('should get a weather report by state & city in different country', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const res = yield (0, supertest_1.default)(app_1.default).get('/guest?state=ap&city=guntur');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(mockedLocationFinder).toBeCalledTimes(1);
        expect(mockedWeatherReport).toBeCalledTimes(1);
    }));
    test('should need a location to fetch', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield (0, supertest_1.default)(app_1.default).get('/guest');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toMatchObject({ message: 'Enter pincode to get the weather report.' });
        expect(mockedLocationFinder).toBeCalledTimes(0);
        expect(mockedWeatherReport).toBeCalledTimes(0);
    }));
    test('state or city is expected', () => __awaiter(void 0, void 0, void 0, function* () {
        let res = yield (0, supertest_1.default)(app_1.default).get('/guest/?state=ap');
        // console.log(res.body);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toMatchObject({ message: 'City or State is missing.' });
        expect(mockedLocationFinder).toBeCalledTimes(0);
        expect(mockedWeatherReport).toBeCalledTimes(0);
    }));
    test('Incorrect location', () => __awaiter(void 0, void 0, void 0, function* () {
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
        });
        let res = yield (0, supertest_1.default)(app_1.default).get('/guest/?pincode=5220022');
        expect(res.statusCode).toEqual(404);
        expect(mockedLocationFinder).toBeCalledTimes(1);
        expect(mockedWeatherReport).toBeCalledTimes(0);
        expect(res.body).toMatchObject({
            message: 'No weather report available at this location. Try other location'
        });
    }));
    test('Weather api key error', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedLocationFinder.mockResolvedValue(new location_1.default([{ "longitude": "80.3083", "latitude": "16.3375" }]));
        mockedWeatherReport.mockResolvedValue({ "cod": 401, "message": "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info." });
        const res = yield (0, supertest_1.default)(app_1.default).get("/guest?pincode=522002");
        expect(res.statusCode).toEqual(401);
    }));
    test('Incorrect path', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/guest/abc");
        expect(res.statusCode).toEqual(500);
    }));
    test('Unexpected Error', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedLocationFinder.mockRejectedValue(new Error("error recorded"));
        const res = yield (0, supertest_1.default)(app_1.default).get("/guest?pincode=522002");
        expect(res.statusCode).toEqual(500);
    }));
});
