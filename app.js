const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth_routes");
const eventRoutes = require("./routes/event_routes");
const ticketRoutes = require("./routes/ticket_routes");
const adminRoutes = require("./routes/admin_routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send({ status: "ok", service: "Eventify API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/admin", adminRoutes);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send({ error: err.message || "Internal error" });
});

module.exports = { app };
