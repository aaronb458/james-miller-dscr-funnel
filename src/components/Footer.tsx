import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
        <Image
          src="https://assets.cdn.filesafe.space/cObQXIqcbjUWRdqwM6aq/media/65924660888153049a4cd890.png"
          alt="Jessen Cabinets"
          width={160}
          height={53}
          className="h-10 w-auto opacity-80"
        />
        <p className="text-zinc-400 text-sm text-center max-w-lg">
          White shaker cabinets. Solid hardwood construction. Delivered to your
          door. Showroom in Roswell, GA (by appointment).
        </p>
        <div className="text-zinc-500 text-xs">
          &copy; {new Date().getFullYear()} Jessen Cabinets. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
