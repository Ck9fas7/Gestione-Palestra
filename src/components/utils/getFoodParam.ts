import { type FoodData } from "@/interface/interface";

interface foodParam {
    kcal:number
    prote:number
    carbo:number
    fat:number
}

export function getFoodParam(date:Date, data:FoodData[]|undefined):foodParam{
    const res:foodParam={
                carbo:0,
                kcal:0,
                prote:0,
                fat:0
            }
    if (data){
        const targetTime = new Date(date).toDateString()
        for (const row of data)
            if (new Date(row.date).toDateString()===targetTime) {
                //console.log(new Date(row.date))
                res.carbo+=row.carboidrati
                res.fat+=row.grassi
                res.kcal+=row.kcal
                res.prote+=row.proteine
            }
        }
    return res
}