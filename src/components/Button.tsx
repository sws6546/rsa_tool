export default function Button({ children, onClick = () => { }, color = "primary", disabled = false }: { children: React.ReactNode, onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void, color?: "primary" | "secondary" | "warning" | "danger", disabled?: boolean }) {
    const colors = {
        primary: "bg-emerald-500",
        secondary: "bg-blue-500",
        warning: "bg-yellow-500",
        danger: "bg-red-500",
    }

    const hoverColors = {
        primary: "hover:bg-emerald-600",
        secondary: "hover:bg-blue-600",
        warning: "hover:bg-yellow-600",
        danger: "hover:bg-red-600",
    }

    return (
        <button
            className={`text-white px-4 py-2 rounded-full ${colors[color]} ${hoverColors[color]} 
            duration-100 cursor-pointer shadow-xl
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={disabled}
            onClick={disabled ? undefined : onClick}>
            {children}
        </button>
    )
}
