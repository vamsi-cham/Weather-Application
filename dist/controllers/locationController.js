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
Object.defineProperty(exports, "__esModule", { value: true });
exports.primary_location = exports.del_location = exports.add_location = void 0;
const user_locations_1 = require("../middleware/user-locations");
const locationFinder_1 = require("../services/locationFinder");
const add_location = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let index = user_locations_1.usersLocations.findIndex((userLocations) => userLocations.userid === req.body.userId);
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    const query = req.query;
    if (!query.state && !query.city && !query.pincode) {
        return res.status(400).json({ message: 'Enter pincode to get the weather report.' });
    }
    else if ((!query.state || !query.city) && !query.pincode) {
        return res.status(400).json({ message: 'City or State is missing.' });
    }
    const Location = yield (0, locationFinder_1.locationFinder)(query, next);
    if (!Location.places) {
        return res.status(404).json({
            message: 'No weather report available at this location. Try other location'
        });
    }
    const coordinates = {
        lat: Location.places[0].latitude,
        lng: Location.places[0].longitude
    };
    const all_locations = user_locations_1.usersLocations[index].all_locations;
    //check location already exists
    for (let i = 0; i < all_locations.length; i++) {
        if (coordinates.lat === all_locations[i].lat && coordinates.lng === all_locations[i].lng) {
            return res.status(403).json({
                message: `This Location is already added for the userid: ${req.body.userId}`
            });
        }
    }
    user_locations_1.usersLocations[index].all_locations.push(coordinates);
    res.status(200).json({ message: `Location added for the userid: ${req.body.userId}`, data: coordinates });
});
exports.add_location = add_location;
const del_location = (req, res) => {
    let index = user_locations_1.usersLocations.
        findIndex((userLocations) => userLocations.userid === req.body.userId);
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (user_locations_1.usersLocations[index].all_locations.length === 1) {
        return res.status(409).json({ message: `Location can't be deleted for the userid: ${req.body.userId}, Atleast one required` });
    }
    const params = req.params;
    let all_locations = user_locations_1.usersLocations[index].all_locations;
    const locations = all_locations.filter((location) => !(location.lat === params.lat
        && location.lng === params.lng));
    if (all_locations.length === locations.length) {
        return res.status(404).json({ message: 'User location not found' });
    }
    if (params.lat === user_locations_1.usersLocations[index].primary_location.lat
        && params.lng === user_locations_1.usersLocations[index].primary_location.lng) {
        user_locations_1.usersLocations[index].primary_location = locations[0];
    }
    user_locations_1.usersLocations[index].all_locations = locations;
    res.status(200).json({ message: `Location deleted for the userid: ${req.body.userId}`, data: { lat: params.lat, lng: params.lng } });
};
exports.del_location = del_location;
const primary_location = (req, res) => {
    let index = user_locations_1.usersLocations.findIndex((userLocations) => userLocations.userid === req.body.userId);
    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    const params = req.params;
    const location = {
        lat: params.lat,
        lng: params.lng
    };
    const userlocation = user_locations_1.usersLocations[index].all_locations.
        find((location) => (location.lat === params.lat && location.lng === params.lng));
    if (!userlocation) {
        return res.status(404).json({ message: 'User location not found' });
    }
    user_locations_1.usersLocations[index].primary_location = location;
    res.status(200).json({ message: `Primary Location updated for the userid: ${req.body.userId}`, data: location });
};
exports.primary_location = primary_location;
