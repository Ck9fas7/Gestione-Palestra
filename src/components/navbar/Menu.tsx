import '../../styles/menu.css'
import { Link } from "react-router-dom"


interface MenuProps {
  open:boolean
}

export function Menu({ open }:MenuProps) {
  return (
    <nav className={`menu${open ? ' menu--open' : ''}`}>
        <Link to="/settings">Settings</Link>
        <Link to="/machine">Macchinari</Link>
        <a href="#works">Allenamento</a>
        <a href="#price">Alimentazione</a>
    </nav>
  );
}


