const express = require("express");
const router = express.Router();
router.use(express.json());
const { CheckJwt } = require("../middleware");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post(("/update"), async (req, res, next) => {
    const token = req.headers['token'];
    const userId = Number(req.headers['id']);
    const { list } = req.body;

    console.log("token : ", token, "list : ", list)
    try {
        const result = await CheckJwt(token);
        if (result) {
            async function query() {
                const frontEndList = list;
                let notDeleteList = frontEndList.map((item) => Number(item.id)).filter((id) => !isNaN(id));

                await prisma.user.update({
                    where: { id: userId },
                    data: {
                        movieList: {
                            deleteMany: {
                                id: {
                                    notIn: notDeleteList,
                                },
                            },
                        },
                    },
                });

                for (const item of frontEndList) {
                    if (item.id) {
                        await prisma.list.upsert({
                            where: { id: Number(item.id) },
                            update: {
                                movieName: item.movieName,
                                rating: item.rating,
                                cast: item.cast,
                                genre: item.genre,
                            },
                            create: {
                                movieName: item.movieName,
                                rating: item.rating,
                                cast: item.cast,
                                genre: item.genre,
                                author: { connect: { id: userId } },
                            },
                        });
                    } else {
                        await prisma.list.create({
                            data: {
                                movieName: item.movieName,
                                rating: item.rating,
                                cast: item.cast,
                                genre: item.genre,
                                author: { connect: { id: userId } },
                            },
                        });
                    }
                }
            }

            await query().then(async (object) => {
                await prisma.$disconnect()
                return object
            }).catch(async (e) => {
                console.error(e)
                await prisma.$disconnect()
                process.exit(1)
            })


            res.status(200).send("Movies updated successfully")
        } else {
            res.status(500).send({ error: "Error while decoding JWT token" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "error ": error })
    }
});

router.get(("/"), async (req, res, next) => {
    const token = req.headers['token'];
    const userId = Number(req.headers['id']);

    try {
        const result = await CheckJwt(token);
        if (result) {
            async function query() {
                const object = await prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                    include: {
                        movieList: true,
                    },
                })
                return object
            }
            const result = await query().then(async (object) => {
                await prisma.$disconnect()
                return object
            }).catch(async (e) => {
                console.error(e)
                await prisma.$disconnect()
                process.exit(1)
            })
            res.status(200).json({ "movies": result.movieList })
        } else {
            res.status(200).json({ "movies": { "movies": { "movie list": [] } } })
        }
    } catch (error) {
        console.log("Error while retrieving data");
        res.status(500).json({ "Error ": error })
    }
});

module.exports = router;