import FormLog from "./FormLog";
import FormSI from "./FormSingIn";
import "@/styles/login.css"
import { useMediaQuery } from "../utils/useMediaQuery";
import { useState } from "react";

interface PropsLoggedd {
    onChange: ()=>void
}


type Mode = "log" | "singin"

export function Login ({onChange}:PropsLoggedd){
    const [Mode, setMode] = useState("log")
    const isMobile:boolean = useMediaQuery("(max-width: 815px)");
    document.documentElement.style.setProperty(
                "--navbar-height",
                `${0}px`
            );
    return (
        <div className="login">
            <div className="LeftSide"></div>
            <div className="RightSide">
                {Mode==="log"  ? (<FormLog onSwitch={() => setMode("signup")} onChange={onChange}/> ):( <FormSI onSwitch={()=> setMode("log")} onChange={onChange}/>)}
            </div>
        </div>
    )
}

export default Login;