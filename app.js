let express = require("express");
let app = express();
let bodyParser = require("body-parser");

let campgrounds = [
    {name: "Proud Lake Campground", image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Haas Lake Park RV Campground", image: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Pontiac Lake State Recreation Area Campground", image: "https://images.unsplash.com/photo-1568576550491-185584b2145a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
    {name: "Detroit Greenfield Campground", image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"},
];

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", (req, res) =>{
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {

    res.render("campgrounds", {camps:campgrounds});
});

app.post("/campgrounds", (req, res) => {
    let campground = {
        name:req.body.name, 
        image: req.body.image
    };
    campgrounds.push(campground);
    res.redirect("/campgrounds");
});
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.listen(3000, ()=>{
    console.log("Server started")
})
