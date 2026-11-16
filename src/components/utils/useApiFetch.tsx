import { useEffect, useState, useCallback, useRef } from "react";
import { api_fetch } from "./api";

export function UseApiFetch<T>(url:string | null, option:RequestInit = {}){
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] =useState(true)

    const optionRef = useRef(option);
    optionRef.current = option;

    const controllerRef = useRef<AbortController | null>(null);

    const refetch = useCallback(async () => {
        if (!url) return;

        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;

        setError(null);
        try {
            const r = await api_fetch(url, {
                ...optionRef.current,
                signal: controller.signal,
            });
            if (!r.ok) throw new Error("Errore nel caricamento");
            const json: T | null = r.status === 204 ? null : await r.json();
            if (!controller.signal.aborted) setData(json);
        } catch (er: any) {
            if (er.name !== "AbortError") setError(er.message);
        } finally {
            if (!controller.signal.aborted) setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        if (!url) {
            setData(null);
            setError(null);
            setLoading(false);
            return;
        }
        setLoading(true);   // solo al cambio di url, non nei refetch
        refetch();
        return () => controllerRef.current?.abort();
    }, [url, refetch]);

    return { data, error, loading, refetch };
}