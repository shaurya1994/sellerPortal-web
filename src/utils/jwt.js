// FILE: src/utils/jwt.js

const jwt = require("jsonwebtoken");
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

exports.generateAccessToken = (user) => 
  jwt.sign({ id: user.id, role: user.role }, ACCESS_SECRET, { expiresIn: "30m" });

exports.generateRefreshToken = (user) => 
  jwt.sign({ id: user.id, role: user.role }, REFRESH_SECRET, { expiresIn: "15d" });

exports.verifyRefreshToken = (token) =>
  jwt.verify(token, REFRESH_SECRET);
