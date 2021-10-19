import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({
    msg: "Got it!",
  });
});

export default routes;
