

const getHealth = (req,res)=>{
    res.status(200).json({
       success:true,
       message:"server is running"
    });
}

const isError  = (req,res)=>{
    res.status(404).json({
        success:false,
        message:"url is incorrect"
    });
}   


   
export {getHealth, isError}