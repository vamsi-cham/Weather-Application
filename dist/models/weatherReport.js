"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WeatherReport {
    constructor(weather, main, wind, cod, message) {
        this.weather = weather;
        this.main = main;
        this.wind = wind;
        this.cod = cod;
        this.message = message;
    }
}
exports.default = WeatherReport;
