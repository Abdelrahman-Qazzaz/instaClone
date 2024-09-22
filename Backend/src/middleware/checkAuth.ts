import Middleware from "src/types/Middleware.ts";

export const checkAuth: Middleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }
  jwt.verify(token, process.env.SECRETWORD, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ user_id: -1 }); // Forbidden
    }

    req.user = user; // this will make using req.user._id possible

    next();
  });
};
