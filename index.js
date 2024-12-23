import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config(); // Load environment variables

const app = express();
const port = 3000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

// Get all statements
app.get('/all', async (req, res) => {
  const { data, error } = await supabase.from('statements').select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Get random statement
app.get('/random', async (req, res) => {
  const { data, error } = await supabase
    .from('statements')
    .select('*')
    .order('random()')
    .limit(1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// All true statements
app.get('/true', async (req, res) => {
  const { data, error } = await supabase
    .from('statements')
    .select('*')
    .eq('is_true', true);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// All false statements
app.get('/false', async (req, res) => {
  const { data, error } = await supabase
    .from('statements')
    .select('*')
    .eq('is_true', false);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// All statements from a certain category
app.get('/category/:category', async (req, res) => {
  const { data, error } = await supabase
    .from('statements')
    .select('*')
    .eq('category', req.params.category);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Get ID
app.get('/id/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('statements')
    .select('*')
    .eq('id', req.params.id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
