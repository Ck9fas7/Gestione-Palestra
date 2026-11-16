import { zodResolver } from "@hookform/resolvers/zod"
import {
  useForm,
  Controller,
  type SubmitHandler,
  useFieldArray
} from "react-hook-form"
import {z} from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Calendar } from "@/components/ui/calendar"
import { type Machine } from "@/interface/interface"
import { format } from "date-fns";
import { api_fetch } from "@/components/utils/api"
import { it } from "date-fns/locale"

type PropsFit = {
    handleClose: () => void;
    machinedata: Machine[];
    onSaved: () => Promise<void> | void;
}

const formFit = z.object({
    id_machine:z.number().int().positive("Seleziona una macchina"),
    rip:z.number().int().min(1, {message:"Le ripetizioni devono essere almeno 1"}),
    load:z.number().min(1,{message:"Il carico deve essere almeno di 1kg"}),
})

export const allenamentoSchema = z.object({
    data: z.date(),
    serie: z.array(formFit).min(1, "Aggiungi almeno una serie"),
});

/*const formFood = z.object({
    kcal:z.number().int().min(1,{message:"Le kcal devono essere alemno 1"}).positive("Seleziona una macchina"),
    prote:z.number().int().min(1, {message:"Le proteine devono essere alemno 1"}).positive("Seleziona una macchina"),
    carbo:z.number().int().min(1,{message:"I carboidrati devono essere alemno 1"}).positive("Seleziona una macchina"),
    fat:z.number().int().min(1,{message:"I grassi devono essere alemno 1"}).positive("Seleziona una macchina"),
    data:z.date()
})*/




type FormFit = z.infer<typeof allenamentoSchema>
//type FormFood = z.infer<typeof formFit>


export const FormFitness:React.FC<PropsFit> = ({ handleClose, machinedata, onSaved})=>{
    const machines = machinedata
    const {
        control,
        register,
        handleSubmit,
        setError,
        
        formState:{errors, isSubmitting},
    }= useForm<FormFit>({
        resolver: zodResolver(allenamentoSchema),
        defaultValues: {
            data: new Date(),
            serie: [{ id_machine: undefined as any, rip: 1, load: 1 }],
        }
    });
    const { fields, append, remove } = useFieldArray({ control, name: "serie" });
    const onSubmit: SubmitHandler<FormFit> = async (data) =>{
            try {
                const res=await api_fetch('/api/post/data',{method:"POST",body:JSON.stringify({type:1,date:format(data.data, "yyyy-MM-dd"), data:data.serie})})
                if (!res.ok) throw new Error("Errore nel salvataggio");
                
                } 
            catch (error: any) {
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
                <h2>Aggiungi il tuo allenamento</h2>
                <p className="modal-subtitle">Scegli la data e inserisci le serie</p>
            </div>
            <div className="modal-container">
                <form id="formfitdata" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="flex flex-col gap-6">

                        {/* Data: una volta sola */}
                        <Controller
                            control={control}
                            name="data"
                            render={({ field }) => (
                                <Calendar
                                    mode="single"
                                    weekStartsOn={1}
                                    locale={it}
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={d => d > new Date()}
                                    className="rounded-lg border w-full"
                                />
                            )}
                        />
                        {fields.map((item, index) => (
                            <div key={item.id} className="grid gap-3 rounded-lg">

                                <Controller
                                    control={control}
                                    name={`serie.${index}.id_machine`}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Macchina</FieldLabel>
                                            <Select
                                                items={machines.map(m => ({
                                                        value: m.value,
                                                        label: m.label.split('@')[0]
                                                    }))}
                                                value={field.value != null ? String(field.value) : null}
                                                onValueChange={v => field.onChange(v == null ? undefined : Number(v))}
                                            >
                                                <SelectTrigger aria-invalid={fieldState.invalid}>
                                                    <SelectValue placeholder="Seleziona una macchina" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {machines.map(m => {
                                                            const [nome,marchio] = m.label.split('@')
                                                            return(
                                                            <SelectItem key={m.value} value={m.value}>
                                                                <span className="flex w-full items-center justify-between gap-4">
                                                                    <span className="truncate">{nome}</span>
                                                                    <span className="shrink-0 text-muted-foreground text-xs">{marchio}</span>
                                                                </span>
                                                            </SelectItem>
                                                        )})}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                <Input
                                    type="number"
                                    placeholder="Ripetizioni"
                                    {...register(`serie.${index}.rip`, { valueAsNumber: true })}
                                />
                                {errors.serie?.[index]?.rip && (
                                    <p style={{ color: "orangered" }}>{errors.serie[index]!.rip!.message}</p>
                                )}

                                <InputGroup>
                                    <InputGroupInput
                                        type="number"
                                        step="0.5"
                                        {...register(`serie.${index}.load`, { valueAsNumber: true })}
                                    />
                                    <InputGroupAddon align="inline-end">kg</InputGroupAddon>
                                </InputGroup>
                                {errors.serie?.[index]?.load && (
                                    <p style={{ color: "orangered" }}>{errors.serie[index]!.load!.message}</p>
                                )}

                                {fields.length > 1 && (
                                    <Button type="button" variant="outline" onClick={() => remove(index)}>
                                        Rimuovi
                                    </Button>
                                )}
                            </div>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => append({ id_machine: undefined as any, rip: 1, load: 1 })}
                        >
                            + Aggiungi serie
                        </Button>
                        {errors.root && <p style={{ color: "orangered" }}>{errors.root.message}</p>}

                        {errors.serie?.root && <p style={{ color: "orangered" }}>{errors.serie.root.message}</p>}
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <Button type="submit" form="formfitdata" className="w-full"  disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Salva"}
                </Button>
            </div></>
        )
}

//fare invio al server sia cibo che fit 
/*
data: Tue Nov 10 2026 00:00:00 GMT+0100 (Ora standard dell’Europa centrale) {}
serie: Array(1)
    0: {id_machine: 3, rip: 1, load: 1}



carbo: 1
date: Wed Nov 11 2026 00:00:00 GMT+0+100 (Ora standard dell’Europa centrale) {}
fat: 1
kcal: 1
prote: 1

import { format } from "date-fns";
format(data.data, "yyyy-MM-dd");
*/