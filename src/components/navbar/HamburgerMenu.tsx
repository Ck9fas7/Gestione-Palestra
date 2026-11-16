import { useScrolled } from "../utils/useScrolled"
import { useState, useRef, useEffect } from 'react';
import { LightButton } from "../LightButton";
import { Burger } from "./Burger";
import { Button } from "@/components/ui/button";
import {Menu} from "./Menu";

interface PropsLogout {
  onChange: ()=>void
}

export function HamburgerMenu({onChange}:PropsLogout){
    const scrolled = useScrolled();
    const [open, setOpen] = useState(false);
    const node = useRef<HTMLDivElement>(null);
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

    return (
        <>
        <header ref={navbarRef} className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="navbar-inner">
                <b>Sito Palestra</b>
                <div  className="navbar-actions">
                    <Button className={"hover:opacity-90 transition-opacity"} 
                        style={{ 
                            backgroundColor: 'var(--color-background)',
                            color: 'var(--secondary)' // opzionale, per il testo
                        }}
                        onClick={onChange}>
                            Logout
                    </Button>
                    <LightButton/>
                <div ref={node}>
                    <Burger open={open} setOpen={setOpen} />
                </div>
                </div> 
            </div>    
          </header>
          <Menu open={open} />
          </>
    )
}