const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const AppleStrategy = require("@nicokaiser/passport-apple").Strategy;
const User = require("../models/user");
const fs = require("fs");
const path = require("path");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id }, function(err, user) {
        if (err) return cb(err);
        if (user) {
          // A new user via Google OAuth!
          if (!user.avatar) {
            user.avatar = profile.photos[0].value;
            user.save(function(err) {
              return cb(null, user);
            });
          } else {
            return cb(null, user);
          }
          console.log(profile);
          var newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            appleId: null,
          });
          newUser.save(function(err) {
            if (err) return cb(err);
            return cb(null, newUser);
          });
        }
      });
    }
  )
);

passport.use(
  "apple",
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      key: fs.readFileSync(path.join(__dirname, "/../Auth.p8")),
      callbackURL: process.env.APPLE_CALLBACK,
      scope: ["name", "email"],
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ googleId: profile.id }, function(err, user) {
        if (err) return cb(err);
        if (user) {
          // we have a new user via OAuth!
          console.log(profile);
          var newUser = new User({
            name: profile.name.firstName,
            email: profile.email,
            appleId: profile.id,
            googleId: null,
          });
          newUser.save(function(err) {
            if (err) return cb(err);
            return cb(null, newUser);
          });
        }
      });
      done(null, {
        id,
        email,
        name: { firstName, lastName },
      });
    }
  )
);