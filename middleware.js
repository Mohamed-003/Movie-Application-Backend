const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const CheckJwt = async (token) => {
    try {
        const secretKey = "taskphin";
        const decoded = jwt.verify(token, secretKey);
        const email = decoded.userId;

        async function query() {
            const object = await prisma.user.findUnique({
                where: {
                    email: email
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

        if (result.id) {
            return true
        } else {
            return false
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return false
        }
    }


}

module.exports = { CheckJwt }