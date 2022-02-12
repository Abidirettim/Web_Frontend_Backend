import jwt from "jsonwebtoken"

export default (req, res, next) => {
  try {

    const token = req.headers.authorization.split(" ")[1];
    const _ = jwt.verify(token, process.env.JWT_KEY);

    next();

  } catch (err) {

    return res.status(401).json({
      message: 'Auth failed'
    });

  }
};