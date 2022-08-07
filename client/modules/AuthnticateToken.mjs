import jwt from "jsonwebtoken";

export default function AuthenticateToken(req, res, next) {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token = req.cookies.token;
  if (token == null) return res.sendStatus(401).send(false);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).send({});
    req.user = user;
    next();
  });
}
