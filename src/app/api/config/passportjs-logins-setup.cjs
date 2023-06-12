// const GoogleStrategyO = require("passport-google-oidc")
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleUser = require("../models/GoogleUser.cjs");
const User = require("../models/User.cjs");
//////////////
// local
const verifyCallback = async (username, password, cb) => {
  try {
    let userObj = {};
    let userPassword = "";
    GoogleUser.findOne({ username: username }).then(async (user) => {
      if (user) {
        return cb(null, false, {
          message:
            "this email is already used. you should sign in with google account",
        });
      } else {
        await User.findOne({ username: username })
          .then(async (result) => {
            if (!result) {
              await User.findOne({ email: username }).then((user) => {
                if (!user) {
                  return cb(null, false, {
                    message: "incorrect username or email",
                  });
                }
                userPassword = user.password;
                userObj = {
                  id: user._id,
                  username: user.username,
                };
              });
            } else {
              userPassword = result.password;
              userObj = {
                id: result._id,
                username: result.username,
              };
            }
            if (await bcrypt.compare(password, userPassword)) {
              return cb(null, userObj);
            } else {
              console.log("Wrong Password");
              return cb(null, false, {
                message: "incorrect Password",
              });
            }
          })
          .catch((e) => {
            console.log("verifyCallbackErr", e);
            return cb(null, false, {
              message: "oops... some error",
            });
          });
      }
    });
  } catch (error) {
    console.log("verifyCallback error: ", error);
    cb(null, false, { message: "oops... some error" });
    throw error;
  }
};
const localStrategy = new LocalStrategy(verifyCallback);
passport.use(localStrategy);
/////////////////

// google+ login
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.BIGSALE_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BIGSALE_AUTH_GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/oauth2/google/redirect",
      // passReqToCallback: true,
      // /api/oauth2/google/redirect
      // https://localhost:4000/api/oauth2/google/redirect
      // https://bigsaleegy.vercel.app/api/oauth2/google/redirect
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("profile", profile);
      User.findOne({ email: profile.emails[0].value }).then(async (user) => {
        if (user) {
          console.log(
            "this email is already signedup. please login with your passowrd"
          );
          return cb(null, false, {
            message:
              "this email is already signedup. please login with your passowrd",
          });
        }

        await GoogleUser.findOne({ googleid: profile?.id }).then(
          async (user) => {
            if (user) {
              let sessUser = {
                username: user.username,
                id: user.googleid,
              };
              return cb(null, sessUser);
            } else {
              const newUser = new GoogleUser({
                email: profile.emails[0].value,
                googleid: profile.id,
                username: profile.displayName,
                displayname: profile.displayName,
                familyname: profile.name.familyName,
                givenname: profile.name.givenName,
              });
              await newUser
                .save()
                .then((newUser) => {
                  let sessUser = {
                    username: newUser.username,
                    id: newUser.googleid,
                  };
                  console.log("new google user saved");
                  return cb(null, sessUser);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        );
      });
    }
  )
);
/////////////////
/////////////////
//////////// serialize and deserialize User
passport.serializeUser(function (user, cb) {
  console.log("inside serialize");
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserializeUser");
  process.nextTick(function () {
    return cb(null, user);
  });
});
