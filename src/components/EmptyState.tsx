import type { ReactNode } from "react";

interface EmptyStateProps {
  message?: string;
  icon?: ReactNode;
  className?: string;
}

function EmptyState({
  message = "No Tasks Found",
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col justify-center items-center mt-8 ${className}`}>
      {icon ?? (
        <svg
          className="opacity-50"
          width="96"
          height="96"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38 43H10C8.34315 43 7 41.6569 7 40V8C7 6.34315 8.34315 5 10 5H19.9844C20.5366 5 21.069 5.21071 21.4452 5.61421L28.5548 13.3858C28.9309 13.7893 29.4634 14 30.0156 14H38C39.6569 14 41 15.3431 41 17V40C41 41.6569 39.6569 43 38 43Z"
            stroke="#9CA3AF"
            strokeWidth="4"
          />
          <path
            d="M22 26H26"
            stroke="#9CA3AF"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M18 32H30"
            stroke="#9CA3AF"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      )}
      <p className="text-2xl font-semibold opacity-50 dark:text-gray-100">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;
