import express from "express";
export const routeUnknown = express.Router();

routeUnknown.use((req, res) => {
    res.status(404).json({
        message: 'page not found'
    })
})
