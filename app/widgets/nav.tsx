"use client";
import jumboIcon from "@/app/assets/images/athletics-graphic-blue.png";
import { cn } from "@/app/lib/utilities/style-utils";
import { List, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CommonIcon, IconName } from "./common-icon";

type NavProps = {
  children: React.ReactNode;
};

export function Nav({ children }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function open() {
    setMenuOpen(true);
  }

  function close() {
    setMenuOpen(false);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between bg-tufts-blue px-7 py-3">
        <Link href="/" onClick={close}>
          <Image src={jumboIcon} width={50} height={50} alt="Jumbo" />
        </Link>

        <div className="cursor-pointer">
          {menuOpen && <X color="#FFF" size={40} onClick={close} />}
          {!menuOpen && <List size={40} color="#FFF" onClick={open} />}
        </div>
      </div>

      <div className="absolute w-full">
        <div
          className={cn(
            "absolute flex w-full flex-col gap-4 px-5 pt-10 font-manrope text-2xl",
            !menuOpen && "invisible opacity-0",
          )}
        >
          <NavLink text="Home" iconName="home" href="/" onClick={close} />
          <NavLink text="Runs" iconName="shoe" href="/runs" onClick={close} />
        </div>

        <div className={cn(menuOpen && "invisible opacity-0")}>{children}</div>
      </div>
    </div>
  );
}

interface NavLinkProps {
  text: string;
  iconName: IconName;
  href: string;
  disabled?: boolean;
  onClick: () => void;
}

function NavLink({ text, iconName, href, disabled, onClick }: NavLinkProps) {
  const size = 24;
  const color = "#3172AE";
  const weight = "duotone";

  return (
    <Link
      href={href}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      className={cn(
        "group flex flex-row items-center gap-5",
        disabled && "pointer-events-none",
      )}
      onClick={onClick}
    >
      <CommonIcon name={iconName} size={size} color={color} weight={weight} />
      <div
        className={cn(
          disabled && "text-black/20",
          !disabled && "text-black underline-offset-4 group-hover:underline",
        )}
      >
        {text}
      </div>
    </Link>
  );
}
