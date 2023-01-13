"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = __importDefault(require("./routes/user/user"));
const guest_1 = __importDefault(require("./routes/guest/guest"));
const errors_1 = require("./middleware/errors");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const user_locations_1 = __importDefault(require("./middleware/user/user-locations"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)(swagger_1.default)));
app.use('/guest', guest_1.default);
//optional use case
app.use(user_locations_1.default);
app.use(user_1.default);
app.use(errors_1.errors);
app.listen(4001);
exports.default = app;
