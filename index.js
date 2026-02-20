const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Cloud-Based Web Application Successfully Deployed on Render!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
