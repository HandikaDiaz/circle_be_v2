"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routerV1_1 = __importDefault(require("./src/routers/routerV1"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/api/v1', routerV1_1.default);
app.get("/", (req, res) => {
    res.send("This is form server");
});
// app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
