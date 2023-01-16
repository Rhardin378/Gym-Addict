const express = require('express');
const mongoose = require('mongoose')
const Gym = require('../models/gym')
const cities = require('./cities')
const {club, description} = require('./gymNames')

require('dotenv').config()

let dbConnectionString = process.env.ConnectionString

mongoose.connect(dbConnectionString, {
    useUnifiedTopology: true
})


const db = mongoose.connection; 
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random()* array.length)]

const seedDB = async () => {
    await Gym.deleteMany({});   
    for (let i = 0; i < 200; i++){
    const random1000 = Math.floor(Math.random()* 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const gym = new Gym({
        author: '639fa3a2839b246eee5c049b',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(description)} ${sample(club)}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit ',
        price,
        geometry: {
            type: "Point",
            coordinates: [cities[random1000].longitude,cities[random1000].latitude]
        },
    images: [
        {
        url: 'https://res.cloudinary.com/dtemtcchv/image/upload/v1672625836/GymAddict/kqbxttpdmufz0akwwqqv.jpg',
        filename: 'GymAddict/kqbxttpdmufz0akwwqqv',
      },
      {
        url: 'https://res.cloudinary.com/dtemtcchv/image/upload/v1672625836/GymAddict/pnavtwg9higjj1luxvpa.jpg',
        filename: 'GymAddict/pnavtwg9higjj1luxvpa',
      }
    ]
})
    await gym.save();
}
}
seedDB().then(()=>{
   mongoose.connection.close() 
});