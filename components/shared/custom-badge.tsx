import React from "react";
import { Badge } from "../ui/badge";

export default function CustomBadge({
  color,
  message,
  icon,
  className,
}: {
  color: string;
  message: string;
  icon?: React.ReactNode;
  className: string;
}) {
  const colors: Record<string, string> = {
    gray: "text-gray-700 bg-gray-100",
    orange: "text-orange-500 bg-orange-100",
    red: "text-red-700 bg-red-100",
    emerald: "text-emerald-700 bg-emerald-100",
    blue: "text-blue-700 bg-blue-100",
  };

  return (
    <div>
      <Badge
        className={`pointer-events-none shadow-none ${
          colors[color] || "bg-gray-100 text-gray-500 h-min"
        } ${className}`}
      >
        {icon && <span>{icon}</span>}
        {message}
      </Badge>
    </div>
  );
}
