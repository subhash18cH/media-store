import express from "express";
import mediaRoutes from "./routes/media.routes.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;
const Frontend_url = process.env.FRONTEND_URL;
app.use(express.json());
app.use(cors({
    origin: Frontend_url,
    credentials: true
}));
app.use("/api/auth", userRoutes);
app.use("/api/media", mediaRoutes);
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectDB();
});
//# sourceMappingURL=index.js.map