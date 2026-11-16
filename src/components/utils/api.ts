import type { LoginData, SingInData } from "@/interface/interface";

export async function api_login(data:LoginData) {
    //console.log(data)
    const res = await fetch("/api/login" , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        });
    const risposta = await res.json();
    if (!res.ok) throw new Error(risposta.errore || "Errore durante il login");
    else {
        localStorage.setItem("user",JSON.stringify(risposta.utente))
        sessionStorage.setItem("token", JSON.stringify(risposta.token))}
}

export async function api_singin(data:SingInData) {
    if (data.birthdate instanceof Date) data.birthdate=data.birthdate.toLocaleDateString("sv-SE");
    //console.log(data)
    const res = await fetch("/api/singin" , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        });
    const risposta = await res.json();
    if (!res.ok) {
        throw new Error(risposta.errore || "Errore durante il singin");
    }
    else {
        localStorage.setItem("user",JSON.stringify(risposta.utente))
        sessionStorage.setItem("token", JSON.stringify(risposta.token))}
}

export async function api_fetch(url:string, options: RequestInit = {}) {
    const token = sessionStorage.getItem("token");
    const res = await fetch(url, 
        {...options,
    headers: { authorization:`${token}`,"Content-Type": "application/json" , ...options.headers,},
    
  });
  if (res.status === 401) {
    sessionStorage.clear();
    window.location.href = "/login"; 
  }
  return res;

}