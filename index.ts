import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const result = calculateBmi(height, weight);
    return res.json({
      weight,
      height,
      bmi: { value: result.bmi.toFixed(1), category: result.category }
    });
  } catch (error: unknown) {
    return res.status(400).json({ error: error instanceof Error ? error.message : 'unknown error' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || !daily_exercises.every(d => typeof d === 'number') || typeof target !== 'number') {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const result = calculateExercises(daily_exercises, target);
    return res.json(result);
  } catch (error: unknown) {
    return res.status(400).json({ error: error instanceof Error ? error.message : 'unknown error' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
