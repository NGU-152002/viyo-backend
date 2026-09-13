import crypto from "crypto";
import jwt from "jsonwebtoken";
export const generateSecretHash = (key: string) => {
  return crypto
    .createHmac("sha256", process.env.CONGNITO_CLIENT_SECRET || "")
    .update(key + process.env.CONGNITO_CLIENT_ID)
    .digest("base64");
};

export const jwtDecode = (payload: string) => {
  return jwt.decode(payload);
};

export const generateJWTTokenForUser = (subId: string) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) throw new Error("JWT Secret key not found.");
  return jwt.sign({ subId: subId }, secretKey, {
    expiresIn: "1h",
  });
};
