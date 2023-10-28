const express = require("express");
const router = express.Router();
router.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.post(('/'), async (req, res, next) => {
    const { email, password } = req.body;
    try {
        async function query() {
            const object = await prisma.user.findUnique({
                where: {
                    email: email,
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
        if (result.email) {
            const hashedPassword = result.password;
            const match = await bcrypt.compare(password, hashedPassword);
            if (match) {
                const payload = { userId: email };
                const secretKey = "taskphin";
                const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
                const data = { "jwt": token };
                data["userId"] = result.id;
                return res.status(200).json(data)
            } else {
                return res.status(500).json({ "error": "invalid credentials" })
            }

        } else {
            return res.status(500).json({ "error": "invalid credentials" })
        }


    } catch (error) {
        console.log("error : ", error)
        res.status(500).json({ 'error': "Internal Server Error" })
    }

})
module.exports = router;