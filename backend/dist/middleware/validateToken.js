import jwt from "jsonwebtoken";
export const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || req.headers["Authorization"];
        const token = typeof authHeader === "string" && authHeader && authHeader.startsWith("Bearer") && authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "No Token found" });
            return;
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(400);
                return;
            }
            const { email, userId } = decoded;
            req.user = {
                userId,
                email
            };
            next();
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
        return;
    }
};
//# sourceMappingURL=validateToken.js.map