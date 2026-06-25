require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db.js");

const itemrouter = require("./routes/itemRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const paymentRoutes = require('./routes/paymentRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.use("/api", itemrouter);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use('/api/order', paymentRoutes)

app.get('/', (req, res) => {
    res.send("Success")
})

app.listen(5000);
