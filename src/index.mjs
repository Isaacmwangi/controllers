
import express from "express";
import router from './routes/index.mjs'; //this is my router from the routes folder

const app = express();
app.use(express.json());

// Use the router
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
