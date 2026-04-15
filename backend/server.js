require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const errorMiddleware = require("./Middlewares/errorMiddleware");

// All routes

const adminRoutes = require("./Routes/adminRoutes");
const contactMsgRoutes = require("./Routes/contactMsgRoutes");
const contactInfoRoutes = require("./Routes/contactInfoRouter");
const aboutusRoutes = require("./Routes/aboutusRoutes");
const betterRoutes = require("./Routes/betterRoutes");
const teamRoutes = require("./Routes/teamRoutes");
const memberRoutes = require("./Routes/memberRoutes");
const blogRoutes = require("./Routes/blogRoutes");
const careerRoutes = require("./Routes/careerRoutes");
const serviceproRoutes = require("./Routes/serviceproRouter");
//
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// only routes

app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactMsgRoutes);
app.use("/api/contactinfo", contactInfoRoutes);
app.use("/api/aboutus", aboutusRoutes);
app.use("/api/better", betterRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/servicepro", serviceproRoutes);
//

app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
