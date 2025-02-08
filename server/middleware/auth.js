import jwt from 'jsonwebtoken'

const jwtVerifyMiddleware = async (req,res,next)=>{

    const jwtToken = req.headers?.authorization?.split(" ")[1];
    if(!jwtToken)
    {
        res.status(401).json({
            success: false,
            meassage:"JWT token is missing"
        });
    }
    try{
        const decoded = await jwt.verify(jwtToken,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
            message:"Inavlid Jwt token"
        });
    }
};

const checkRoleMiddleware = async (req,res,next)=>{
    const userRole = req?.user?.role;
    const method = req.method;
    const path = req.path;

    if(method=="POST" && path=="/product" && userRole!=="admin")
    {
        return res.status(403).json({
          success:false,
          message:"you are not authorized to perform this action"
        });
    }
    next();
}

export {jwtVerifyMiddleware,checkRoleMiddleware}