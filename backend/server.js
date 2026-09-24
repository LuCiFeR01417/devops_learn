const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;


// -------------------------
// Middleware test
// -------------------------

app.use(cors());

app.use(express.json());


// -------------------------
// Temporary data
// -------------------------

let tips = [
    {
        id: 1,
        title: "Authentication",
        description:
            "Always validate authentication and authorization on the server.",
        category: "Web Security"
    },

    {
        id: 2,
        title: "API Security",
        description:
            "Never trust input received from the client.",
        category: "API Security"
    },

    {
        id: 3,
        title: "Security Headers",
        description:
            "Use appropriate HTTP security headers to reduce common web risks.",
        category: "Web Security"
    },

    {
        id: 4,
        title: "Secrets",
        description:
            "Never hardcode API keys, passwords, or other secrets in source code.",
        category: "Secure Coding"
    }
];


// -------------------------
// GET /api/health
// -------------------------

app.get("/api/health", (req, res) => {

    res.json({
        status: "online",
        message: "Backend is running",
        version: "1.0.0"
    });

});


// -------------------------
// GET /api/tips
// Get all tips
// -------------------------

app.get("/api/tips", (req, res) => {

    res.json({
        success: true,
        count: tips.length,
        tips: tips
    });

});


// -------------------------
// GET /api/tips/:id
// Get one tip
// -------------------------

app.get("/api/tips/:id", (req, res) => {

    const id = Number(req.params.id);

    const tip = tips.find((tip) => tip.id === id);

    if (!tip) {

        return res.status(404).json({
            success: false,
            message: "Tip not found"
        });

    }

    res.json({
        success: true,
        tip: tip
    });

});


// -------------------------
// POST /api/tips
// Create a new tip
// -------------------------

app.post("/api/tips", (req, res) => {

    const { title, description, category } = req.body;


    // Basic validation

    if (!title || !description || !category) {

        return res.status(400).json({
            success: false,
            message: "Title, description and category are required"
        });

    }


    const newTip = {

        id: Date.now(),

        title: title,

        description: description,

        category: category

    };


    tips.push(newTip);


    res.status(201).json({

        success: true,

        message: "Tip created successfully",

        tip: newTip

    });

});


// -------------------------
// PUT /api/tips/:id
// Replace entire tip
// -------------------------

app.put("/api/tips/:id", (req, res) => {

    const id = Number(req.params.id);

    const tipIndex = tips.findIndex(
        (tip) => tip.id === id
    );


    if (tipIndex === -1) {

        return res.status(404).json({
            success: false,
            message: "Tip not found"
        });

    }


    const { title, description, category } = req.body;


    if (!title || !description || !category) {

        return res.status(400).json({
            success: false,
            message:
                "Title, description and category are required for PUT"
        });

    }


    tips[tipIndex] = {

        id: id,

        title: title,

        description: description,

        category: category

    };


    res.json({

        success: true,

        message: "Tip replaced successfully",

        tip: tips[tipIndex]

    });

});


// -------------------------
// PATCH /api/tips/:id
// Partially update tip
// -------------------------

app.patch("/api/tips/:id", (req, res) => {

    const id = Number(req.params.id);

    const tip = tips.find(
        (tip) => tip.id === id
    );


    if (!tip) {

        return res.status(404).json({
            success: false,
            message: "Tip not found"
        });

    }


    // Only update fields that were provided

    if (req.body.title !== undefined) {
        tip.title = req.body.title;
    }

    if (req.body.description !== undefined) {
        tip.description = req.body.description;
    }

    if (req.body.category !== undefined) {
        tip.category = req.body.category;
    }


    res.json({

        success: true,

        message: "Tip updated successfully",

        tip: tip

    });

});


// -------------------------
// DELETE /api/tips/:id
// -------------------------

app.delete("/api/tips/:id", (req, res) => {

    const id = Number(req.params.id);

    const tipIndex = tips.findIndex(
        (tip) => tip.id === id
    );


    if (tipIndex === -1) {

        return res.status(404).json({
            success: false,
            message: "Tip not found"
        });

    }


    const deletedTip = tips.splice(
        tipIndex,
        1
    )[0];


    res.json({

        success: true,

        message: "Tip deleted successfully",

        tip: deletedTip

    });

});


// -------------------------
// Start server
// -------------------------

app.listen(PORT, () => {

    console.log(
        `Backend running at http://localhost:${PORT}`
    );

});