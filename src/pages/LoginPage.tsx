"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, type User } from "firebase/auth"
import { auth } from "@/integrations/firebase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { Loader2, Dumbbell, Chrome } from "lucide-react"

const LoginPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        // User is signed in, redirect to home
        navigate("/");
      }
    })

    return () => unsubscribe()
  }, [navigate])

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    const provider = new GoogleAuthProvider()

    try {
      await signInWithPopup(auth, provider)
      toast.success(t("login_success_toast"))
    } catch (error: any) {
      console.error("Google Sign-In Error:", error)
      toast.error(t("login_error_toast", { message: error.message }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Dumbbell className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">GymPlanner</h1>
          <p className="text-slate-300 text-sm">Your fitness journey starts here</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <h2 className="text-2xl font-semibold text-white mb-2">{t("login_title") || "Welcome Back"}</h2>
            <p className="text-slate-300 text-sm">
              {t("login_subtitle") || "Sign in to continue your fitness journey"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6 pt-4">
            {/* Google Sign In Button */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  {t("signing_in_button") || "Signing in..."}
                </>
              ) : (
                <>
                  <Chrome className="mr-3 h-5 w-5" />
                  {t("sign_in_with_google_button") || "Continue with Google"}
                </>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-slate-400 mt-4">Secure Login</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Track your workouts and progress</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>Create custom workout plans</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Monitor your fitness goals</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-400 text-xs">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
