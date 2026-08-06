const { Router } = require("express")
const gameRouter = Router()
const db = require("../lib/prisma")
const apiError = require("../lib/utils")
const {getGame,getPlayers} = require("../middleware/game")

gameRouter.param("name", getGame);

gameRouter.get("/", async (req, res, next) => {
    try {
        const games = await db.prisma.game.findMany({include:{
            players:true
        }});
        res.json(games);
    } catch (err) {
        next(err);
    }
});

gameRouter.get("/:name", (req, res) => {
    res.json(req.game);
});

gameRouter.get("/:name/player", getPlayers, (req, res) => {
    res.json(req.players);
});

gameRouter.post("/:name", async (req, res, next) => {
    try {
        const target = await db.prisma.target.findUnique({
            where: {
                gameID_name: {
                    gameID: req.game.name,
                    name: req.body.name,
                },
            },
        });

        if (!target) {
            return next(new apiError("Target not found.", 404));
        }

        const { x, y } = req.body;

        const found =
            target.xtop < x &&
            x < target.xbut &&
            target.ytop < y &&
            y < target.ybut;

        if (!found) {
            return res.status(404).json({
                message: `That's not ${req.body.name}. Keep looking.`,
            });
        }

        res.json(target);
    } catch (err) {
        next(err);
    }
});

gameRouter.post("/:name/player", async (req, res, next) => {
    try {
        const existingPlayer = await db.prisma.player.findUnique({
            where: {
                gameID_username: {
                    gameID: req.game.name,
                    username: req.body.username,
                },
            },
        });

        if (existingPlayer) {
            return next(new apiError("Player tag already exists.", 403));
        }

        const player = await db.prisma.player.create({
            data: {
                gameID: req.game.name,
                username: req.body.username,
                record: req.body.record,
            },
        });

        res.status(201).json(player);
    } catch (err) {
        next(err);
    }
});

module.exports = gameRouter;