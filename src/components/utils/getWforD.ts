import {format} from 'date-fns'
import { type Dictionary } from '@/interface/interface'

export function formatDate (dates:Date[]){
    const dic:Dictionary<number>={}
    for (const date of dates){
        const fday=format(date, "yyyy-MM-dd")
        if (!dic[fday]) dic[fday]=1
        else dic[fday]+=1
    }
    return dic
    
}

export function getFilterFD(min:number, dates:Dictionary<number>,max:number = Infinity){
    return Object.entries(dates).filter(([,n])=>n>=min && n<=max).map(([d])=>new Date(d))
}