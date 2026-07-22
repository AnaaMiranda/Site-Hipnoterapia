import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium leading-none tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 disabled:pointer-events-none disabled:opacity-55 select-none";

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-[0.95rem]",
  lg: "px-7 py-4 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-ink shadow-soft hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0",
  accent:
    "bg-accent text-accent-ink shadow-soft hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0",
  outline:
    "border border-line-strong bg-transparent text-ink hover:border-primary hover:bg-surface-2/60 hover:-translate-y-0.5",
  ghost: "bg-transparent text-ink hover:bg-surface-2/70",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props;
    const external = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
