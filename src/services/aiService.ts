import { getGeminiResponse } from "./googleAIService";
import { Plan } from "@/components/WorkoutPlanDisplay";

type UserData = {
  height: number;
  weight: number;
  age: number;
  gender: "male" | "female" | "other";
  goal: "gain_weight" | "lose_weight" | "maintain_weight";
  dietaryPreference: "nature" | "non_veg" | "veg" | "both";
};

export const generatePlan = async (userData: UserData, language: string = "en"): Promise<Plan> => {
  const { height, weight, age, gender, goal, dietaryPreference } = userData;

  const languageInstruction = language === "mr" ? "in Marathi" : "in English";
  let dietaryInstruction = "";

  if (dietaryPreference === "nature") {
    dietaryInstruction = "The diet plan should focus on natural, unprocessed foods, avoiding artificial ingredients and highly processed items. Suggest meals that are easily available or can be prepared with common home ingredients, providing multiple options or variations for each meal.";
  } else if (dietaryPreference === "non_veg") {
    dietaryInstruction = "The diet plan should be non-vegetarian. Suggest meals that are easily available or can be prepared with common home ingredients, providing multiple options or variations for each meal.";
  } else if (dietaryPreference === "veg") {
    dietaryInstruction = "The diet plan should be vegetarian. Suggest meals that are easily available or can be prepared with common home ingredients, providing multiple options or variations for each meal.";
  } else if (dietaryPreference === "both") {
    dietaryInstruction = "The diet plan can include both vegetarian and non-vegetarian options. Suggest meals that are easily available or can be prepared with common home ingredients, providing multiple options or variations for each meal.";
  }

  const prompt = `Generate a personalized fitness plan (workout and diet) in JSON format ${languageInstruction} for a ${age} year old ${gender} who is ${height} cm tall and weighs ${weight} kg, with the goal to ${goal}. ${dietaryInstruction}

The JSON should have two main keys: 'workoutPlan' and 'dietPlan'.

'workoutPlan' should contain:
- 'title': A string for the workout plan title (e.g., "Muscle Gain Workout Plan").
- 'days': An array of objects. Each object should have:
  - 'day': A string for the day (e.g., "Monday: Chest & Triceps").
  - 'exercises': An array of objects. Each object should have:
    - 'name': A string for the exercise name (e.g., "Bench Press").
    - 'sets': A string for the number of sets (e.g., "3").
    - 'reps': A string for the number of reps (e.g., "8-12").

'dietPlan' should contain:
- 'title': A string for the diet plan title (e.g., "High-Calorie Diet Plan").
- 'meals': An array of objects. Each object should have:
  - 'name': A string for the meal name (e.g., "Breakfast").
  - 'description': A string describing the meal (e.g., "Oatmeal with berries and nuts, or scrambled eggs with whole-wheat toast.").

Ensure the entire output is a single, valid JSON string. Do not include any other text or markdown outside the JSON.`;

  try {
    const aiResponseText = await getGeminiResponse(prompt);
    // Remove markdown code block fences if present
    const cleanedResponseText = aiResponseText.replace(/```json\s*([\s\S]*?)\s*```/, '$1').trim();
  const parsedPlan: Plan = JSON.parse(cleanedResponseText);
  return parsedPlan;
  } catch (error) {
    console.error("Failed to parse AI response or generate plan:", error);
    throw new Error("Failed to generate plan from AI. The response might be invalid or the API key is missing.");
  }
};