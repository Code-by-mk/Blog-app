const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors'); 
const connectDb = require("./Config/db");
const authRoutes = require('./routes/authroute');
const postRoutes = require('./routes/postRoute');

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
});
