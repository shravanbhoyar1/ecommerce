const errorMandatory = (res,field)=>{
    return res.status(400).json({
        succuss :false,
        message:`${field} is required`
    })
}
const postProducts = (req, res) => {

    const { 
        name,
        shortDescription,
        longDescription,
        price,
        currentPrice,
        category,
        images,
        tags
    } = req.body;

    if(!name) return errorMandatory(res,"name");
    if(!shortDescription) return errorMandatory(res,"shortDescription");
    if(!longDescription) return errorMandatory(res,"name");
    if(!price) return errorMandatory(res,"name");
    if(!currentPrice) return errorMandatory(res,"name");
    if(category) return errorMandatory(res,"name");
    if(!images) return errorMandatory(res,"name");
    if(!tags) return errorMandatory(res,"name");
}

export { postProducts }