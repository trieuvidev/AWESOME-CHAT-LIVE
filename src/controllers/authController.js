import { validationResult } from "express-validator/check";
import { auth } from "./../services/indexServices";
import { transSuccsess } from "./../../lang/vi";

let getLoginRegister = (req, res) => {
  return res.render("authLogin/master", {
    errors: req.flash("errors"),
    success: req.flash("success")
  }); // when redirect view then show error in view
}

let postRegister = async (req, res) => { // post emailUser to the database before check emailUser exists or not 
  // show Error when users enter wrong 
  let errorArray = [];
  let successArray = [];
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArray.push(item.msg);
    });
    req.flash("errors", errorArray);
    return res.redirect("/login-register"); // when users enter an error , then redirect the page login-register
  }
  // show Error when users enter exactly
  try {
    let createUserSuccsess = await auth.register(req.body.email, req.body.gender, req.body.password, req.protocol, req.get("host")) // register taken from file && await check emailUser exists or not  authServices
    successArray.push(createUserSuccsess);
    req.flash("success", successArray);
    return res.redirect("/login-register");
  } catch (error) {
    errorArray.push(error);
    req.flash("errors", errorArray);
    return res.redirect("/login-register"); // when users enter an error , then redirect the page login-register
  }
};

let verifyAccount = async (req, res) => {
  let errorArray = [];
  let successArray = [];
  try {
    let verifySuccsess = await auth.verifyAcc(req.params.token);
    successArray.push(verifySuccsess);
    req.flash("success", successArray);
    return res.redirect("/login-register");
  } catch (error) {
    errorArray.push(error);
    req.flash("errors", errorArray);
    return res.redirect("/login-register"); // when users enter an error , then redirect the page login-register
  }
};

let getLogoutUser = (req, res) => {
  req.logout(); // remove passport.serializeUser
  req.flash("success", transSuccsess.logoutSuccsess);
  return res.redirect("/login-register");
};

let checkLoginUser = (req, res, next) => { // check login user true or flase 
  if (!req.isAuthenticated()) { // no login 
    return res.redirect("/login-register");
  }
  next();
};

let checkLogoutUser = (req, res, next) => {
  if (req.isAuthenticated()) { // true login
    return res.redirect("/");
  }
  next();
};

module.exports = {
  getLoginRegister: getLoginRegister,
  postRegister: postRegister,
  verifyAccount: verifyAccount,
  getLogoutUser: getLogoutUser,
  checkLoginUser: checkLoginUser,
  checkLogoutUser: checkLogoutUser
};