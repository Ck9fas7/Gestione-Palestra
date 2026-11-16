import { useState }  from "react";
import { MoonStar } from 'lucide-react';
import { SunDim } from 'lucide-react';
import { Button } from "@/components/ui/button"

export function LightButton({}){
    const [isLight, setIsLight] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
        return document.documentElement.classList.contains('dark');
        }
        return false;
    });

    const toggleTheme = () => {
        const root = document.documentElement;
        if (isLight) {
        root.classList.remove('dark');
        setIsLight(false);
        } else {
        root.classList.add('dark');
        setIsLight(true);
        }
  };
    return (
        <>
        <Button variant="outline" size="icon" onClick={toggleTheme}>{isLight ?  <MoonStar/> : <SunDim/> }</Button>
        </>
    )
}