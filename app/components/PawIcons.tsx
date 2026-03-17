import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const defaultProps: IconProps = {
  size: 24,
  color: "currentColor",
  strokeWidth: 1.5,
};

export function PawPrint({ size = 24, color = "currentColor", strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Main pad */}
      <ellipse cx="12" cy="14.5" rx="4.5" ry="3.5" />
      {/* Top-left toe */}
      <ellipse cx="6.5" cy="10" rx="1.5" ry="2" />
      {/* Top-right toe */}
      <ellipse cx="17.5" cy="10" rx="1.5" ry="2" />
      {/* Mid-left toe */}
      <ellipse cx="9" cy="8" rx="1.5" ry="2" />
      {/* Mid-right toe */}
      <ellipse cx="15" cy="8" rx="1.5" ry="2" />
    </svg>
  );
}

export function HeartPulse({ size = 24, color = "currentColor", strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Heart shape */}
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      {/* Pulse line */}
      <polyline points="7.5,12 9.5,9 11.5,14 13.5,10 15.5,12" />
    </svg>
  );
}

export function Syringe({ size = 24, color = "currentColor", strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Needle tip */}
      <line x1="3" y1="21" x2="7" y2="17" />
      {/* Barrel */}
      <path d="M7 17 L17 7" />
      {/* Plunger handle */}
      <path d="M17 7 L20 4" />
      {/* Barrel body */}
      <rect x="8.5" y="8.5" width="7" height="3" rx="0.5" transform="rotate(-45 12 12)" />
      {/* Fill mark */}
      <line x1="10.5" y1="13.5" x2="13.5" y2="10.5" />
      {/* Top cap */}
      <path d="M19 3 L21 5" />
    </svg>
  );
}

export function Scale({ size = 24, color = "currentColor", strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Base */}
      <rect x="4" y="19" width="16" height="2" rx="1" />
      {/* Pole */}
      <line x1="12" y1="19" x2="12" y2="6" />
      {/* Beam */}
      <line x1="4" y1="9" x2="20" y2="9" />
      {/* Left pan */}
      <path d="M4 9 C4 9 3 13 6 13 C9 13 8 9 8 9" />
      {/* Right pan */}
      <path d="M16 9 C16 9 15 13 18 13 C21 13 20 9 20 9" />
    </svg>
  );
}

export function CalendarPaw({ size = 24, color = "currentColor", strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Calendar body */}
      <rect x="3" y="4" width="18" height="18" rx="2" />
      {/* Top line */}
      <line x1="3" y1="9" x2="21" y2="9" />
      {/* Left pin */}
      <line x1="8" y1="2" x2="8" y2="6" />
      {/* Right pin */}
      <line x1="16" y1="2" x2="16" y2="6" />
      {/* Mini paw - main pad */}
      <ellipse cx="12" cy="15" rx="2" ry="1.5" />
      {/* Mini paw - toes */}
      <circle cx="10" cy="13" r="0.7" />
      <circle cx="12" cy="12.5" r="0.7" />
      <circle cx="14" cy="13" r="0.7" />
    </svg>
  );
}

export function Stethoscope({ size = 24, color = "currentColor", strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Earpieces */}
      <path d="M5 5 L5 7" />
      <path d="M9 5 L9 7" />
      {/* Headband */}
      <path d="M5 5 C5 3.5 9 3.5 9 5" />
      {/* Tubing down */}
      <path d="M5 7 C5 12 7 14 7 17" />
      <path d="M9 7 C9 12 7 14 7 17" />
      {/* Chest piece */}
      <circle cx="7" cy="19" r="2" />
      {/* Diaphragm line */}
      <line x1="6" y1="19" x2="8" y2="19" />
    </svg>
  );
}

export function Pill({ size = 24, color = "currentColor", strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Capsule body */}
      <rect x="4" y="9" width="16" height="6" rx="3" />
      {/* Middle line */}
      <line x1="12" y1="9" x2="12" y2="15" />
    </svg>
  );
}

export function Scissors({ size = 24, color = "currentColor", strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Left handle circle */}
      <circle cx="6" cy="7" r="2.5" />
      {/* Right handle circle */}
      <circle cx="6" cy="17" r="2.5" />
      {/* Left blade */}
      <line x1="8" y1="5.5" x2="20" y2="16" />
      {/* Right blade */}
      <line x1="8" y1="18.5" x2="20" y2="8" />
      {/* Pivot */}
      <circle cx="14" cy="12" r="0.5" fill={color} stroke="none" />
    </svg>
  );
}

export function Star({ size = 24, color = "currentColor", strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export function Shield({ size = 24, color = "currentColor", strokeWidth = 1.5, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Shield */}
      <path d="M12 2 L20 6 L20 12 C20 17 16 21 12 22 C8 21 4 17 4 12 L4 6 Z" />
      {/* Checkmark inside */}
      <polyline points="9,12 11,14 15,10" />
    </svg>
  );
}
