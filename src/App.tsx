import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute';  
import { Login } from './components/login/login'
import { Homepage } from './components/page/homepage/homepage';
import { MachinesPage } from './components/page/machine/machinesPage/MachinePage';

export function App() {
  const [logged, setLogged] = useState(
    () => {
      return sessionStorage.getItem("token") !== null}
  );

  const logout = (): void => {
    setLogged(false);
    sessionStorage.clear();
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onChange={() => setLogged(true)} />} />
      <Route element={<ProtectedRoute logged={logged} />}>
        <Route path="/" element={<Homepage onChange={logout} />} />
        <Route path="/machine" element={<MachinesPage onChange={logout} />} />
        <Route path="/settings" element={<></>} />
      </Route>
      
    </Routes>
  );
}
//skeleton imported usalo
//quando sara finito per le immagini bisognera divertirsi
//git push -u origin main