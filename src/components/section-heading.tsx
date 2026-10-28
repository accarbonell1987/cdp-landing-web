import { cn } from "@/lib/utils";

type Props = {
  id: string;
  kicker?: string;
  title: string;
  aside?: React.ReactNode;
  inverse?: boolean;
  className?: string;
};

// Kicker + h2 on the left, an optional note on the right (wraps below on small screens).
export function SectionHeading({ id, kicker, title, aside, inverse, className }: Props) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      <div className="flex max-w-[760px] flex-col gap-4">
        {kicker && <p className={cn("kicker", inverse && "text-white")}>{kicker}</p>}
        <h2 id={id} className="display text-[clamp(34px,3.8vw,56px)]">
          {title}
        </h2>
      </div>
      {aside && <p className={cn("max-w-[44ch]", inverse ? "text-[#d5dcea]" : "text-ink-soft")}>{aside}</p>}
    </div>
  );
}
