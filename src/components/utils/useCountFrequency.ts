import { getISOWeek, getDay  } from 'date-fns';
import { type Dictionary } from '@/interface/interface';

export function useCountFrequency(data:Dictionary<number>|undefined):number{
    if (!data) return 0
    const max = [...new Set(Object.entries(data).map(([d],i)=>{
        return getISOWeek((d))===getISOWeek(new Date())? getDay(d)+1 : 0
    }))]
    //console.log(max)
    return max.length-1
}

//