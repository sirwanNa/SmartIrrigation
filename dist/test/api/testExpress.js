"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 8080;
// Respond to GET request on the root route
app.get('/', (req, res) => {
    res.send('GET request to the homepage');
});
// Respond to POST request on the root route
app.post('/farm/create', (req, res) => {
    var model = req.body;
    res.send('POST request to the homepage');
});
// Respond to GET request on the /about route
app.get('/about', (req, res) => {
    res.send('About page');
});
// Catch all other routes
// app.all('*', (req, res) => {
//   res.status(404).send('404 - Page not found');
// });
// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
