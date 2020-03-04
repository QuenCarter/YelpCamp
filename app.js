const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const uri = "mongodb+srv://mongooseTesting:SD3LAia6C@qcode-xy9yt.mongodb.net/quen_yelp?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Database Connected`);
    })
    .catch(error => {
        console.log(`You have an error: ${error}`);
    });

//schema set up

const campgroundsSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundsSchema);
    
//     { name: "Pontiac Lake State Recreation Area Campground", image: "https://images.unsplash.com/photo-1568576550491-185584b2145a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" },
//     { name: "Detroit Greenfield Campground", image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" },


// need this for post endpoints. to grab parsed data from req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {

        Campground.find({}, (error, grounds) =>{
        if (error){
            console.log(`error: ${error}`);
        }else{
            res.render("campgrounds", { camps: grounds });
        }
    }
    );

});

app.post("/campgrounds", (req, res) => {
    let campground = {
        name: req.body.name,
        image: req.body.image
    };
    Campground.create(campground, (error, newCamp) =>{
        if (error){
            console.log(`Could not add new camp: ${error}`);
        }else{
            res.redirect("/campgrounds");
        }
    });
});
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.listen(3000, () => {
    console.log("Server started")
})
