import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
  Controller,
  type SubmitHandler,
} from "react-hook-form"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api_singin } from "../api";

interface PropsSingin {
    onSwitch: () => void;
}

const formSingIn = z.object({
    name: z.string().min(1,{message:"Il nome deve essere di almeno un carattere"}),
    surname: z.string().min(1,{message:"Il cognome deve essere di almeno un carattere"}),
    email: z.email("invalid email address"),
    password: z.string()
    .min(8,{message: "la password deve avere almeno 8 caratteri"}).regex(/[a-z]/, { message: 'Deve contenere almeno una lettera minuscola' })
    .regex(/[0-9]/, { message: 'Deve contenere almeno un numero' })
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
        message: 'Deve contenere almeno un carattere speciale',
    }),
    birthdate:z.date({ error: "Seleziona la data di nascita" })
                .max(new Date(), "La data non può essere nel futuro"),
})

type FormSingIn = z.infer<typeof formSingIn>


const FormSI: React.FC<PropsSingin> = ({ onSwitch }) => {
    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting},
    } = useForm<FormSingIn>({
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            password:"",
        },
        resolver: zodResolver(formSingIn),
    });

    const onSubmit: SubmitHandler<FormSingIn> = async (data) =>{
        try {
            const response = await api_singin(data);
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
                <CardTitle>Create your account</CardTitle>
                <CardDescription>
                    * require
                </CardDescription>
                <CardAction>
                    <Button variant="link" onClick={onSwitch}>Sign In</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <form id="formsingin" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name*</Label>
                            <Input {...register("name")}/>
                            {errors.name && (<p style={{ color: "orangered" }}>{errors.name.message}</p>)}
                        </div>
                    <div className="grid gap-2">
                        <Label htmlFor="surname">Surname*</Label>
                            <Input {...register("surname")}/>
                            {errors.surname && (<p style={{ color: "orangered" }}>{errors.surname.message}</p>)}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email*</Label>
                        <Input {...register("email")}/>
                        {errors.email && (<p style={{ color: "orangered" }}>{errors.email.message}</p>)}
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password*</Label>
                                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                Forgot your password?
                                </a>
                        </div>
                        <Input {...register("password")}/>
                        {errors.password && (<p style={{ color: "orangered" }}>{errors.password.message}</p>)}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="Birth date">Birth date*</Label>
                        <Controller
                            control={control}
                            name="birthdate"
                            render={({ field }) => (
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(d)=> d > new Date()}
                                    captionLayout="dropdown"
                                    className="rounded-lg border"
                                />
                            )}
                        />
                        {errors.birthdate && (<p style={{ color: "orangered" }}>{errors.birthdate.message}</p>)}
                    </div>
                    </div>
                </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" form="formsingin" className="w-full"  disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </CardFooter>
        </Card>
    )

}
export default FormSI;