import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import emailRoutes from "./routes/emailRoutes";
import uploadRoutes from "./routes/uploadRoute";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", emailRoutes);
app.use("/api", uploadRoutes);

export default app;
