// "use client";

// import React, { useState } from "react";
// import { MadeWithDyad } from "@/components/made-with-dyad";
// import { UserInfoForm } from "@/components/UserInfoForm";
// import { WorkoutPlanDisplay, Plan } from "@/components/WorkoutPlanDisplay";
// import { generatePlan } from "@/services/aiService";
// import { toast } from "sonner";
// import { useTranslation } from "react-i18next"; // Import useTranslation
// import { LanguageSwitcher } from "@/components/LanguageSwitcher"; // Import LanguageSwitcher

// const Index = () => {
//   const { t, i18n } = useTranslation(); // Initialize useTranslation
//   const [plan, setPlan] = useState<Plan | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFormSubmit = async (data: any) => {
//     setIsLoading(true);
//     setPlan(null); // Clear previous plan
//     try {
//       const generatedPlan = await generatePlan(data, i18n.language); // Pass current language
//       setPlan(generatedPlan);
//       toast.success(t("plan_generated_success")); // Use translated toast message
//     } catch (error) {
//       console.error("Failed to generate plan:", error);
//       toast.error(t("plan_generated_error")); // Use translated toast message
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4"
//       // style={{
//       //   backgroundImage: `url('https://images.pexels.com/photos/45244/fire-match-flame-sulfur-45244.jpeg'), linear-gradient(to bottom right, #f9fafb, #e5e7eb)`,
//       //   backgroundSize: 'cover',
//       //   backgroundPosition: 'center',
//       //   backgroundRepeat: 'no-repeat',
//       // }}
//     >
//       <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>
//       {/* Overlay for dark mode and readability */}
//       <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />
//       <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
//         <div className="absolute top-4 right-4">
//           <LanguageSwitcher />
//         </div>
//         <div className="text-center mb-8 max-w-3xl">
//           <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white dark:text-gray-100 leading-tight">
//             {t("app_title")} <span className="text-blue-600 dark:text-blue-400">Fitness</span> Planner
//           </h1>
//           <p className="text-lg sm:text-xl text-white dark:text-white">
//             {t("app_subtitle")}
//           </p>
//         </div>

//         <div className="w-full max-w-md sm:max-w-lg lg:max-w-4xl ">
//           {!plan ? (
//             <UserInfoForm onSubmit={handleFormSubmit} isLoading={isLoading} />
//           ) : (
//             <WorkoutPlanDisplay plan={plan} />
//           )}
//         </div>

//         <MadeWithDyad />
//       </div>
//     </div>
//   );
// };

// export default Index;
"use client"

import { useState } from "react"
import { UserInfoForm } from "@/components/user-info-form"
import { WorkoutPlanDisplay, type Plan } from "@/components/workout-plan-display"
import { generatePlan } from "@/services/aiService"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { Dumbbell } from "lucide-react"

const Index = () => {
  const { t, i18n } = useTranslation()
  const [plan, setPlan] = useState<Plan | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true)
    setPlan(null)
    try {
      const generatedPlan = await generatePlan(data, i18n.language)
      setPlan(generatedPlan)
      toast.success(t("plan_generated_success"))
    } catch (error) {
      console.error("Failed to generate plan:", error)
      toast.error(t("plan_generated_error"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Dumbbell className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">FitPlan</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {!plan ? (
          <div className="w-full max-w-2xl">
            {/* Hero Section */}
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Your Personal <span className="text-primary">Fitness</span> Journey
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">{t("app_subtitle")}</p>
            </div>

            {/* Form */}
            <UserInfoForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        ) : (
          <div className="w-full">
            <WorkoutPlanDisplay plan={plan} />
          </div>
        )}
      </main>
    </div>
  )
}

export default Index
