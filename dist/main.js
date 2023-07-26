"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(express.static("."));
    app.use(cors({ origin: ["http://localhost:3000"] }));
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map