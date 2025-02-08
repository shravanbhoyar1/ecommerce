import Order from "../models/Order.js";

const postOrders = async (req, res) => {

    const {
        products,
        deliveryAddress,
        phone,
        paymentMode
    } = req.body;

    if(!products||!deliveryAddress||!phone||!paymentMode){
        return res.status(400).json({
            success:false,
            message:"products,totalBill,deliveryAddress,phone,paymentMode",
        });
    }
    let totalBill = 0;

    products.forEach((product) => {

        totalBill+=product.price * product.quantity;
        
    });
    try{
        const newOrders = new Order({
            userId:req.user._id,
            products,
            totalBill,
            deliveryAddress,
            phone,
            paymentMode
        });

        const savedOrder = await newOrders.sava();

        return res.json({
            success:true,
            message:"Order placed Successfully",
            data:savedOrder
        });
    }catch(error)
    {
        return res.status(400).json({
            success:false,
            message:error.message
        });
    }
};



export { postOrders };