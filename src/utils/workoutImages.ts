export const getExerciseImage = (exerciseName: string) => {
  const lower = exerciseName.toLowerCase();

  if (lower.includes("bench press")) {
    return "https://images.pexels.com/photos/7289245/pexels-photo-7289245.jpeg?_gl=1*18k3jpn*_ga*NzkxMzE3MzMzLjE3NTAzMjAzNTY.*_ga_8JE65Q40S6*czE3NTEzNDYyODckbzQkZzEkdDE3NTEzNDY0NjUkajU5JGwwJGgw";
  }
  if (lower.includes("incline dumbbell press")) {
    return "https://images.pexels.com/photos/7187964/pexels-photo-7187964.jpeg";
  }
  if (lower.includes("triceps pushdowns")) {
    return "https://images.pexels.com/photos/5327487/pexels-photo-5327487.jpeg";
  }
  if (lower.includes("pull-ups")) {
    return "https://images.pexels.com/photos/6389502/pexels-photo-6389502.jpeg";
  }
  if (lower.includes("barbell rows")) {
    return "https://images.pexels.com/photos/3025027/pexels-photo-3025027.png";
  }
  if (lower.includes("bicep curls")) {
    return "https://images.pexels.com/photos/7188078/pexels-photo-7188078.jpeg";
  }
  if (lower.includes("squats")) {
    return "https://images.pexels.com/photos/4164465/pexels-photo-4164465.jpeg";
  }
  if (lower.includes("deadlifts")) {
    return "https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg";
  }
  if (lower.includes("overhead press")) {
    return "https://images.pexels.com/photos/7187964/pexels-photo-7187964.jpeg";
  }
  if (lower.includes("leg press")) {
    return "https://images.pexels.com/photos/18060067/pexels-photo-18060067.jpeg";
  }
  if (lower.includes("lat pulldowns")) {
    return "https://images.pexels.com/photos/13965347/pexels-photo-13965347.jpeg";
  }
  if (lower.includes("dumbbell shoulder press")) {
    return "https://images.pexels.com/photos/7289370/pexels-photo-7289370.jpeg";
  }
  if (lower.includes("cardio") || lower.includes("run")) {
    return "https://images.pexels.com/photos/4775192/pexels-photo-4775192.jpeg";
  }

  // Fallback image
  return "https://images.pexels.com/photos/4397833/pexels-photo-4397833.jpeg";
};
