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
const config_1 = require("../config/config");
const node_fetch_1 = __importDefault(require("node-fetch"));
const locationFinder = (query, next) => __awaiter(void 0, void 0, void 0, function* () {
    const country = (!query.country) ? "in" : query.country;
    try {
        const Location = ((!query.city || !query.state)) ?
            yield (yield (0, node_fetch_1.default)(`${config_1.locationAPI}/${country}/${query.pincode}`)).json() :
            yield (yield (0, node_fetch_1.default)(`${config_1.locationAPI}/${country}/${query.state}/${query.city}`)).json();
        return Location;
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});
exports.default = locationFinder;
