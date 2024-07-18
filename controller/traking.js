import jwt from "jsonwebtoken";
import db from "../db.js";

export const addSugar = (req, res) => {
  const { value, date, classification } = req.body;
  const token = req.cookies.accessTocken;
  //check if user logd in
  if (!token) return res.status(401).json("You are not logd in");
  // verify tocken and make request
  jwt.verify(token, "secret key", async (err, userInfo) => {
    if (err) return res.status(500).json(err);
    try {
      await db.query(
        "INSERT INTO blood_sugar_reading(user_id, reading_value, reading_date, level) VALUES($1,$2 ,$3 , $4)",
        [userInfo.id, value, date, classification]
      );
      return res.status(200).send({ msg: "enregistre avec success" });
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};

export const getSugar = (req, res) => {
  //check if user logd in
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("You are not logd in");
  // verify tocken and make request
  jwt.verify(token, "secret key", async (err, userInfo) => {
    if (err) return res.status(500).json(err);
    try {
      const result = await db.query(
        "SELECT * FROM blood_sugar_reading WHERE user_id = $1 ORDER BY reading_date ASC LIMIT 6 ",
        [userInfo.id]
      );
      return res.status(200).send({ data: result.rows });
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};
export const deletSugar = (req, res) => {
  //check if user logd in
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("You are not logd in");
  // verify tocken and make request
  jwt.verify(token, "secret key", async (err, userInfo) => {
    if (err) return res.status(500).json(err);
    try {
      const result = await db.query(
        "DELETE FROM  blood_sugar_reading WHERE user_id = $1",
        [userInfo.id]
      );
      return res.status(200).send("delete succss");
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};
export const addTension = (req, res) => {
  const { value, date, classification } = req.body;
  const token = req.cookies.accessTocken;
  //check if user logd in
  if (!token) return res.status(401).json("You are not logd in");
  // verify tocken and make request
  jwt.verify(token, "secret key", async (err, userInfo) => {
    if (err) return res.status(500).json(err);
    try {
      await db.query(
        "INSERT INTO blood_tension_reading(user_id, reading_value, reading_date, class) VALUES($1,$2 ,$3 , $4)",
        [userInfo.id, value, date, classification]
      );
      return res.status(200).send({ msg: "enregistre avec success" });
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};

export const getTension = (req, res) => {
  //check if user logd in
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("You are not logd in");
  // verify tocken and make request
  jwt.verify(token, "secret key", async (err, userInfo) => {
    if (err) return res.status(500).json(err);
    try {
      const result = await db.query(
        "SELECT * FROM blood_tension_reading WHERE user_id = $1 ORDER BY reading_date ASC LIMIT 6 ",
        [userInfo.id]
      );
      return res.status(200).send({ data: result.rows });
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};
export const deletTension = (req, res) => {
  //check if user logd in
  const token = req.cookies.accessTocken;
  if (!token) return res.status(401).json("You are not logd in");
  // verify tocken and make request
  jwt.verify(token, "secret key", async (err, userInfo) => {
    if (err) return res.status(500).json(err);
    try {
      const result = await db.query(
        "DELETE FROM  blood_tension_reading WHERE user_id = $1",
        [userInfo.id]
      );
      return res.status(200).send("delete succss");
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};

