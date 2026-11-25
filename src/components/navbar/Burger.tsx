import "@/styles/burger.css"

interface BurgerProps {
  open:boolean,
  setOpen:(a:boolean)=>void
}

export function Burger({ open, setOpen }:BurgerProps) {
  return (
    <button
      className={`burger${open ? ' burger--open' : ''}`}
      onClick={() => setOpen(!open)}
    >
      <div />
      <div />
      <div />
    </button>
  );
}
