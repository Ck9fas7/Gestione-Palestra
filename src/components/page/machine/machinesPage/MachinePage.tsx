import { useState, useMemo } from "react"
import { NavBar } from "@/components/navbar/Navbar"
import { type MachineParams } from "@/interface/interface"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import '@/styles/machinesPage.css'
import { getBrandColor } from "@/styles/brandColor";
import { Link } from "react-router-dom"
import { FilterPopover } from './DropDownMenu/DropDownMenu'
import { SortSelect } from "./SelectOrder"
import {
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group"



type PropsLogout = {
  onChange: ()=>void
}
type SortOrder = "asc" | "desc" | "defult"

export function MachinesPage ({onChange}:PropsLogout){
    const jsonMachine=sessionStorage.getItem("machinedata")
    const machineData:MachineParams[] = JSON.parse(jsonMachine? jsonMachine: JSON.stringify({machineData:[]})).machineData
    const [brandFilter, setBrandFilter]=useState<FormDataEntryValue[]>([])
    const [order, setOrder]=useState<SortOrder>("defult")
    const [value, setValue]=useState<string>("")
    console.log(value)
    const filteredMachine=useMemo(()=>{
        if (brandFilter.length===0) return machineData.filter((row2)=>row2.nome.toLowerCase().includes(value.toLowerCase()))
        return machineData.filter((row)=>brandFilter.includes(row.marchio)).filter((row2)=>row2.nome.toLowerCase().includes(value.toLowerCase()))
    },[machineData,brandFilter,value])

    const sorted = useMemo(() =>{
        if (order === "defult") return filteredMachine
        return [...filteredMachine].sort((a, b) =>
            order==='asc'
                ? a.nome.localeCompare(b.nome)
                : b.nome.localeCompare(a.nome)
            )
        },[filteredMachine, order])

    function getData(contex:FormDataEntryValue[]){
        setBrandFilter(contex)
    }
    return (
    <>
    <div className="navbar_div">
        <NavBar onChange={onChange}/>
    </div>
    <div className="machines_div border-2 border-[var(--color-background)] rounded-lg">
        <div className="machines_header">
            <h2>Macchinari</h2>
            <div className="machines-sorting">
                <InputGroup className="search_group">
                    <InputGroupInput placeholder="Type to search..." value={value} onChange={(e) => setValue(e.target.value)}/>
                </InputGroup>
                <FilterPopover getData={getData} list={[...new Set(machineData.map((row)=>row.marchio))].map((row2)=>({value:row2}))}/>
                <SortSelect value={order} onChange={setOrder}/>
            </div>
        </div>
        <div className="machines_contents">
            {sorted.map((machine:MachineParams)=>(
                <Link to={`/machine/${machine.id}`} key={machine.id} className="card_machine" style={{ "--brand-color": getBrandColor(machine.marchio) } as React.CSSProperties}>
                    <Card className="p-0 shadow-none border-0">
                        <CardContent className="p-0 ">
                            <div className="card_machine_div">
                                <div className="card_machine_img">
                                    {machine.imm}
                                </div>
                                <div className="machine_data">
                                    <div className="card_machine_header">
                                        <span></span>
                                        <div className="machine_name">
                                            <h3>{machine.nome}</h3>
                                        </div>
                                        <span className="machine_brand">{machine.marchio}</span>
                                    </div>
                                    <div className="machine_desc">
                                        <p>{machine.descrizione}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    </div>
    </>)
}
