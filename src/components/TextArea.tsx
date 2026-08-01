import { useState } from "react";

export default function TextArea({ label, name, placeholder, color = "primary", disabled = false, disabledValue = "",
    rows = 15, onChange = () => { } }
    : {
        label: string, name: string, placeholder: string, color?: "primary" | "danger",
        disabled?: boolean, disabledValue?: string, rows?: number, 
        onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    }) {
    const colors = {
        primary: "",
        danger: "border border-red-500",
        disabled: "bg-slate-300 cursor-not-allowed text-slate-500",
        enabled: "bg-slate-200 cursor-text text-slate-500",
    }

    const [copied, setCopied] = useState(false);
    const [value, setValue] = useState("");

    const copyToClipboard = () => {
        navigator.clipboard.writeText((disabled ? disabledValue : value) || "");
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 500);
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        onChange(e);
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row items-center justify-between">
                <label htmlFor={name} className={`text-lg`}>{label}</label>
                <button onClick={copyToClipboard} className="text-sm cursor-pointer
                bg-slate-300 p-1 px-2 -mb-2 mr-2 rounded-t-lg">{copied ? "Copied" : "Copy"}</button>
            </div>
            <textarea rows={rows} onChange={handleChange}
                className={`shadow-xl rounded-md p-2 ${colors[color]} w-full ${disabled ? colors.disabled : colors.enabled}`}
                placeholder={placeholder} disabled={disabled} value={disabled ? disabledValue : value} />
        </div>
    )
}