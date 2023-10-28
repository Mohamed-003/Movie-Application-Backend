const express = require("express");
const router = express.Router();
router.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post(("/"), (req, res, next) => {
    const { email, password } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            console.log("error : ", err);
            return res.status(500).json({ error: "Error Hashing the password" })
        }
        const payload = { userId: email };
        const secretKey = "taskphin";
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
        const data = { "jwt": token };
        try {
            async function query() {
                const object = await prisma.user.create({
                    data: {
                        email: email,
                        password: hash,
                        movieList: {
                            create: [
                                {
                                    movieName: 'New Movie',
                                    rating: 0.0,
                                    cast: ['Actor1', 'Actor2'],
                                    genre: 'genre',
                                },
                            ]
                        },
                    },
                });
                return object
            }
            const object = await query().then(async (object) => {
                await prisma.$disconnect()
                return object
            })
                .catch(async (e) => {
                    console.error(e)
                    await prisma.$disconnect()
                    process.exit(1)
                })

            data["id"] = String(object.id);

        } catch (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ error: 'Error inserting data' })
        }
        res.status(200).json(data);
    });

});

module.exports = router




