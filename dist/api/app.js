"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routeHandler_1 = require("./routes/routeHandler");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('Smart Irrigation API is running...');
});
var routeHandler = new routeHandler_1.RouteHandlers();
app.use('/api/v1', routeHandler.getRoutes());
exports.default = app;
