var mongoose = require("mongoose");
var Comment = require("./models/campground");
var  Campground = require("./models/campground");

var data = [
    {
        name: "cloud rest",
        image: "data:image/jpeg;base64,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",
        description: "happy camping"
    },
    {
        name: "light node",
        image: "https://images.unsplash.com/photo-1590122401831-89863eaf8378?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "mountains"
    },
    {
        name: "Sun rising",
        image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "morning at camp"
    }
];

function seedDB(){
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            } else {
                console.log("added");
                Comment.create(
                    {
                        text:"this place is great :)",
                        author: "great bk5EX"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                        }
                    });
                
            }
        });
    });
}

module.exports = seedDB;