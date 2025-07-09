"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = 4000;
/*process.env.PORT ? parseInt(process.env.PORT, 10) :4000; */
const server = app_1.default.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
// Graceful shutdown on unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});
