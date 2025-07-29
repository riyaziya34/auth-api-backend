const express = require("express");
const authRoutes = express.Router();
const { isAuthenticated, register, login, logout } = require("./auth");

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/is-auth", isAuthenticated);

module.exports = authRoutes;
