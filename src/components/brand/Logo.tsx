import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const LOGO_SRC = "/assets/ssl-logo.png";

type LogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  showTagline?: boolean;
  priority?: boolean;
};

export default function Logo({
  href = "/",
  className,
  imageClassName,
  showTagline = false,
  priority = false,
}: LogoProps) {
  const content = (
    <span className={clsx("inline-flex flex-col items-start", className)}>
      <Image
        src={LOGO_SRC}
        alt="SSL+++ — Services Solutions Life"
        width={140}
        height={72}
        priority={priority}
        className={clsx("h-auto object-contain", imageClassName)}
      />
      {showTagline && (
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-brand-mid">
          Plateforme d&apos;aide sociale
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block shrink-0" aria-label="SSL+++ — Accueil">
        {content}
      </Link>
    );
  }

  return content;
}
