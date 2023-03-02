const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/petsitter';
mongoose.connect(uri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we are connected MongoDB')
})

let petSitterSchema = mongoose.Schema({
  _id:{
    type:String,
    required:true
  },
  owner:{
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
  },
  profilePicture : {
    type: String,
    default: 'https://res.cloudinary.com/dsiywf70i/image/upload/v1677694265/4118353_1_k21qqn.jpg'
  },
  phoneNumber : {
    type: Number,
    required:true
  },
  pets: [{type: Object}],
  petSitter: {
    type:Boolean,
    require:true
  },
  messages:[],
  location: {
    postal: {type: Number, required: true},
    country: {type: String, required: true},
    city: {type: String, required: true},
    state:{type:String, required:true},
    longitude:{type:Number, required:true},
    latitude:{type:Number, required:true}
  }
})

petSitter = mongoose.model('PetSitter', petSitterSchema)

module.exports = {
  signUp: (body, callback) => {
    petSitter.create(body)
      .then((data) => callback(null, data))
      .catch((err) => callback(err))
  },
  findSitter: (_id, callback) => {
    petSitter.find({_id:_id})
      .then((data) => {callback(null, data)})
      .catch((err) => {callback(err)})
  },
  availabilityUpdate: (_id, callback) => {
    console.log(_id)
    petSitter.findOneAndUpdate( {_id: _id},  [
      { $set: { 'petSitter': { $not: '$petSitter' } } }
    ])
      .exec()
      .then((data) => callback(null, data))
      .catch((err) => callback(err))
  },
  findSitterAround: (body, callback) => {
    petSitter.find(
      {
      'location.longitude': {
          $gte:body.minLon, $lte:body.maxLon
        },
      'location.latitude' : {
        $gte:body.minLat, $lte:body.maxLat
      },
      petSitter: true
        }
      ).exec()
        .then((data) => {
          console.log(data)
          callback(null, data)
        })
        .catch((err) => {
          callback(err)
        })
  }
}