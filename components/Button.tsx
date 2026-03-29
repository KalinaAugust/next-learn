import React from 'react';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  color?: 'light' | 'dark' | 'green' | 'glass';
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
   onClick,
   children,
   color = 'dark', // Значение по умолчанию
   type = 'button',
   disabled = false,
   fullWidth = true,
  }: ButtonProps) {

  const baseStyles = `${fullWidth ? "w-full" : "px-5"} rounded-full border py-2.5 text-sm font-semibold transition-all cursor-pointer`;

  const colorStyles = color === 'light'
    ? "border-border text-foreground hover:bg-brand-light shadow-[0_4px_8px_rgba(180,80,0,0.35)] hover:shadow-[0_2px_4px_rgba(180,80,0,0.2)]"
    : color === 'glass'
    ? "border-white/30 text-white hover:bg-white/10 shadow-[0_4px_8px_rgba(255,255,255,0.15)] hover:shadow-[0_2px_12px_rgba(255,255,255,0.25)]"
    : color === 'green'
    ? "bg-green-900 text-white hover:bg-green-800 border-transparent shadow-[0_0_12px_rgba(34,197,94,0.4)] hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]"
    : "bg-brand text-background hover:bg-brand-hover border-transparent shadow-[0_4px_8px_rgba(180,80,0,0.35)] hover:shadow-[0_2px_4px_rgba(180,80,0,0.2)]";

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
