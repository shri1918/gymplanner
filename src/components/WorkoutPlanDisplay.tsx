"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { getExerciseImage } from "@/utils/workoutImages";
import { Utensils, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2pdf from 'html2pdf.js';
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export type Plan = {
  workoutPlan: {
    title: string;
    days: {
      day: string;
      exercises: { name: string; sets: string; reps: string }[];
    }[];
  };
  dietPlan: {
    title: string;
    meals: { name: string; description: string }[];
  };
};

type WorkoutPlanDisplayProps = {
  plan: Plan;
};

export const WorkoutPlanDisplay: React.FC<WorkoutPlanDisplayProps> = ({ plan }) => {
  const { t } = useTranslation();
  const planContentRef = useRef<HTMLDivElement>(null);
  const [openWorkoutAccordions, setOpenWorkoutAccordions] = useState<string[]>([]);
  const [openDietAccordions, setOpenDietAccordions] = useState<string[]>([]);

  const handleDownloadPdf = async () => {
    if (planContentRef.current) {
      toast.loading(t("generating_pdf_toast"), { id: "pdf-toast" });

      // Temporarily open all accordions
      const allWorkoutItems = plan.workoutPlan.days.map((_, i) => `item-${i}`);
      const allDietItems = plan.dietPlan.meals.map((_, i) => `meal-${i}`);
      setOpenWorkoutAccordions(allWorkoutItems);
      setOpenDietAccordions(allDietItems);

      // Give a small delay for the DOM to update with expanded content
      await new Promise(resolve => setTimeout(resolve, 500));

      html2pdf().from(planContentRef.current).set({
        margin: [10, 10, 10, 10],
        filename: 'personalized_fitness_plan.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).save().then(() => {
        toast.success(t("pdf_download_success_toast"), { id: "pdf-toast" });
      }).catch((error) => {
        console.error("Error generating PDF:", error);
        toast.error(t("pdf_download_error_toast"), { id: "pdf-toast" });
      }).finally(() => {
        // Collapse accordions back after download attempt
        setOpenWorkoutAccordions([]);
        setOpenDietAccordions([]);
      });
    } else {
      toast.error(t("pdf_content_not_found_toast"), { id: "pdf-toast" });
    }
  };

  return (
    <div className="w-full min-h-screen overflow-scroll space-y-6">
      <Card>
        <CardHeader className="flex flex-col items-center justify-between space-y-4 pb-2">
          <img
            src="https://images.pexels.com/photos/11378212/pexels-photo-11378212.jpeg" // Generic image for the plan
            alt="Fitness Plan"
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <div className="flex flex-row items-center justify-between w-full">
            <CardTitle className="text-2xl font-bold text-center flex-grow">{t("your_personalized_plan_title")}</CardTitle>
            <Button onClick={handleDownloadPdf} variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              {t("download_pdf_button")}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6" ref={planContentRef}>
          <section>
            <h2 className="text-xl font-semibold mb-4">{plan.workoutPlan.title}</h2>
            <Accordion
              type="multiple"
              value={openWorkoutAccordions}
              onValueChange={setOpenWorkoutAccordions}
              className="w-full"
            >
              {plan.workoutPlan.days.map((dayData, dayIndex) => (
                <AccordionItem value={`item-${dayIndex}`} key={dayIndex}>
                  <AccordionTrigger className="text-lg font-medium">{dayData.day}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-4">
                      {dayData.exercises.map((exercise, exIndex) => (
                        <li key={exIndex} className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md shadow-sm">
                          <img
                            src={getExerciseImage(exercise.name)}
                            alt={exercise.name}
                            className="w-48 h-48 object-cover rounded-md mr-4 flex-shrink-0 border-2 border-gray-300 dark:border-gray-700"
                          />
                          <div>
                            <strong className="text-lg">{exercise.name}:</strong>{" "}
                            <span className="text-gray-700 dark:text-gray-300">
                              {t("sets_reps_format", { sets: exercise.sets, reps: exercise.reps })}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-4">{plan.dietPlan.title}</h2>
            <Accordion
              type="multiple"
              value={openDietAccordions}
              onValueChange={setOpenDietAccordions}
              className="w-full"
            >
              {plan.dietPlan.meals.map((meal, index) => (
                <AccordionItem value={`meal-${index}`} key={index}>
                  <AccordionTrigger className="text-lg font-medium flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    {meal.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="mt-2 border-l-4 border-blue-500 dark:border-blue-400">
                      <CardHeader className="py-2 px-4 bg-blue-50 dark:bg-blue-900/20">
                        <CardTitle className="text-md font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-300">
                          <Utensils className="h-4 w-4" />
                          {meal.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-3 px-4 text-gray-800 dark:text-gray-200">
                        <p>{meal.description}</p>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};
// "use client"

// import type React from "react"
// import { useRef, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Separator } from "@/components/ui/separator"
// import { getExerciseImage } from "@/utils/workoutImages"
// import { Utensils, Download, ArrowLeft, Flame } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import html2pdf from "html2pdf.js"
// import { toast } from "sonner"
// import { useTranslation } from "react-i18next"

// export type Plan = {
//   workoutPlan: {
//     title: string
//     days: {
//       day: string
//       exercises: { name: string; sets: string; reps: string }[]
//     }[]
//   }
//   dietPlan: {
//     title: string
//     meals: { name: string; description: string }[]
//   }
// }

// type WorkoutPlanDisplayProps = {
//   plan: Plan
// }

// export const WorkoutPlanDisplay: React.FC<WorkoutPlanDisplayProps> = ({ plan }) => {
//   const { t } = useTranslation()
//   const planContentRef = useRef<HTMLDivElement>(null)
//   const [openWorkoutAccordions, setOpenWorkoutAccordions] = useState<string[]>([])
//   const [openDietAccordions, setOpenDietAccordions] = useState<string[]>([])

//   const handleDownloadPdf = async () => {
//     if (planContentRef.current) {
//       toast.loading(t("generating_pdf_toast"), { id: "pdf-toast" })

//       const allWorkoutItems = plan.workoutPlan.days.map((_, i) => `item-${i}`)
//       const allDietItems = plan.dietPlan.meals.map((_, i) => `meal-${i}`)
//       setOpenWorkoutAccordions(allWorkoutItems)
//       setOpenDietAccordions(allDietItems)

//       await new Promise((resolve) => setTimeout(resolve, 500))

//       html2pdf()
//         .from(planContentRef.current)
//         .set({
//           margin: [10, 10, 10, 10],
//           filename: "personalized_fitness_plan.pdf",
//           image: { type: "jpeg", quality: 0.98 },
//           html2canvas: { scale: 2, useCORS: true },
//           jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
//         })
//         .save()
//         .then(() => {
//           toast.success(t("pdf_download_success_toast"), { id: "pdf-toast" })
//         })
//         .catch((error) => {
//           console.error("Error generating PDF:", error)
//           toast.error(t("pdf_download_error_toast"), { id: "pdf-toast" })
//         })
//         .finally(() => {
//           setOpenWorkoutAccordions([])
//           setOpenDietAccordions([])
//         })
//     } else {
//       toast.error(t("pdf_content_not_found_toast"), { id: "pdf-toast" })
//     }
//   }

//   return (
//     <div className="w-full space-y-6">
//       {/* Header with Back Button */}
//       <div className="flex items-center justify-between">
//         <Button
//           variant="ghost"
//           size="sm"
//           className="gap-2 text-muted-foreground hover:text-foreground"
//           onClick={() => window.location.reload()}
//         >
//           <ArrowLeft className="h-4 w-4" />
//           {t("back_button") || "Back"}
//         </Button>
//         <Button onClick={handleDownloadPdf} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
//           <Download className="h-4 w-4" />
//           {t("download_pdf_button")}
//         </Button>
//       </div>

//       {/* Main Plan Card */}
//       <Card className="border-0 shadow-lg overflow-hidden">
//         {/* Hero Image */}
//         <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
//           <img
//             src="https://images.pexels.com/photos/11378212/pexels-photo-11378212.jpeg"
//             alt="Fitness Plan"
//             className="h-full w-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
//         </div>

//         <CardHeader className="space-y-4 pb-6">
//           <CardTitle className="text-3xl font-bold text-foreground">{t("your_personalized_plan_title")}</CardTitle>
//           <p className="text-sm text-muted-foreground">Follow this plan consistently for best results</p>
//         </CardHeader>

//         <CardContent className="space-y-8" ref={planContentRef}>
//           {/* Workout Plan Section */}
//           <section>
//             <div className="mb-6 flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
//                 <Flame className="h-5 w-5 text-primary" />
//               </div>
//               <h2 className="text-2xl font-bold text-foreground">{plan.workoutPlan.title}</h2>
//             </div>
//             <Accordion
//               type="multiple"
//               value={openWorkoutAccordions}
//               onValueChange={setOpenWorkoutAccordions}
//               className="w-full space-y-3"
//             >
//               {plan.workoutPlan.days.map((dayData, dayIndex) => (
//                 <AccordionItem
//                   value={`item-${dayIndex}`}
//                   key={dayIndex}
//                   className="border border-border rounded-lg px-4 data-[state=open]:bg-muted/50"
//                 >
//                   <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
//                     {dayData.day}
//                   </AccordionTrigger>
//                   <AccordionContent className="pt-4">
//                     <ul className="space-y-4">
//                       {dayData.exercises.map((exercise, exIndex) => (
//                         <li
//                           key={exIndex}
//                           className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-start"
//                         >
//                           <img
//                             src={getExerciseImage(exercise.name) || "/placeholder.svg"}
//                             alt={exercise.name}
//                             className="h-40 w-full rounded-lg object-cover sm:h-32 sm:w-32 flex-shrink-0"
//                           />
//                           <div className="flex-1">
//                             <h4 className="text-lg font-semibold text-foreground">{exercise.name}</h4>
//                             <p className="mt-2 text-sm text-muted-foreground">
//                               {t("sets_reps_format", { sets: exercise.sets, reps: exercise.reps })}
//                             </p>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </section>

//           <Separator className="my-8" />

//           {/* Diet Plan Section */}
//           <section>
//             <div className="mb-6 flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
//                 <Utensils className="h-5 w-5 text-primary" />
//               </div>
//               <h2 className="text-2xl font-bold text-foreground">{plan.dietPlan.title}</h2>
//             </div>
//             <Accordion
//               type="multiple"
//               value={openDietAccordions}
//               onValueChange={setOpenDietAccordions}
//               className="w-full space-y-3"
//             >
//               {plan.dietPlan.meals.map((meal, index) => (
//                 <AccordionItem
//                   value={`meal-${index}`}
//                   key={index}
//                   className="border border-border rounded-lg px-4 data-[state=open]:bg-muted/50"
//                 >
//                   <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
//                     {meal.name}
//                   </AccordionTrigger>
//                   <AccordionContent className="pt-4">
//                     <Card className="border-l-4 border-l-primary bg-primary/5">
//                       <CardContent className="pt-6">
//                         <p className="text-foreground leading-relaxed">{meal.description}</p>
//                       </CardContent>
//                     </Card>
//                   </AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </section>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
