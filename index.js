const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// GET data
app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase
    .from("test")
    .select("*");

  if (error) return res.status(500).json(error);
  res.json(data);
});

// POST data
app.post("/add-name", async (req, res) => {
  const { name } = req.body;

  const { data, error } = await supabase
    .from("test")
    .insert([{ name }]);

  if (error) return res.status(500).json(error);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
