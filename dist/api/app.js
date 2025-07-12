"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const farmRoute_1 = __importDefault(require("./routes/farmRoute"));
const fieldRoute_1 = __importDefault(require("./routes/fieldRoute"));
const sensorRoute_1 = __importDefault(require("./routes/sensorRoute"));
const sensorLogRoute_1 = __importDefault(require("./routes/sensorLogRoute"));
const plantGrowthRoute_1 = __importDefault(require("./routes/plantGrowthRoute"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('Smart Irrigation API is running...');
});
app.use('/api/v1', farmRoute_1.default);
app.use('/api/v1', fieldRoute_1.default);
app.use('/api/v1', sensorRoute_1.default);
app.use('/api/v1', sensorLogRoute_1.default);
app.use('/api/v1', plantGrowthRoute_1.default);
exports.default = app;
