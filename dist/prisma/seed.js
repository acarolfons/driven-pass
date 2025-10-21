"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../src/database/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
async function main() {
    const hashedPassword = await bcrypt_1.default.hash("demo1234", 10);
    const seedUser = {
        name: "Demo",
        email: "demo@driven.com.br",
        password: hashedPassword
    };
    await db_1.default.user.upsert({
        where: { email: "demo@driven.com.br" },
        update: {},
        create: seedUser
    });
}
main()
    .then(async () => {
    await db_1.default.$disconnect();
})
    .catch(async (err) => {
    console.error(err);
    await db_1.default.$disconnect();
    process.exit(1);
});
