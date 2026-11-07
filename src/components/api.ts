import type { LoginData, SingInData } from "@/interface/interface";

export async function api_login(data:LoginData) {
    console.log(data)
    const res = await fetch("/api/login" , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        });
    const risposta = await res.json();
    if (!res.ok) throw new Error(risposta.errore || "Errore durante il login");
    else localStorage.setItem("token",risposta.token)
}

export async function api_singin(data:SingInData) {
    if (data.birthdate instanceof Date) data.birthdate=data.birthdate.toLocaleDateString("sv-SE");
    console.log(data)
    const res = await fetch("/api/singin" , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        });
    const risposta = await res.json();
    if (!res.ok) throw new Error(risposta.errore || "Errore durante il singin");
    else localStorage.setItem("token",risposta.token)
}