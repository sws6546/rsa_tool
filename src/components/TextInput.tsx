export default function TextInput({ label, name, placeholder, color = "primary", onChange = () => { } }: { label: string, name: string, placeholder: string, color?: "primary" | "danger", onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    const colors = {
        primary: "",
        danger: "border border-red-500",
    }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className={`text-lg`}>{label}</label>
            <input className={`shadow-xl rounded-md p-2 bg-slate-200 ${colors[color]}`} placeholder={placeholder} onChange={onChange} />
        </div>
    )
}