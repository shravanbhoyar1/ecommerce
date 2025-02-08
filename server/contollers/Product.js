import Product from './../models/Product.js';

const postProducts = async (req, res) => {

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

    const newProduct = new Product({
        name,
        shortDescription,
        longDescription,
        price,
        currentPrice,
        category,
        images,
        tags
    })

    try{
        const saveProduct = await newProduct.save();
        return res.json({
            success:true,
            message:"Product created Successfully"
        });
    }catch(error)
    {
        res.status(400).json({
            success:false,
            message:error.message
        });
    }

}

export { postProducts }