const mongoose = require ('mongoose');
const Form = require ('./Form')
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    title :{
        type : String ,
        required : true
    },
    link :{
        type : String ,
        required : true
    },
    description :{
        type : String ,
        required : true
    },
    form:{
        type :  mongoose.Schema.Types.ObjectId ,
       ref : "Form",
    }

})
module.exports = mongoose.model('Page',pageSchema )