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
exports.usersLocations = exports.loggedUsers = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.loggedUsers = [];
exports.usersLocations = [];
const user_locations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, node_fetch_1.default)(`https://jsonplaceholder.typicode.com/users`)
        .then(response => response.json())
        .then((users) => {
        for (let i = 0; i < users.length; i++) {
            exports.loggedUsers.push(users[i]);
            let userLocation = {
                userid: users[i].id,
                username: users[i].username,
                primary_location: users[i].address.geo,
                all_locations: [users[i].address.geo],
            };
            exports.usersLocations.push(userLocation);
        }
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
    next();
});
exports.default = user_locations;
