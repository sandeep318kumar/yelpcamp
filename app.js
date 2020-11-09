var express             = require("express"),
    app                 = express(),
    User                = require("./models/user"),
    methodOverride      = require("method-override"),
    mongoose            = require("mongoose"),
    bodyParser          = require("body-parser"),
    seedDB              = require("./seed"),
    passport            = require("passport"),
    flash               = require("connect-flash"),
    LocalStrategy       = require("passport-local");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");    

// mongoose.connect("mongodb://localhost/yelpCamp");
mongoose.connect("mongodb+srv://yelpcamp:yelpcamp@cluster0-ej2ld.mongodb.net/yelpCamp?retryWrites=true&w=majority");

// seedDB();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//passport configuration
app.use(require("express-session")({
    secret: "Hare Krishna",
    resave: false,
    saveUninitialized: true
}));

// for AUTH
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware 
app.use(function(req, res, next){
     res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    
    next();
});

    
//Routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelp Camp has started");
});