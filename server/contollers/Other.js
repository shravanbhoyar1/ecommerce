import jwt from 'jsonwebtoken'

const getHealth = (req, res) => {
    res.status(200).json({
        success: true,
        message: "server is running"
    });
}

const isError = (req, res) => {
    res.status(404).json({
        success: false,
        message: "url is incorrect"
    });
}

const test = (req, res) => {

    const token = req.headers.authorization;
    if (!token) {
        res.status(400).json({
            success: false,
            message: "unauthorized"
        });
    }

    const tokenvalue = token.split(" ")[1];
    try {
        const decoded = jwt.verify(tokenvalue, process.env.JWT_SECRET);

        if (decoded) {
            res.json({
                success: true,
                message: "Authorized",
                data: decoded
            });
        }
    } 
    catch (error)
    {
        res.json({
            success: false,
            message: "Unauthorized"
        });
    }

}

export { getHealth, isError, test }