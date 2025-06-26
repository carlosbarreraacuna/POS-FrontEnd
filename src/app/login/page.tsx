"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Facebook, Twitter, Instagram, Mail, Phone, ArrowLeft } from "lucide-react"
import { useAuth } from "@/app/context/AuthContext"
import { login } from "@/app/types/auth"
import Image from "next/image"

export default function RestaurantAuth() {
  // Login Form State
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Password Recovery State
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false)
  const [recoveryStep, setRecoveryStep] = useState<"method" | "email" | "phone" | "verify" | "reset">("method")
  const [recoveryData, setRecoveryData] = useState({
    email: "",
    phone: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [recoveryLoading, setRecoveryLoading] = useState(false)
  const [recoveryError, setRecoveryError] = useState("")
  const [recoverySuccess, setRecoverySuccess] = useState("")

  // Hooks
  const { setToken } = useAuth()
  const router = useRouter()

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await login(username, password)
      setToken(res.data.token)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRecoveryMethodSelect = (method: "email" | "phone") => {
    setRecoveryStep(method)
    setRecoveryError("")
    setRecoverySuccess("")
  }

  const handleSendRecoveryCode = async (method: "email" | "phone") => {
    setRecoveryLoading(true)
    setRecoveryError("")
    setRecoverySuccess("")

    try {
      // Simulate API call for sending recovery code
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (method === "email") {
        // Here you would call your email recovery API
        // await sendEmailRecovery(recoveryData.email)
        setRecoverySuccess(`Código de recuperación enviado a ${recoveryData.email}`)
      } else {
        // Here you would call your SMS recovery API
        // await sendSMSRecovery(recoveryData.phone)
        setRecoverySuccess(`Código de recuperación enviado al ${recoveryData.phone}`)
      }

      setRecoveryStep("verify")
    } catch (err: any) {
      setRecoveryError("Error al enviar el código de recuperación")
    } finally {
      setRecoveryLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    setRecoveryLoading(true)
    setRecoveryError("")

    try {
      // Simulate API call for code verification
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (recoveryData.code.length !== 6) {
        throw new Error("Código inválido")
      }

      // Here you would call your code verification API
      // await verifyRecoveryCode(recoveryData.code)

      setRecoverySuccess("Código verificado correctamente")
      setRecoveryStep("reset")
    } catch (err: any) {
      setRecoveryError("Código inválido o expirado")
    } finally {
      setRecoveryLoading(false)
    }
  }

  const handleResetPassword = async () => {
    setRecoveryLoading(true)
    setRecoveryError("")

    if (recoveryData.newPassword !== recoveryData.confirmPassword) {
      setRecoveryError("Las contraseñas no coinciden")
      setRecoveryLoading(false)
      return
    }

    if (recoveryData.newPassword.length < 6) {
      setRecoveryError("La contraseña debe tener al menos 6 caracteres")
      setRecoveryLoading(false)
      return
    }

    try {
      // Simulate API call for password reset
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would call your password reset API
      // await resetPassword(recoveryData.newPassword, recoveryData.code)

      setRecoverySuccess("Contraseña actualizada correctamente")
      setTimeout(() => {
        setIsRecoveryOpen(false)
        resetRecoveryState()
      }, 2000)
    } catch (err: any) {
      setRecoveryError("Error al actualizar la contraseña")
    } finally {
      setRecoveryLoading(false)
    }
  }

  const resetRecoveryState = () => {
    setRecoveryStep("method")
    setRecoveryData({
      email: "",
      phone: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    })
    setRecoveryError("")
    setRecoverySuccess("")
  }

  const handleBackStep = () => {
    if (recoveryStep === "email" || recoveryStep === "phone") {
      setRecoveryStep("method")
    } else if (recoveryStep === "verify") {
      setRecoveryStep(recoveryStep === "verify" ? "email" : "phone")
    } else if (recoveryStep === "reset") {
      setRecoveryStep("verify")
    }
    setRecoveryError("")
    setRecoverySuccess("")
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <Image src="/food.jpg" alt="Restaurant" fill className="object-cover" />
        {/* <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source
            src="fondo.mp4"
            type="video/mp4"
          />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-orange-600 to-red-600" />
        {/* </video> */} 
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Navigation Header */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center">
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white hover:bg-white/20 rounded-full px-6">
              Selected Works
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" className="text-white hover:bg-white/20 rounded-full px-4">
              Join Us
            </Button>
          </div>
        </div>

        <div className="flex min-h-[700px] relative">
          {/* Image Section */}
          <div className="relative w-1/2">
            <div className="absolute inset-0 bg-gradient-to-br  z-10" />
            <Image src="/tablero.webp" alt="Restaurant" fill className="object-cover" />

            {/* Profile Card */}
            <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div className="text-white">
                <div className="font-semibold">Restaurant Chef</div>
                <div className="text-sm opacity-80">Culinary & Experience</div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm border border-white/20"
              >
                <span className="text-lg">‹</span>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm border border-white/20"
              >
                <span className="text-lg">›</span>
              </Button>
            </div>
          </div>

          {/* Login Form Section */}
          <div className="w-1/2 bg-white/90 backdrop-blur-sm flex items-center justify-center p-12">
            <div className="w-full max-w-md space-y-8">
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-gray-900">Sistema POS</h1>
                <p className="text-gray-600">BIENVENIDO AL RESTAURANTE</p>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700 font-medium">
                    Usuario
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingrese su usuario"
                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl bg-white/80 backdrop-blur-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese su contraseña"
                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl bg-white/80 backdrop-blur-sm"
                    required
                  />
                </div>

                <div className="text-right">
                  <Dialog open={isRecoveryOpen} onOpenChange={setIsRecoveryOpen}>
                    <DialogTrigger asChild>
                      <Button variant="link" className="text-orange-600 hover:text-orange-700 p-0">
                        Olvidaste tu contraseña?
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-s border border-white/20">
                      <DialogHeader>
                        <div className="flex items-center gap-2">
                          {recoveryStep !== "method" && (
                            <Button variant="ghost" size="icon" onClick={handleBackStep} className="h-8 w-8">
                              <ArrowLeft className="h-4 w-4" />
                            </Button>
                          )}
                          <div>
                            <DialogTitle>
                              {recoveryStep === "method" && "Recover Password"}
                              {recoveryStep === "email" && "Email Recovery"}
                              {recoveryStep === "phone" && "SMS Recovery"}
                              {recoveryStep === "verify" && "Verify Code"}
                              {recoveryStep === "reset" && "Reset Password"}
                            </DialogTitle>
                            <DialogDescription>
                              {recoveryStep === "method" && "Choose how you'd like to recover your password"}
                              {recoveryStep === "email" && "Enter your email to receive a recovery code"}
                              {recoveryStep === "phone" && "Enter your phone number to receive a recovery code"}
                              {recoveryStep === "verify" && "Enter the verification code sent to you"}
                              {recoveryStep === "reset" && "Enter your new password"}
                            </DialogDescription>
                          </div>
                        </div>
                      </DialogHeader>

                      <div className="space-y-4">
                        {recoveryError && (
                          <Alert variant="destructive">
                            <AlertDescription>{recoveryError}</AlertDescription>
                          </Alert>
                        )}

                        {recoverySuccess && (
                          <Alert>
                            <AlertDescription className="text-green-600">{recoverySuccess}</AlertDescription>
                          </Alert>
                        )}

                        {/* Method Selection */}
                        {recoveryStep === "method" && (
                          <div className="space-y-3">
                            <Button
                              onClick={() => handleRecoveryMethodSelect("email")}
                              variant="outline"
                              className="w-full h-12 flex items-center justify-start gap-3 bg-white/80 backdrop-blur-sm"
                            >
                              <Mail className="h-5 w-5 text-orange-600" />
                              <div className="text-left">
                                <div className="font-medium">Email Recovery</div>
                                <div className="text-sm text-gray-500">Send code to your email</div>
                              </div>
                            </Button>
                            <Button
                              onClick={() => handleRecoveryMethodSelect("phone")}
                              variant="outline"
                              className="w-full h-12 flex items-center justify-start gap-3 bg-white/80 backdrop-blur-sm"
                            >
                              <Phone className="h-5 w-5 text-orange-600" />
                              <div className="text-left">
                                <div className="font-medium">SMS Recovery</div>
                                <div className="text-sm text-gray-500">Send code to your phone</div>
                              </div>
                            </Button>
                          </div>
                        )}

                        {/* Email Recovery */}
                        {recoveryStep === "email" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="recovery-email">Email Address</Label>
                              <Input
                                id="recovery-email"
                                type="email"
                                value={recoveryData.email}
                                onChange={(e) => setRecoveryData({ ...recoveryData, email: e.target.value })}
                                placeholder="Enter your email"
                                className="h-12 bg-white/80 backdrop-blur-sm"
                                required
                              />
                            </div>
                            <Button
                              onClick={() => handleSendRecoveryCode("email")}
                              className="w-full bg-orange-600 hover:bg-orange-700"
                              disabled={recoveryLoading || !recoveryData.email}
                            >
                              {recoveryLoading ? "Sending..." : "Send Recovery Code"}
                            </Button>
                          </div>
                        )}

                        {/* Phone Recovery */}
                        {recoveryStep === "phone" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="recovery-phone">Phone Number</Label>
                              <Input
                                id="recovery-phone"
                                type="tel"
                                value={recoveryData.phone}
                                onChange={(e) => setRecoveryData({ ...recoveryData, phone: e.target.value })}
                                placeholder="Enter your phone number"
                                className="h-12 bg-white/80 backdrop-blur-sm"
                                required
                              />
                            </div>
                            <Button
                              onClick={() => handleSendRecoveryCode("phone")}
                              className="w-full bg-orange-600 hover:bg-orange-700"
                              disabled={recoveryLoading || !recoveryData.phone}
                            >
                              {recoveryLoading ? "Sending..." : "Send Recovery Code"}
                            </Button>
                          </div>
                        )}

                        {/* Code Verification */}
                        {recoveryStep === "verify" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="recovery-code">Verification Code</Label>
                              <Input
                                id="recovery-code"
                                type="text"
                                value={recoveryData.code}
                                onChange={(e) => setRecoveryData({ ...recoveryData, code: e.target.value })}
                                placeholder="Enter 6-digit code"
                                className="h-12 text-center text-lg tracking-widest bg-white/80 backdrop-blur-sm"
                                maxLength={6}
                                required
                              />
                            </div>
                            <Button
                              onClick={handleVerifyCode}
                              className="w-full bg-orange-600 hover:bg-orange-700"
                              disabled={recoveryLoading || recoveryData.code.length !== 6}
                            >
                              {recoveryLoading ? "Verifying..." : "Verify Code"}
                            </Button>
                          </div>
                        )}

                        {/* Password Reset */}
                        {recoveryStep === "reset" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-password">New Password</Label>
                              <Input
                                id="new-password"
                                type="password"
                                value={recoveryData.newPassword}
                                onChange={(e) => setRecoveryData({ ...recoveryData, newPassword: e.target.value })}
                                placeholder="Enter new password"
                                className="h-12 bg-white/80 backdrop-blur-sm"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirm-password">Confirm Password</Label>
                              <Input
                                id="confirm-password"
                                type="password"
                                value={recoveryData.confirmPassword}
                                onChange={(e) => setRecoveryData({ ...recoveryData, confirmPassword: e.target.value })}
                                placeholder="Confirm new password"
                                className="h-12 bg-white/80 backdrop-blur-sm"
                                required
                              />
                            </div>
                            <Button
                              onClick={handleResetPassword}
                              className="w-full bg-orange-600 hover:bg-orange-700"
                              disabled={recoveryLoading || !recoveryData.newPassword || !recoveryData.confirmPassword}
                            >
                              {recoveryLoading ? "Updating..." : "Update Password"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando sesion..." : "Iniciar Sesión"}
                </Button>
              </form>

              {/* Social Icons */}
              <div className="flex justify-center gap-4 pt-4">
                <Button size="icon" variant="ghost" className="w-10 h-10 text-gray-400 hover:text-orange-600">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="w-10 h-10 text-gray-400 hover:text-orange-600">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="w-10 h-10 text-gray-400 hover:text-orange-600">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="w-10 h-10 text-gray-400 hover:text-orange-600">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
