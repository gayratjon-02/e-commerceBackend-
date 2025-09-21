import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import mongoose from "mongoose";

mongoose
// TCP muntazam database bb aloqa qurish
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDB connection succeed");
    // const PORT = process.env.PORT ?? 3003;
    const PORT = Number(process.env.PORT) || 3003;

    app.listen(PORT, function () {
      console.info(` The server is running successfully on port : http://localhost:${PORT}/`);
      console.info(`Admin project on http://localhost:${PORT}/admin \n`)
    });
  })
  .catch((err) => console.log("ERROR on connection MongoDD", err));
