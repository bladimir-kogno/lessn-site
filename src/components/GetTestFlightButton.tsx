"use client";
import {useModal} from "@/components/ModalProvider";

export default function GetTestFlightButton({className=""}:{className?:string}) {
    const {open} = useModal();
    return (
        <button
            type="button"
            onClick={() => open()}
            className={`btn ${className}`}
            aria-haspopup="dialog"
            aria-controls="testflight-modal"
        >
            Get TestFlight
        </button>
    );
}
