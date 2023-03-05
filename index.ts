import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

import facultyRoutes from "./routes/faculty.route";
import facultyAdminRoutes from "./routes/admin/faculty.route";
import courseRoutes from "./routes/course.route";
import courseAdminRoutes from "./routes/admin/course.route";
import slotRoutes from "./routes/slot.route";
import slotAdminRoutes from "./routes/admin/slot.route";
import studentRoutes from "./routes/student.route";
import studentAdminRoutes from "./routes/admin/student.route";

// generate the token for the admin user
// don't do this in production
const adminToken = jwt.sign(
  {id: "admin007", role: "admin"},
  process.env.JWT_SECRET!
);

console.log("Admin Token: " + adminToken);

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/faculty", facultyRoutes);
app.use("/course", courseRoutes);
app.use("/slot", slotRoutes);
app.use("/student", studentRoutes);

app.use("/admin/faculty", facultyAdminRoutes);
app.use("/admin/course", courseAdminRoutes);
app.use("/admin/slot", slotAdminRoutes);
app.use("/admin/student", studentAdminRoutes);

app.use((req, res, next) => {
  const err = new Error("Could not find this route");
  res.status(404);
  next(err);
});

app.use((error: any, req: any, res: any, next: any) => {
  res.json({success: false, data: {error: error.message}});
});

server.listen(process.env.PORT);
