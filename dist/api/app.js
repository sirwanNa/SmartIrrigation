"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const farmRout_1 = __importDefault(require("./routes/farmRout"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('🚀 Smart Irrigation API is running...');
});
app.use('/api/v1', farmRout_1.default);
exports.default = app;
