import { zodResolver } from "@hookform/resolvers/zod"
import {
  useForm,
  Controller,
  type SubmitHandler,
} from "react-hook-form"
import {z} from "zod"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { api_fetch } from "@/components/utils/api"
import { format } from "date-fns";


type PropsFood = {
    handleClose: () => void;
    onSaved: () => Promise<void> | void;
}
const formFood = z.object({
    kcal:z.number().int().min(1,{message:"Le kcal devono essere alemno 1"}).positive("Seleziona una macchina"),
    prote:z.number().int().min(1, {message:"Le proteine devono essere alemno 1"}).positive("Seleziona una macchina"),
    carbo:z.number().int().min(1,{message:"I carboidrati devono essere alemno 1"}).positive("Seleziona una macchina"),
    fat:z.number().int().min(1,{message:"I grassi devono essere alemno 1"}).positive("Seleziona una macchina"),
    date:z.date()
})

type FormFood = z.infer<typeof formFood>

export const FormFoodAdd:React.FC<PropsFood> = ({handleClose, onSaved})=>{
    const {
        control,
        register,
        handleSubmit,
        setError,
        
        formState:{errors, isSubmitting},
    }= useForm<FormFood>({
        resolver: zodResolver(formFood),
        defaultValues: {
            kcal:1,
            prote:1,
            carbo:1,
            fat:1,
            date:new Date()

        }
    });
    const onSubmit: SubmitHandler<FormFood> = async (data) =>{
        try {
            const res=await api_fetch("/api/post/data",{method:"POST",body:JSON.stringify({type:0,date:format(data.date, "yyyy-MM-dd"), data:[{kcal:data.kcal,prote:data.prote,fat:data.fat,carbo:data.carbo}]})})
            if (!res.ok) throw new Error("Errore nel salvataggio");
            else handleClose()
        } catch (error: any) {
            console.error("Error:", error);
            setError("root", {
            type: "manual",
            message: error.message,
            });
        }
        try {
            await onSaved();      // un errore del refetch non deve bloccare la chiusura
        } catch (error) {
            console.error("Refetch error:", error);
        }
        handleClose();
        };
        return (
            <>
            <div className="modal-title">
                <h2>Aggiungi il tuo pasto</h2>
                <p className="modal-subtitle">Scegli la data e inserisci i Macronutrienti </p>
            </div>
            <div className="modal-container">
                <form id="formsingin" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Controller
                                control={control}
                                name="date"
                                render={({ field }) => (
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(d)=> d > new Date()}
                                        captionLayout="dropdown"
                                        className="rounded-lg border w-full"
                                    />
                                )}
                            />
                            {errors.date && (<p style={{ color: "orangered" }}>{errors.date.message}</p>)}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="kcal">Kcal</Label>
                            <InputGroup>
                                <InputGroupInput
                                    type="number"
                                    step="5"
                                    {...register("kcal", { valueAsNumber: true })}
                                />
                                <InputGroupAddon align="inline-end">kcal</InputGroupAddon>
                            </InputGroup>
                            {errors.kcal && (
                                <p style={{ color: "orangered" }}>{errors.kcal.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="prote">Proteine</Label>
                            <InputGroup>
                                <InputGroupInput
                                    type="number"
                                    step="5"
                                    {...register("prote", { valueAsNumber: true })}
                                />
                                <InputGroupAddon align="inline-end">g</InputGroupAddon>
                            </InputGroup>
                            {errors.prote && (
                                <p style={{ color: "orangered" }}>{errors.prote.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="carbo">Carboidrati</Label>
                            <InputGroup>
                                <InputGroupInput
                                    type="number"
                                    step="5"
                                    {...register("carbo", { valueAsNumber: true })}
                                />
                                <InputGroupAddon align="inline-end">g</InputGroupAddon>
                            </InputGroup>
                            {errors.carbo && (
                                <p style={{ color: "orangered" }}>{errors.carbo.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="fat">Grassi</Label>
                            <InputGroup>
                                <InputGroupInput
                                    type="number"
                                    step="5"
                                    {...register("fat", { valueAsNumber: true })}
                                />
                                <InputGroupAddon align="inline-end">g</InputGroupAddon>
                            </InputGroup>
                            {errors.fat && (
                                <p style={{ color: "orangered" }}>{errors.fat.message}</p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <Button type="submit" form="formsingin" className="w-full"  disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Salva"}
                </Button>
            </div></>
        )
}