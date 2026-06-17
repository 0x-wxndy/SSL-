import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const LOGO_SRC = "/assets/ssl-logo.png";

/** Intrinsic ratio of ssl-logo.png (~1.45:1 width/height) */
const LOGO_WIDTH = 160;
const LOGO_HEIGHT = 110;

type LogoProps = {
  /** Omit for home (`/`). Pass `false` to render without a link. */
  href?: string | false;
  className?: string;
  imageClassName?: string;
  showTagline?: boolean;
  priority?: boolean;
};

export default function Logo({
  href,
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
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        className={clsx("h-auto w-auto object-contain", imageClassName)}
      />
      {showTagline && (
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-brand-mid">
          Plateforme d&apos;aide sociale
        </span>
      )}
    </span>
  );

  if (href === false) {
    return content;
  }

  const linkHref = href ?? "/";

  return (
    <Link href={linkHref} className="inline-block shrink-0" aria-label="SSL+++ — Accueil">
      {content}
    </Link>
  );
}
