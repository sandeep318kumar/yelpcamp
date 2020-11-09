var express =  require("express");
var router = express.Router();
var middleware = require("../middleware/index");
var Campground = require("../models/campground");


//INDEX ROUTE -- SHOW ALL CAMPGROUNDS
router.get("/", function(req, res){
    // get all from db
    // console.log(req.user);
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
          res.render("campgrounds/index", {campgrounds: campgrounds});   
        }  
    });
});


//POST - adding new camp to DB
router.post("/", middleware.isloggedin, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var cost = req.body.cost;
    var location = req.body.location;
    var author ={
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name: name, image: image, description: desc, author: author, cost: cost, location: location};
    
// campgrounds.push(newCamp);
// create a new campg
    Campground.create(newCamp, function(err, newcp){
        if(err){
            console.log(err);
        } else {
             res.redirect("/campgrounds");
        }
    });
});

//CREATE ROUTE --NEW FORM
router.get("/new", middleware.isloggedin, function(req, res){
//    console.log("to new form");
   res.render("campgrounds/new"); 
}); 

//SHOW- more info about one campground
router.get("/:id", function(req, res){
    // console.log("REQUEST MADE TO SHOW MORE INFO ABOUT ONE CG");
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
          console.log(foundCampground);
           res.render("campgrounds/show", {campground:foundCampground});
       }
    });
 //  res.render("show");
});

// EDIT CAMPGROUND PAGE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
            
            res.render("campgrounds/edit", {campground: foundCampground});
        });    
   
    //other wise redirect
    // if not redirect
});


// UPDATE CAMPGROUND PAGE
router.put("/:id", function(req, res){
    //find an update
    // redirect
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            // console.log(err);
            res.redirect("/campgrounds");
        } else{
            
            res.redirect("/campgrounds/"+ req.params.id);
        } 
   }); 
});

/// destroy campground 
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});

//middle ware


module.exports = router;