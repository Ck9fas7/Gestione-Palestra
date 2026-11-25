import { useMediaQuery } from "../utils/useMediaQuery";
import { FullMenu } from "./FullMenu";
import { HamburgerMenu } from "./HamburgerMenu";
import "@/styles/navbar.css"

interface PropsLogout {
  onChange: ()=>void
}

export function NavBar ({onChange}:PropsLogout) {
    const isMobile = useMediaQuery("(max-width: 815px)");
    return !isMobile ? <FullMenu onClick={onChange}/> : <HamburgerMenu onChange={onChange}/>
}