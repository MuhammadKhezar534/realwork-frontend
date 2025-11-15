import * as React from "react";
import { cn } from "@/lib/utils";

const Select = React.forwardRef(
  ({ className, chevronClassName, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-4 pr-10 py-2 text-sm text-slate-700 appearance-none cursor-pointer transition-all duration-200 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={cn("w-5 h-5 text-slate-500", chevronClassName)}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
