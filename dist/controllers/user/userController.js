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
exports.detailed_report = exports.allweather_reports = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = require("../../config/config");
const user_locations_1 = require("../../middleware/user/user-locations");
const allweather_reports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let index = user_locations_1.usersLocations.findIndex((userLocations) => userLocations.userid.toString() === req.params.userId);
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    const user_locations = user_locations_1.usersLocations[index].all_locations;
    const weather_reports = [];
    // const user = loggedUsers.find((user:UsersModel)=>user.id.toString()===req.params.userId);
    for (let i = 0; i < user_locations.length; i++) {
        yield (0, node_fetch_1.default)(`${config_1.weatherAPI}?lat=${user_locations[i].lat}&lon=${user_locations[i].lng}&appid=${config_1.weatherApikey}`)
            .then(response => response.json())
            .then((report) => {
            if (report.cod !== 200) {
                return res.status(report.cod).json({ message: report.message });
            }
            weather_reports.push({
                username: user_locations_1.usersLocations[index].username,
                main: report.weather[0].main,
                temp: report.main.temp,
                feels_like: report.main.feels_like
            });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
    res.status(200).json({ message: 'User weather reports', data: weather_reports });
});
exports.allweather_reports = allweather_reports;
const detailed_report = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let index = user_locations_1.usersLocations.findIndex((userLocations) => userLocations.userid.toString() === req.params.userId);
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    const primary_location = user_locations_1.usersLocations[index].primary_location;
    const query = req.query;
    if (query.lat && query.lng) {
        const userlocation = user_locations_1.usersLocations[index].all_locations.
            find((location) => (location.lat === query.lat && location.lng === query.lng));
        if (!userlocation) {
            return res.status(404).json({ message: 'User location not found' });
        }
    }
    const Report = (!query.lat || !query.lng) ?
        yield (0, node_fetch_1.default)(`${config_1.weatherAPI}?lat=${primary_location.lat}&lon=${primary_location.lng}&appid=${config_1.weatherApikey}`)
            .then(response => response.json())
            .then(report => { return report; }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }) :
        yield (0, node_fetch_1.default)(`${config_1.weatherAPI}?lat=${query.lat}&lon=${query.lng}&appid=${config_1.weatherApikey}`)
            .then(response => response.json())
            .then(report => { return report; }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    if (Report.cod !== 200) {
        return res.status(Report.cod).json({ message: Report.message });
    }
    res.status(200).json({ message: 'User Detailed Weather Report', data: Report });
});
exports.detailed_report = detailed_report;
