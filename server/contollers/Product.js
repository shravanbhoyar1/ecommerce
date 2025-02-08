
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

    // best way to learn verify field
    const manadatoryField = ["name","shortDescription","longDescription","price","currentPrice","category","images","tags"];

    for(const field of manadatoryField)
    {
        if(!req.body[field])
        {
            return res.status(400).json({
                success:false,
                message:`${field} is required`
            });
        }
    }

}

export { postProducts }