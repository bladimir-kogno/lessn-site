"use client";

import {useModal} from "@/components/ModalProvider";
import {useEffect, useRef, useState} from "react";
import Toast from "@/components/Toast";

type Form = {
    firstName: string;
    lastName: string;
    email: string;
    isTeacher: "yes" | "no" | "";
    gradeLevel: string;
    subject: string;
    botField?: string; // honeypot
};

export default function TestFlightModal() {
    const {isOpen, close} = useModal();

    // form state
    const [form, setForm] = useState<Form>({
        firstName: "",
        lastName: "",
        email: "",
        isTeacher: "",
        gradeLevel: "",
        subject: ""
    });
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState<null | "ok" | "err">(null);
    const [msg, setMsg] = useState("");

    // UX upgrades
    const [toast, setToast] = useState("");
    const firstInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // focus first field when opened
        if (isOpen) firstInputRef.current?.focus();
    }, [isOpen]);

    useEffect(() => {
        // ESC to close
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") close();
        }
        if (isOpen) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, close]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setForm((f) => ({...f, [name]: value}));
    };

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        // spam honeypot
        // @ts-expect-error: exists if present
        if (form.botField) return;

        // basic client validation
        if (!form.firstName || !form.lastName || !/^\S+@\S+\.\S+$/.test(form.email) || !form.isTeacher) {
            setMsg("Please complete required fields.");
            return;
        }

        setLoading(true);
        setMsg("");
        try {
            const res = await fetch("/api/testflight", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Request failed");
            setDone("ok");
            setToast(`Invite sent to ${form.email}`);
        } catch (err: any) {
            setDone("err");
            setMsg(err?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <>
            <div
                id="testflight-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="testflight-title"
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                {/* backdrop */}
                <button onClick={close} className="absolute inset-0 bg-black/40" aria-label="Close modal" />

                {/* dialog */}
                <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-card border border-black/5 p-6">
                    <button
                        onClick={close}
                        className="absolute right-3 top-3 text-black/50 hover:text-black"
                        aria-label="Close"
                        type="button"
                    >
                        ✕
                    </button>

                    {done === "ok" ? (
                        <div className="text-center py-6">
                            <h3 id="testflight-title" className="text-2xl font-bold">
                                Check your email
                            </h3>
                            <p className="mt-2 text-black/70">
                                We’ve sent your TestFlight link. It may take a minute to arrive.
                            </p>
                            <button className="btn mt-6" onClick={close} type="button">
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            <h3 id="testflight-title" className="text-2xl font-bold">
                                Get TestFlight
                            </h3>
                            <p className="mt-1 text-black/60">
                                Fill this quick form and we’ll email you the invite.
                            </p>

                            <form onSubmit={onSubmit} className="mt-4 grid gap-3" noValidate>
                                {/* honeypot */}
                                <input
                                    type="text"
                                    name="botField"
                                    value={(form as any).botField || ""}
                                    onChange={onChange}
                                    className="hidden"
                                    tabIndex={-1}
                                    autoComplete="off"
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-sm text-black/70">First name*</label>
                                        <input
                                            ref={firstInputRef}
                                            name="firstName"
                                            value={form.firstName}
                                            onChange={onChange}
                                            required
                                            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-black/70">Last name*</label>
                                        <input
                                            name="lastName"
                                            value={form.lastName}
                                            onChange={onChange}
                                            required
                                            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-black/70">Email*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={onChange}
                                        required
                                        pattern="^\S+@\S+\.\S+$"
                                        className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="text-sm text-black/70">Teacher?*</label>
                                        <div className="mt-1 flex gap-3">
                                            <label className="inline-flex items-center gap-2 text-sm">
                                                <input
                                                    type="radio"
                                                    name="isTeacher"
                                                    value="yes"
                                                    checked={form.isTeacher === "yes"}
                                                    onChange={onChange}
                                                    required
                                                />{" "}
                                                Yes
                                            </label>
                                            <label className="inline-flex items-center gap-2 text-sm">
                                                <input
                                                    type="radio"
                                                    name="isTeacher"
                                                    value="no"
                                                    checked={form.isTeacher === "no"}
                                                    onChange={onChange}
                                                    required
                                                />{" "}
                                                No
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-black/70">Grade level</label>
                                        <input
                                            name="gradeLevel"
                                            value={form.gradeLevel}
                                            onChange={onChange}
                                            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-black/70">Subject</label>
                                        <input
                                            name="subject"
                                            value={form.subject}
                                            onChange={onChange}
                                            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
                                        />
                                    </div>
                                </div>

                                {msg && <p className="text-sm text-red-600">{msg}</p>}

                                <div className="mt-2 flex justify-end">
                                    <button type="submit" className="btn disabled:opacity-60" disabled={loading}>
                                        {loading ? "Sending…" : "Send invite"}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>

            {/* success toast */}
            <Toast text={toast} />
        </>
    );
}
