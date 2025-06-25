import express from "express";
import { createAdmin, getAdmin, updateAdmin, deleteAdmin, getAllAdmin, loginAdmin, logoutAdmin, getAdminProfile } from "../controllers/adminController.js";
const route = express.Router();

route.post("/create", createAdmin);
route.get("/", getAllAdmin);
route.get("/:id", getAdmin);
route.put("/:id", updateAdmin);
route.delete("/:id", deleteAdmin);
route.post("/login", loginAdmin);
route.post("/logout", logoutAdmin); 
route.post("/profile", getAdminProfile);

export default route;