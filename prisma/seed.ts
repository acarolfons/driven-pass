import prisma from "../src/database/db";
import bcrypt from "bcrypt"
import { UserData } from "../src/protocols/userProtocol";

async function main() {
    const hashedPassword = await bcrypt.hash("demo1234", 10);
    const seedUser: UserData = {
        name: "Demo",
        email: "demo@driven.com.br",
        password: hashedPassword
    }

    await prisma.user.upsert({
        where: { email: "demo@driven.com.br" },
        update: {},
        create: seedUser
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (err) => {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    });