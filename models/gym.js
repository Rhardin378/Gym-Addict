const mongoose = require('mongoose');
const { gymSchema } = require('../schemas');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200')
})

const opts = { toJSON: { virtuals: true } };


const GymSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        }, 
        coordinates: {
            type: [Number], 
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews:[
        {
        type: Schema.Types.ObjectId,
        ref: 'Review'
        }
    ]
}, opts);

GymSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/gyms/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
});

GymSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
    console.log(doc)
})
module.exports = mongoose.model('Gym', GymSchema)