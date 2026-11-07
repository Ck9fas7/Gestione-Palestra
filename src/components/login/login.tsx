import FormLog from "./FormLog";
import FormSI from "./FormSingIn";
import "../styles/login.css"
import { useMediaQuery } from "../useMediaQuery";
import { useState } from "react";




type Mode = "log" | "singin"

export function Login (){
    const [Mode, setMode] = useState("log")
    const isMobile:boolean = useMediaQuery("(max-width: 815px)");
    return (
        <div className="login">
            <div className="LeftSide"></div>
            <div className="RightSide">
                {Mode==="log" ? (<FormLog onSwitch={() => setMode("signup")}/> ):( <FormSI onSwitch={()=> setMode("log")}/>)}
                
            </div>
        </div>
    )
}

export default Login;