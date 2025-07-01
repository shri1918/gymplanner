"use client";

import React, { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { UserInfoForm } from "@/components/UserInfoForm";
import { WorkoutPlanDisplay, Plan } from "@/components/WorkoutPlanDisplay";
import { generatePlan } from "@/services/aiService";
import { toast } from "sonner";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { LanguageSwitcher } from "@/components/LanguageSwitcher"; // Import LanguageSwitcher

const Index = () => {
  const { t, i18n } = useTranslation(); // Initialize useTranslation
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    setPlan(null); // Clear previous plan
    try {
      const generatedPlan = await generatePlan(data, i18n.language); // Pass current language
      setPlan(generatedPlan);
      toast.success(t("plan_generated_success")); // Use translated toast message
    } catch (error) {
      console.error("Failed to generate plan:", error);
      toast.error(t("plan_generated_error")); // Use translated toast message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative p-4 sm:p-6 lg:p-8"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/45244/fire-match-flame-sulfur-45244.jpeg'), linear-gradient(to bottom right, #f9fafb, #e5e7eb)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for dark mode and readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        <div className="text-center mb-8 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white dark:text-gray-100 leading-tight">
            {t("app_title")} <span className="text-blue-600 dark:text-blue-400">Fitness</span> Planner
          </h1>
          <p className="text-lg sm:text-xl text-white dark:text-white">
            {t("app_subtitle")}
          </p>
        </div>

        <div className="w-full max-w-md sm:max-w-lg lg:max-w-4xl">
          {!plan ? (
            <UserInfoForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          ) : (
            <WorkoutPlanDisplay plan={plan} />
          )}
        </div>

        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;