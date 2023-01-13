"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const locationFinder_1 = require("../../services/locationFinder");
jest.mock('node-fetch');
const mockedFetch = node_fetch_1.default;
describe('Find lat & lng values from a location', () => {
    test('find by pincode & country', () => {
        const json = jest.fn();
        const result = [{ "longitude": "80.3083", "latitude": "16.3375" }];
        json.mockResolvedValue(result);
        mockedFetch.mockResolvedValue({ ok: true, json });
        return (0, locationFinder_1.locationFinder)({
            "country": "in",
            "pincode": "522002",
            "state": "",
            "city": ""
        }).then((data) => {
            // console.log(data)
            expect(data[0].longitude).toEqual("80.3083");
            expect(data[0].latitude).toEqual("16.3375");
        });
    });
    test('find by state & city', () => {
        const json = jest.fn();
        const result = [{ "longitude": "80.3083", "latitude": "16.3375" }];
        json.mockResolvedValue(result);
        mockedFetch.mockResolvedValue({ ok: true, json });
        return (0, locationFinder_1.locationFinder)({
            "country": "",
            "pincode": "",
            "state": "ap",
            "city": "guntur"
        }).then((data) => {
            // console.log(data)
            expect(data[0].longitude).toEqual("80.3083");
            expect(data[0].latitude).toEqual("16.3375");
        });
    });
});
