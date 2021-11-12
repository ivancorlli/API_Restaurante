const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const validStatus = {
        pending:'pennding',
        accepted:'accepted',
        cooked:'cooked',
    }

const orderSchema = new Schema ({
    user: { 
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    orderStatus:{type:String, required:true , default:validStatus.pending},
    createdAt:{type:Number,default:Date.now()},
    items:[{
        type: Schema.Types.ObjectId,
        ref:'Menu'
    }],
})

module.exports = mongoose.model('Order',orderSchema);
