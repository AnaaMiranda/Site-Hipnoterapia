import Image from "next/image";
import { img, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  name: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Sobrescreve o alt do manifesto quando necessário. */
  alt?: string;
}

/**
 * Wrapper do next/image com blur placeholder, dimensões e alt vindos
 * do manifesto gerado. Otimização AVIF/WebP responsiva é automática.
 */
export function SmartImage({
  name,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  alt,
}: SmartImageProps) {
  const data = img(name);
  return (
    <Image
      src={data.src}
      width={data.width}
      height={data.height}
      alt={alt ?? data.alt}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={data.blurDataURL}
      className={cn("h-auto w-full object-cover", className)}
    />
  );
}
