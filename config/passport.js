const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const AppleStrategy = require("@nicokaiser/passport-apple").Strategy;
const User = require("../models/user");
const fs = require("fs");
const path = require("path");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ userId: profile.id }, function(err, user) {
        if (err) return done(err);
        // If user is not new, return their stored data
        if (user) {
          // Only change an avatar pic if a user has changed their Google
          // avatar since their last visit, reducing db writes.
          if (user.avatar !== profile.photos[0].value) {
            user.avatar = profile.photos[0].value;
            user.save(function(err) {
              return done(null, user);
            });
          } else {
            return done(null, user);
          }
        } else {
          // A new user via Google OAuth!
          console.log(profile);
          var newUser = new User({
            name: profile.displayName,
            avatar: profile.photos[0].value,
            email: profile.emails[0].value,
            userId: profile.id,
            oAuthProvider: "Google",
          });
          newUser.save(function(err) {
            if (err) return done(err);
            return done(null, newUser);
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
      User.findOne({ userId: profile.id }, function(err, user) {
        if (err) return done(err);
        // if a user is not new, return their stored data.
        if (user) done(null, user);
        // if a user is new add them to the db
        if (!user) {
          console.log(profile);
          var newUser = new User({
            name: profile.name.firstName,
            avatar: null,
            email: profile.email,
            userId: profile.id,
            oAuthProvider: "Apple",
          });
          newUser.save(function(err) {
            if (err) return done(err);
            return done(null, newUser);
          });
        }
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
