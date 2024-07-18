import db from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //1-check if te user exxist or not
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(409).send({ msg: "utilisateur non trouvé" });
    }
    //2-compare password
    const checkPasswors = await bcrypt.compare(
      password,
      result.rows[0].password
    );
    if (!checkPasswors) {
      return res.status(400).send({ msg: "Mauvais mot de passe" });
    }
    const tocken = jwt.sign({ id: result.rows[0].id }, "secret key");
    const { password: pwd, ...other } = result.rows[0];
    res
      .cookie("accessTocken", tocken, { httpOnly: true })
      .status(200)
      .json(other);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export const register = async (req, res) => {
  const saltRounds = 16;
  const { username, email, password, age, sex } = req.body;
  if (!password) {
    return res.status(400).send({ msg: "Password is required" });
  }
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      return res.status(403).send({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await db.query(
      "INSERT INTO users(username, email, password, age, sex) VALUES ($1, $2, $3, $4, $5)",
      [username, email, hashedPassword, age, sex]
    );
    res.status(200).send({ msg: "User has been created." });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
export const logout = (req, res) => {
  res
    .clearCookie("accessTocken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
};