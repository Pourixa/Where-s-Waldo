const db = require("../lib/prisma")
const apiError = require("../lib/utils")

async function getGame(req, res, next) {
    try {
        const game = await db.prisma.game.findUnique({
            where: {
                name: req.params.name
            },include:{
                targets:true,
                players:{orderBy:{
                    record:"asc"
                }}
            }

        })
        if (!game) {
            return next(new apiError("Game not found.", 404))
        }

        req.game = game
        next()
    } catch (err) {
        next(err)
    }
}

async function getPlayers(req,res,next) {
        try {
        const players = await db.prisma.player.findMany({where:{
            gameID:req.params.name
        }})
        req.players = players
        next()    
        } catch (err) {
            next(err)
        }
}

module.exports = {getGame:getGame,getPlayers:getPlayers}