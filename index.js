const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

// Check env variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error("Supabase environment variables missing!");
}

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Root route
app.get("/", (req, res) => {
  res.send("Cloud-Based Web Application Successfully Deployed on Render!");
});

// Test DB route
app.get("/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("test")
      .select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Unexpected error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
