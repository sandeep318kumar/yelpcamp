// all middlewares goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next){
    // is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err)
            {
                // console.log(err);
                res.redirect("back");
            } else {
                 // does user own the campground
                //  console.log(foundCampground.author.id);
                //  console.log(req.user._id);
                 if(foundComment.author.id.equals(req.user._id)){
                      next();
                 } else {
                    // res.send("YOU DON'T HAVE PERMISSION TO DO THAT"); 
                     req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                 }
            }
        });    
    } else {
        // console.log("you need  to login to do that");
        // res.send("you need to logged in to do that");
         req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    // is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err)
            {
                // console.log(err);
                 req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                 // does user own the campground
                //  console.log(foundCampground.author.id);
                //  console.log(req.user._id);
                 if(foundCampground.author.id.equals(req.user._id)){
                     
                      next();
                 } else {
                    // res.send("YOU DON'T HAVE PERMISSION TO DO THAT");
                     req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                 }
            }
        });    
    } else {
        // console.log("you need  to login to do that"); 
        // res.send("you need to logged in to do that");
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isloggedin = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;