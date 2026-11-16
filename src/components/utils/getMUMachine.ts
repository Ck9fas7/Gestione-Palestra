import type { FitData, Machine, MachineParams } from "@/interface/interface";


export function getMUMachine(userdata:FitData[]|null, bddata:MachineParams[]|undefined){
    const toOption = (m: MachineParams) => ({
        label: `${m.nome}@${m.marchio}`,
        value: m.id,
    });
    if (!bddata) return []
    if (!userdata){
        return [...bddata.map(toOption)]
    }

    const used = new Set(userdata.map(us => us.id_macchina));
    return [
        ...bddata.filter(m=>used.has(m.id)),
        ...bddata.filter(m=>!used.has(m.id))
    ].map(toOption)
}


// {id: '21', id_macchina: '1', ripetizioni: 10, carico: '50.00', data: '2026-10-21T22:00:00.000Z'}
// {id: '1', marchio: 'pippo', nome: 'paperino', descrizione: 'pippo pippa', imm: 'pene', …}