import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/auth.js";

/* - - - - - - - - - - - - - - - - - - - - - - */

export function authRouter(router) {
  router.post("/sign-up", async (req, res) => {
    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const userData = await user.save();

    res.send(userData);
  });

  router.post("/login", async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    const payload = {
      email,
      id: user._id,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

    res.send({ accessToken });
  });

  return router;
}
