import express, { Request, Response, NextFunction } from "express";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log("-".repeat(20));
    console.log("Data:", new Date().toLocaleString());
    console.log("URL:", req.method, req.url);
    console.log("User Agent:", req.get("User-Agent"));
    next();
}

export default logMiddleware;