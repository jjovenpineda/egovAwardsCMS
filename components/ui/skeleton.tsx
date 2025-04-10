import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-slate-300 opacity-30",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
