require("dotenv").config();

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma");

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});
const games = [
    {
        name: "Vault-0",
        src: "https://raw.githubusercontent.com/Pourixa/Where-s-Waldo/refs/heads/main/client/src/assets/vault0.jpeg",
        targets: [
            {
                name: "Leon S. Kennedy",
                src: "https://raw.githubusercontent.com/Pourixa/Where-s-Waldo/refs/heads/main/client/src/assets/vault0/t3.png",
                xtop: 0.121354,
                ytop: 0.914760,
                xbut: 0.152604,
                ybut: 0.955351,
            },
            {
                name: "Stewie Griffin",
                src: "https://raw.githubusercontent.com/Pourixa/Where-s-Waldo/refs/heads/main/client/src/assets/vault0/t1.png",
                xtop: 0.376042,
                ytop: 0.613653,
                xbut: 0.390625,
                ybut: 0.626937,
            },
            {
                name: "Guts",
                src: "https://raw.githubusercontent.com/Pourixa/Where-s-Waldo/refs/heads/main/client/src/assets/vault0/t2.png",
                xtop: 0.475000,
                ytop: 0.884871,
                xbut: 0.515625,
                ybut: 0.919557,
            },
        ],
    },

    {
        name: "Space-Con",
        src: "https://raw.githubusercontent.com/Pourixa/Where-s-Waldo/refs/heads/main/client/src/assets/spaceCon.jpeg",
        targets: [
            {
                name: "The Green Goblin",
                src: "https://raw.githubusercontent.com/Pourixa/Where-s-Waldo/refs/heads/main/client/src/assets/spaceCon/t1.png",
                xtop: 0.864400,
                ytop: 0.256324,
                xbut: 0.916000,
                ybut: 0.300169,
            },
            {
                name: "Lara Croft",
                src: "https://raw.githubusercontent.com/Pourixa/Where-s-Waldo/refs/heads/main/client/src/assets/spaceCon/t2.png",
                xtop: 0.694000,
                ytop: 0.390388,
                xbut: 0.754000,
                ybut: 0.433389,
            },
            {
                name: "The Hulk",
                src: "https://raw.githubusercontent.com/Pourixa/Where-s-Waldo/refs/heads/main/client/src/assets/spaceCon/t3.png",
                xtop: 0.212000,
                ytop: 0.387577,
                xbut: 0.304800,
                ybut: 0.488477,
            },
        ],
    },

    {
        name: "Robot-City",
        src: "https://raw.githubusercontent.com/Pourixa/Where-s-Waldo/refs/heads/main/client/src/assets/robotCity.jpg",
        targets: [
            {
                name: "Ebisu",
                src: "https://raw.githubusercontent.com/Pourixa/Where-s-Waldo/refs/heads/main/client/src/assets/robotCity/t1.png",
                xtop: 0.647244,
                ytop: 0.307900,
                xbut: 0.773200,
                ybut: 0.336800,
            },
            {
                name: "The Goofy Egg",
                src: "https://raw.githubusercontent.com/Pourixa/Where-s-Waldo/refs/heads/main/client/src/assets/robotCity/t2.png",
                xtop: 0.615200,
                ytop: 0.612111,
                xbut: 0.634400,
                ybut: 0.626678,
            },
            {
                name: "The Merchant",
                src: "https://raw.githubusercontent.com/Pourixa/Where-s-Waldo/refs/heads/main/client/src/assets/robotCity/t3.png",
                xtop: 0.773200,
                ytop: 0.647200,
                xbut: 0.818400,
                ybut: 0.692400,
            },
        ],
    },
];

async function main() {
    for (const gameData of games) {
        await prisma.game.upsert({
            where: {
                name: gameData.name,
            },
            update: {
                src: gameData.src,
            },
            create: {
                name: gameData.name,
                src: gameData.src,
                targets: {
                    create: gameData.targets,
                },
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });