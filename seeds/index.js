const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campgrounds');
const {places, descriptors} = require('./seedHelpers');
require("dotenv").config();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapBoxToken = process.env.MAPBOX_TOKEN
console.log(mapBoxToken)
const geocoder = mbxGeocoding({accessToken: mapBoxToken})

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", ()=>{
	console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async ()=>{
	await Campground.deleteMany({});
	for(let i = 0; i < 300; i++){
		const random1000 = Math.floor(Math.random()*1000);
		const price = Math.floor(Math.random()*20)+10;
		const camp = new Campground({
			author: '60a11664b513a99a328a39d8',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images:  [ 
     		{
     			url: 'https://res.cloudinary.com/duwvh038f/image/upload/v1621511662/YelpCamp/cfuuiqsogd3tikrffhlh.jpg',
				filename: 'YelpCamp/cfuuiqsogd3tikrffhlh' 
			},
			{
				url:'https://res.cloudinary.com/duwvh038f/image/upload/v1621511665/YelpCamp/pqzns4kkdfitdsgqpcjm.jpg',
				filename: 'YelpCamp/pqzns4kkdfitdsgqpcjm' 
			},
		],
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non sunt in culpa qui officia deserunt mollit anim id est laborum.",
			price,
			geometry: {
				type: "Point",
				coordinates: [
					cities[random1000].longitude,
					cities[random1000].latitude
				]
			}
		})
		await camp.save();
	}
}

seedDB().then(()=>{
	mongoose.connection.close();
});