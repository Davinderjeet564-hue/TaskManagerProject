import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <div
      className={`flex min-h-screen flex-col transition-colors duration-300 bg-gray-100 dark:bg-gray-900 ${className}`}
    >
      {children}
    </div>
  );
}

export default PageShell;
