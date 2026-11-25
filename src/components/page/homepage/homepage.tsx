import "@/styles/homepage.css"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { type User, type UserData} from "@/interface/interface"
import { CalendarSpecial } from '../../ui/calendarSpecial'
import { useState, useMemo } from "react"
import { NavBar } from "../../navbar/Navbar"
import { UseApiFetch } from "@/components/utils/useApiFetch"
import { ChartProgression } from "@/components/ChartsProgression"
import { useCountFrequency } from "@/components/utils/useCountFrequency"
import { getFoodParam } from "@/components/utils/getFoodParam"
import { ModalComp } from "./ModalComp"
import { it } from "date-fns/locale"
import { parseISO } from "date-fns"
import { formatDate,getFilterFD } from "@/components/utils/getWforD"


type PropsLogout = {
  onChange: ()=>void
}


export function Homepage ({onChange}:PropsLogout) {
    const savedUser:string|null=localStorage.getItem("user")
    const user: User | null  = savedUser ? JSON.parse(savedUser) : null;
    const [logged]=useState(()=>sessionStorage.getItem("token")!==null)
    
    const { data, refetch } = UseApiFetch<UserData>(
        logged && user?.id ? "/api/userdata" : null,
        { method: "POST" }
    )
    if (data) sessionStorage.setItem("userdata", JSON.stringify(data))

    console.log(data)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const foodParam = useMemo(
        () => getFoodParam(new Date(), data?.foodData),
        [data?.foodData]
    )

    const specialDays = useMemo(
        () => formatDate(data?.fitData.map((r) => parseISO(r.data)) ?? []),
        [data?.fitData]
    )
    console.log(getFilterFD(2, specialDays))

    const goals = data?.goalsData
    return (
    <>
    <div className="navbar_div">
        <NavBar onChange={onChange}/>
    </div>
    <div className="home-page">
        <h1 className="homepage-title">
            Bentornato {user ? <b>{user.name}</b> : <b>Utente</b>}
        </h1>
        <div className="container-homepage">
            <Card className="border-2 border-[var(--color-background)]">
                <CardContent>
                    <div className="container-modal">
                        <div className="calendar-div">
                            <CalendarSpecial
                                mode="single"
                                selected={date}
                                showOutsideDays
                                modifiersClassNames={{
                                    low: "[&>button]:bg-blue-100 [&>button]:text-blue-800",
                                    high: "[&>button]:bg-blue-300 [&>button]:text-blue-950",
                                }}
                                onSelect={setDate}
                                // Scala --cell-size da 24px (schermi stretti) a 36px (desktop) e forza w-full
                                className="w-full rounded-lg border-2 border-[var(--color-background)] p-2 sm:p-3 [--cell-size:clamp(1.65rem,8vw,2.25rem)]"
                                weekStartsOn={1}
                                locale={it}
                                captionLayout="dropdown"
                                modifiers={{
                                    low: getFilterFD(1, specialDays, 1),
                                    high: getFilterFD(2, specialDays),
                                }}
                                classNames={{
                                    today: "bg-transparent [&>button]:ring-2 [&>button]:ring-red-500",
                                    outside: "opacity-40",
                                }}
                            />
                        </div>
                        <div className="other-div">
                            <div className="goal-div">
                                <ChartProgression name="fit" value={ useCountFrequency(specialDays)} goal={goals? goals.goal_fit : 1} unit=""/>
                            </div>
                            <div className="add-div">
                                <ModalComp userdata={data?.fitData} onSaved={refetch}/>
                            </div>
                        </div>
                    </div>
                    
                </CardContent>
            </Card>
            <Card className="border-2 border-[var(--color-background)]">
                <CardContent>
                    <div className="container-modal">
                        <div className="chart-div">
                            <div className="chart-left">
                                <div className="chart-row w-full">
                                    <span className="chart-label">Kcal</span>
                                <ChartProgression name="kcal" value={ foodParam.kcal} goal={goals? goals.goal_kcal : 1} unit="kcal"/>
                                </div>
                            </div>
                            <div className="chart-right">
                                <div className="chart-row">
                                    <div className="chart-mini">
                                        <ChartProgression small name="carbo" value={foodParam.carbo } goal={goals? goals.goal_carbo : 1} unit="g"/>
                                    </div>
                                    <span className="chart-label">Cardoidrati</span>
                                </div>
                                <div className="chart-row">
                                    <span className="chart-label">Proteine</span>
                                    <div className="chart-mini">
                                        <ChartProgression small name="prote" value={foodParam.prote} goal={goals? goals.goal_prot : 1} unit="g"/>
                                    </div>
                                </div>
                               <div className="chart-row">
                                    <div className="chart-mini">
                                        <ChartProgression small name="fat" value={ foodParam.fat} goal={goals? goals.goal_fat : 1} unit="g"/>
                                    </div>
                                    <span className="chart-label">Grassi</span>
                               </div>
                            </div>
                        </div>
                        <div className="other-div">
                            <div className="add-div">
                                <ModalComp type="food" onSaved={refetch}/>
                            </div>
                        </div>
                    </div>
                    
                </CardContent>
            </Card>
        </div>
    </div>
    </>
    )
}

//{user ? <b>{user.utente.name}</b> : <b>Utente</b>}