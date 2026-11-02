import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "full" | "mark" | "app-icon" | "compact";
  className?: string;
  showTagline?: boolean;
  clickable?: boolean;
}

export function Logo({
  variant = "full",
  className = "",
  showTagline = true,
  clickable = true,
}: LogoProps) {
  let content: React.ReactNode;

  if (variant === "app-icon") {
    content = (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        <Image
          src="/images/brand/app-icon-official.png"
          alt="AR JISHAN Icon"
          width={40}
          height={40}
          className="w-10 h-10 rounded-xl object-contain shadow-xs"
          priority
        />
      </div>
    );
  } else if (variant === "compact") {
    content = (
      <div className={`flex items-center gap-2 select-none ${className}`}>
        <Image
          src="/images/brand/logo-full-official.png"
          alt="AR JISHAN E-COMMERCE"
          width={180}
          height={40}
          className="h-8 sm:h-9 w-auto object-contain"
          priority
        />
      </div>
    );
  } else {
    content = (
      <div className={`flex items-center gap-2 select-none ${className}`}>
        <Image
          src="/images/brand/logo-full-official.png"
          alt="AR JISHAN E-COMMERCE SERVICE — Shop Smart. Live Better."
          width={240}
          height={55}
          className="h-10 sm:h-12 w-auto object-contain"
          priority
        />
      </div>
    );
  }

  if (clickable) {
    return (
      <Link href="/" className="inline-block hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
