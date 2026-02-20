import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
