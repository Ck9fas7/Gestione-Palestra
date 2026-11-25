import { useState } from 'react';
import { Button } from '../../ui/button';
import Modal from '@mui/material/Modal';
import { type FitData, type MachineData } from '@/interface/interface';
import { FormFitness } from './modal/BoxModalFit';
import { FormFoodAdd } from './modal/BoxModalFat';
import '@/styles/modal.css'
import { UseApiFetch } from '@/components/utils/useApiFetch';
import {getMUMachine} from '../../utils/getMUMachine'
import { Plus } from "lucide-react"


type ModalProp = {
    type?:"fit"|"food" 
    userdata?:FitData[] | null
    onSaved:()=>void
}



export function ModalComp ({type="fit", userdata=null, onSaved}:ModalProp){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {data }=UseApiFetch<MachineData>("/api/machinedata",{method:"POST"})
    const listMachine = getMUMachine(userdata, data?.machineData)
    if (data) sessionStorage.setItem("machinedata",JSON.stringify(data))

    return (
        <div className="w-full h-full flex p-2">
            <Button onClick={handleOpen} variant="ghost" className={"flex-1 h-auto flex-col gap-2 whitespace-normal rounded-[25px] border-2 border-dashed border-neutral-300 bg-[var(--color-background)] text-[var(--pill-text)] hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-colors"}>
                <Plus className="size-8" />
                <span className="text-sm font-medium">
                </span>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableEnforceFocus 
                className='h-full'
            >
                <div className='modal-box'>
                    {type==="fit"?<FormFitness machinedata={listMachine}handleClose={handleClose} onSaved={onSaved}/>:<FormFoodAdd handleClose={handleClose} onSaved={onSaved}/>}
                </div>
                
                
            </Modal>
        </div>
    );
}

