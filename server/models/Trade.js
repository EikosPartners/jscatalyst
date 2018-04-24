const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let TradeSchema = new mongoose.Schema({    
    account:        String,
    trader:         String,
    strategy:       String,
    counterparty:   String,
    cid:            String,
    ticker:         String,
    ric:            String,
    bbg:            String,
    type:           String,
    orderId:        String,
    quantity:       String,
    price:          String,
    filled:         String,
    open:           String,
    limitPrice:     String,
    filledPrice:    String,
    venue:          String,
    gateway:        String,
    currency:       String,
    side:           String,
    originalOrderId:String,
    rejected:       String,
    rejectedReason: String,
    state:          String,
    entryMethod:    String,
    transactTime:   String,
    placementTime:  String,
    emsTime:        String,
    id:             String
});

TradeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Trade', TradeSchema);