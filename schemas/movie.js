const mongoose=require('mongoose')
mongoose.Promise = global.Promise

const MovieSchema=new mongoose.Schema({
    director:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})

MovieSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})

MovieSchema.statics = {    //模板可以直接调用的函数
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)   //参数会传递给回调函数
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)   //参数会传递给回调函数
    }
}

module.exports = MovieSchema