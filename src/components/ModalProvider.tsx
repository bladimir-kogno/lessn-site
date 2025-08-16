"use client";
import {createContext, useContext, useState, ReactNode} from "react";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const ModalCtx = createContext<Ctx | null>(null);

export function useModal() {
    const ctx = useContext(ModalCtx);
    if (!ctx) throw new Error("useModal must be used within <ModalProvider>");
    return ctx;
}

export default function ModalProvider({children}:{children:ReactNode}) {
    const [isOpen, setOpen] = useState(false);
    return (
        <ModalCtx.Provider value={{isOpen, open: () => setOpen(true), close: () => setOpen(false)}}>
            {children}
        </ModalCtx.Provider>
    );
}

