interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  if (target <= 0) throw new Error('Target must be a positive number');
  if (dailyHours.length === 0) throw new Error('Daily hours array cannot be empty');
  if (dailyHours.some(h => h < 0)) throw new Error('Daily hours must be non-negative');
  
  const average = dailyHours.reduce((sum, hours) => sum + hours, 0) / dailyHours.length;
  const ratio = average / target;
  
  let rating: number;
  let ratingDescription: string;
  
  if (ratio >= 1) {
    rating = 3;
    ratingDescription = 'excellent, target met';
  } else if (ratio >= 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'poor, needs improvement';
  }
  
  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(hours => hours > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  if (process.argv.length < 4) throw new Error('Not enough arguments');
  
  const target = Number(process.argv[2]);
  const dailyHours = process.argv.slice(3).map(Number);
  
  if (isNaN(target)) throw new Error('Target value was not a number');
  if (dailyHours.some(isNaN)) throw new Error('Provided values were not numbers');
  
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Error: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
