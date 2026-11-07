import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import React from "react";
import {
  useForm,
  type SubmitHandler,
} from "react-hook-form"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api_login } from "../api";

interface PropsLogin {
  onSwitch: ()=>void,
}

const formlogin = z.object({
  email: z.email("invalid email address"),
  password: z.string()
  .min(8,{message: "la password deve avere almeno 8 caratteri"}).regex(/[a-z]/, { message: 'Deve contenere almeno una lettera minuscola' })
  .regex(/[0-9]/, { message: 'Deve contenere almeno un numero' })
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
    message: 'Deve contenere almeno un carattere speciale',
  })
})

type FormLogin = z.infer<typeof formlogin>

const FormLog: React.FC<PropsLogin> = ({ onSwitch }: PropsLogin) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting },
  } = useForm<FormLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formlogin),
  });

  const onSubmit: SubmitHandler<FormLogin> = async (data) => {
    try {
      const response = await api_login(data);
      console.log("Success:", response);
    } catch (error: any) {
      console.error("Error:", error);
      setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={onSwitch}>Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="formlogin" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register("email")}/>
              {errors.email && (<p style={{ color: "orangered" }}>{errors.email.message}</p>)}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input {...register("password")}/>
              {errors.password && (<p style={{ color: "orangered" }}>{errors.password.message}</p>)}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="formlogin" className="w-full"  disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
export default FormLog;
