"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface UserInfoFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, isLoading }) => {
  const { t } = useTranslation();

  const formSchema = z.object({
    height: z.coerce.number().min(50, { message: t("height_min_error") }).max(250, { message: t("height_max_error") }),
    weight: z.coerce.number().min(20, { message: t("weight_min_error") }).max(300, { message: t("weight_max_error") }),
    age: z.coerce.number().min(10, { message: t("age_min_error") }).max(100, { message: t("age_max_error") }),
    gender: z.enum(["male", "female", "other"], { message: t("gender_required_error") }),
    goal: z.enum(["gain_weight", "lose_weight", "maintain_weight"], { message: t("goal_required_error") }),
    dietaryPreference: z.enum(["nature", "non_veg", "veg", "both"], { message: t("dietary_required_error") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: 170,
      weight: 65,
      age: 25,
      gender: "male",
      goal: "maintain_weight",
      dietaryPreference: "both", // Default to 'both'
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          {t("your_details_title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("height_label")}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t("height_placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("weight_label")}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t("weight_placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("age_label")}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t("age_placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("gender_label")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_gender_placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">{t("gender_male")}</SelectItem>
                      <SelectItem value="female">{t("gender_female")}</SelectItem>
                      <SelectItem value="other">{t("gender_other")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("goal_label")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_goal_placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gain_weight">{t("goal_gain_weight")}</SelectItem>
                      <SelectItem value="lose_weight">{t("goal_lose_weight")}</SelectItem>
                      <SelectItem value="maintain_weight">{t("goal_maintain_weight")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dietaryPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("dietary_preference_label")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("select_dietary_preference_placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nature">{t("dietary_nature")}</SelectItem>
                      <SelectItem value="non_veg">{t("dietary_non_veg")}</SelectItem>
                      <SelectItem value="veg">{t("dietary_veg")}</SelectItem>
                      <SelectItem value="both">{t("dietary_both")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("generating_plan_button") : t("generate_plan_button")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
// "use client"

// import type React from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useTranslation } from "react-i18next"

// interface UserInfoFormProps {
//   onSubmit: (data: any) => void
//   isLoading: boolean
// }

// export const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, isLoading }) => {
//   const { t } = useTranslation()

//   const formSchema = z.object({
//     height: z.coerce
//       .number()
//       .min(50, { message: t("height_min_error") })
//       .max(250, { message: t("height_max_error") }),
//     weight: z.coerce
//       .number()
//       .min(20, { message: t("weight_min_error") })
//       .max(300, { message: t("weight_max_error") }),
//     age: z.coerce
//       .number()
//       .min(10, { message: t("age_min_error") })
//       .max(100, { message: t("age_max_error") }),
//     gender: z.enum(["male", "female", "other"], { message: t("gender_required_error") }),
//     goal: z.enum(["gain_weight", "lose_weight", "maintain_weight"], { message: t("goal_required_error") }),
//     dietaryPreference: z.enum(["nature", "non_veg", "veg", "both"], { message: t("dietary_required_error") }),
//   })

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       height: 170,
//       weight: 65,
//       age: 25,
//       gender: "male",
//       goal: "maintain_weight",
//       dietaryPreference: "both",
//     },
//   })

//   return (
//     <Card className="w-full border-0 shadow-lg">
//       <CardHeader className="space-y-2 pb-6">
//         <CardTitle className="text-2xl font-bold text-foreground">{t("your_details_title")}</CardTitle>
//         <p className="text-sm text-muted-foreground">Tell us about yourself to get a personalized plan</p>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* Physical Metrics Row */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               <FormField
//                 control={form.control}
//                 name="height"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm font-medium">{t("height_label")}</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         placeholder={t("height_placeholder")}
//                         {...field}
//                         className="border-border bg-input"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="weight"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm font-medium">{t("weight_label")}</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         placeholder={t("weight_placeholder")}
//                         {...field}
//                         className="border-border bg-input"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="age"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm font-medium">{t("age_label")}</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         placeholder={t("age_placeholder")}
//                         {...field}
//                         className="border-border bg-input"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Selection Fields Row */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <FormField
//                 control={form.control}
//                 name="gender"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm font-medium">{t("gender_label")}</FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger className="border-border bg-input">
//                           <SelectValue placeholder={t("select_gender_placeholder")} />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="male">{t("gender_male")}</SelectItem>
//                         <SelectItem value="female">{t("gender_female")}</SelectItem>
//                         <SelectItem value="other">{t("gender_other")}</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="goal"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm font-medium">{t("goal_label")}</FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger className="border-border bg-input">
//                           <SelectValue placeholder={t("select_goal_placeholder")} />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="gain_weight">{t("goal_gain_weight")}</SelectItem>
//                         <SelectItem value="lose_weight">{t("goal_lose_weight")}</SelectItem>
//                         <SelectItem value="maintain_weight">{t("goal_maintain_weight")}</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Dietary Preference */}
//             <FormField
//               control={form.control}
//               name="dietaryPreference"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-sm font-medium">{t("dietary_preference_label")}</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger className="border-border bg-input">
//                         <SelectValue placeholder={t("select_dietary_preference_placeholder")} />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="nature">{t("dietary_nature")}</SelectItem>
//                       <SelectItem value="non_veg">{t("dietary_non_veg")}</SelectItem>
//                       <SelectItem value="veg">{t("dietary_veg")}</SelectItem>
//                       <SelectItem value="both">{t("dietary_both")}</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-base"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <span className="flex items-center gap-2">
//                   <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
//                   {t("generating_plan_button")}
//                 </span>
//               ) : (
//                 t("generate_plan_button")
//               )}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   )
// }
