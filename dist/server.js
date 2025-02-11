"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const db_1 = __importDefault(require("./config/db"));
(async () => {
    const PORT = config_1.default.port || 3000;
    await (0, db_1.default)();
    app_1.default.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
    });
})();
