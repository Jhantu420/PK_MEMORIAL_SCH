import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";
import router from "./src/routes/routes.js";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
// app.use(cors({ origin: "https://pk-memorial-client.onrender.com" , credentials:true})); 
app.use(cors({ origin: "http://localhost:5173" , credentials:true})); 
app.use(cookieParser());

app.use("/api/v1", router);

connectDB();
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});



// import express from "express";
// import "dotenv/config";
// import { connectDB } from "./src/config/db.js";
// import cookieParser from "cookie-parser";
// import router from "./src/routes/routes.js";
// import path from "path";
// import { fileURLToPath } from "url";
// const app = express();
// const PORT = process.env.PORT;

// // handle _dirname in ES modules
// const _filename = fileURLToPath(import.meta.url);
// const _dirname = path.dirname(_filename);

// app.use(express.json());
// app.use(cookieParser());
// connectDB();
// app.use("/api/v1", router);


// // ✅ Serve frontend
// const frontendPath = path.join(_dirname, "..", "client", "dist");
// app.use(express.static(frontendPath));

// // ✅ Handle all other routes with React index.html
// app.get('/{*any}', (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`server running on http://localhost:${PORT}`);
// });
