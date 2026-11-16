import { LightButton } from "../LightButton";
import { useScrolled } from "../utils/useScrolled";
import { useEffect, useRef } from "react";
import { DropdownMenuAvatar } from "./Avatar/DropdownMenu";
import { Link } from "react-router-dom"


interface PropsLogout {
  onClick: ()=>void
}

export function FullMenu({onClick}:PropsLogout){
    const scrolled = useScrolled();
    const navbarRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const navbar = navbarRef.current;
        if (!navbar) return;

        const updateHeight = () => {
            const height = navbar.getBoundingClientRect().height;

            document.documentElement.style.setProperty(
                "--navbar-height",
                `${height+height/2}px`
            );
        };

        const observer = new ResizeObserver(updateHeight);

        observer.observe(navbar);
        updateHeight();

        return () => observer.disconnect();
    }, []);



    return (  <>
        <header ref={navbarRef} className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="navbar-inner">
                    <b>Sito Palestra</b>

                <div className="navbar-pill">
                    <Link to="/machine">Macchinari</Link>
                    <a href="#works">Allenamento</a>
                    <a href="#price">Alimentazione</a>
                </div>
                <div className="navbar-actions">
                    <DropdownMenuAvatar onClick={onClick}/>
                    <LightButton/>
                </div>
            </div>    
          </header>
          </>
    )
}
