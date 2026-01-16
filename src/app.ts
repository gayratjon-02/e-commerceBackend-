import cors from "cors";
import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/types/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common";
import cookieParser from "cookie-parser";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

const app = express();

/**
 * MUHIM: nginx ortida bo‘lganda
 * cookie secure / https detection uchun kerak bo‘ladi
 */
app.set("trust proxy", 1);

// Static
app.use(express.static(path.join(__dirname, "public")));

// Uploads (backend ichida real papka: src/../uploads)
// Domen orqali kelishi: https://exclusiveshop.app/api/uploads/...
// nginx /api/ -> / ga kesgani uchun backendda bu /uploads/... bo‘lib keladi
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * CORS - production
 * credentials: true bo‘lsa origin "*" bo‘la olmaydi
 */
app.use(
  cors({
    credentials: true,
    origin: ["https://exclusiveshop.app", "https://www.exclusiveshop.app"],
  })
);

app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

/**
 * Session
 * production uchun secure cookie tavsiya qilinadi.
 * Agar localda ham ishlatmoqchi bo‘lsangiz NODE_ENV ga qarab qilamiz.
 */
const isProd = process.env.NODE_ENV === "production";

app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    store,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 3600 * 6, // 6h
      httpOnly: true,
      secure: isProd, // production: true
      sameSite: "lax", // ko‘p holatda yetadi
    },
  })
);

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routers
app.use("/admin", routerAdmin);
app.use("/", router);

export default app;
