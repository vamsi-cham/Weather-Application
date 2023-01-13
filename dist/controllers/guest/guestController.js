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
exports.guestReport = void 0;
const logger_1 = __importDefault(require("../../logger"));
const locationFinder_1 = require("../../services/locationFinder");
const weatherReport_1 = require("../../services/weatherReport");
const guestReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    if (!query.state && !query.city && !query.pincode) {
        logger_1.default.error('Enter pincode to get the weather report.');
        return res.status(400).json({ message: 'Enter pincode to get the weather report.' });
    }
    else if ((!query.state || !query.city) && !query.pincode) {
        logger_1.default.error('City or State is missing.');
        return res.status(400).json({ message: 'City or State is missing.' });
    }
    try {
        //First open api
        const Location = yield (0, locationFinder_1.locationFinder)(query);
        if (!Location.places) {
            logger_1.default.error('No weather report available at this location. Try other location');
            return res.status(404).json({
                message: 'No weather report available at this location. Try other location'
            });
        }
        //Second open api
        const Report = yield (0, weatherReport_1.getWeatherReport)(Location);
        if (Report.cod !== 200) {
            logger_1.default.error(Report.message);
            return res.status(Report.cod).json({ message: Report.message });
        }
        res.status(200).json({
            message: 'Search completed',
            data: Report,
        });
    }
    catch (err) {
        logger_1.default.error(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.guestReport = guestReport;
