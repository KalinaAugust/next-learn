import React from 'react';

interface ButtonProps {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    color?: 'light' | 'dark'; // Ограничил варианты для предсказуемости
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default function Button({
   onClick,
   children,
   color = 'dark', // Значение по умолчанию
   type = 'button',
   disabled = false
}: ButtonProps) {

    const baseStyles = "w-full rounded-full border py-2.5 text-sm font-medium transition-all cursor-pointer shadow-[0_4px_8px_rgba(180,80,0,0.35)] hover:shadow-[0_2px_4px_rgba(180,80,0,0.2)]";

    const colorStyles = color === 'light'
        ? "border-border text-foreground hover:bg-brand-light"
        : "bg-brand text-background hover:bg-brand-hover border-transparent";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${colorStyles} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {children}
        </button>
    );
}
