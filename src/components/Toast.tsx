"use client";
import {useEffect, useState} from "react";

export default function Toast({text}:{text:string}) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (!text) return;
        setShow(true);
        const t = setTimeout(() => setShow(false), 2500);
        return () => clearTimeout(t);
    }, [text]);
    if (!show) return null;
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="rounded-full bg-black text-white px-4 py-2 shadow-lg">
                {text}
            </div>
        </div>
    );
}
