const calculateBmi = (height: number, weight: number): { bmi: number; category: string } => {
  if (height <= 0 || weight <= 0) throw new Error('Height and weight must be positive numbers');
  
  const bmi = weight / ((height / 100) ** 2);
  let category: string;
  
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal range';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';
  
  return { bmi, category };
};

try {
  if (process.argv.length < 4) throw new Error('Not enough arguments');
  
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  
  if (isNaN(height) || isNaN(weight)) throw new Error('Provided values were not numbers');
  
  const result = calculateBmi(height, weight);
  console.log(`BMI: ${result.bmi.toFixed(1)}, ${result.category}`);
} catch (error: unknown) {
  let errorMessage = 'Error: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
