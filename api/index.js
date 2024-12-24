import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Global Vars/Setup
dotenv.config();

const app = express();
const port = 8000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files

// Home route
app.get('/', (req, res) => {
  try {
    res.sendFile('index.html', { root: './public' });
  } catch (error) {
    console.error(error);
  }
});

// Docs page
app.get('/docs', (req, res) => {
  try {
    res.sendFile('docs.html', { root: './public' });
  } catch (error) {
    console.error(error);
  }
});

// Suggest page
app.get('/suggest', (req, res) => {
  try {
    res.sendFile('suggest.html', { root: './public' });
  } catch (error) {
    console.error(error);
  }
});

// Thanks page
app.get('/thanks', (req, res) => {
  try {
    res.sendFile('thanks.html', { root: './public' });
  } catch (error) {
    console.error(error);
  }
});

/* 
API routes
*/

// GET routes

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
  const { data, error } = await supabase.from('statements').select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const randomStatement = data[Math.floor(Math.random() * data.length)];
  res.json(randomStatement);
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
app.get('/:category', async (req, res) => {
  const { data, error } = await supabase
    .from('statements')
    .select('*')
    .eq('category', req.params.category);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Get random statement from a certain category
app.get('/:category/random', async (req, res) => {
  const { data, error } = await supabase
    .from('statements')
    .select('*')
    .eq('category', req.params.category);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const randomStatement = data[Math.floor(Math.random() * data.length)];
  res.json(randomStatement);
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

// POST routes

// Add a new statement
app.post('/suggest', async (req, res) => {
  const { statement, is_true, category, source } = req.body;

  const { data, error } = await supabase.from('suggestions').insert([
    {
      statement,
      is_true,
      category,
      source,
    },
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.redirect('/thanks');
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});

export default app;
