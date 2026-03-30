import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-brand-charcoal py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Jessen Cabinets"
            width={180}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
