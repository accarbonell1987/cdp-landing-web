import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-[26px] text-[18px] font-bold no-underline transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-navy text-white hover:bg-navy-hover",
        outline: "bg-white text-navy shadow-[inset_0_0_0_2px_var(--navy)] hover:bg-navy hover:text-white",
        light: "bg-white text-navy hover:bg-mist",
      },
      size: {
        default: "",
        sm: "min-h-[46px] px-[22px] text-[16px]",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
