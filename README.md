# TypeScript Calculators

## Express Server

Start the server:
```bash
npm start
```

Server runs on http://localhost:3003

### Endpoints

#### GET /hello
Returns a greeting message.

#### GET /bmi
Calculate BMI via query parameters.

Example:
```bash
http://localhost:3003/bmi?height=180&weight=74
```

#### POST /exercises
Analyze exercise data.

Request body:
```json
{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}
```

Example:
```bash
curl -X POST http://localhost:3003/exercises \
  -H "Content-Type: application/json" \
  -d '{"daily_exercises": [1, 0, 2, 0, 3, 0, 2.5], "target": 2.5}'
```

## BMI Calculator

Calculate Body Mass Index and get health category.

```bash
npm run calculateBmi <height_cm> <weight_kg>
```

Example:
```bash
npm run calculateBmi 180 74
```

## Exercise Calculator

Analyze daily exercise hours against a target.

```bash
npm run calculateExercises <target_hours> <day1_hours> <day2_hours> ...
```

Example:
```bash
npm run calculateExercises 2 3 0 2 4.5 0 3 1
```
