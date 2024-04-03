import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  let token = req.header("token");

  jwt.verify(token, 'treka', (err, decoded) => {
    if (err) {
      return res.json({ message: "Invalid token...", err });
    }else{
      req.userId = decoded.userId;
      next();
    }
  
  });
}
export {
  auth
}
