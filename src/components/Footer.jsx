 
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const CONTACT = {
  phone: "03332177223",
  email: "hello@tartco.com",
  instagram: "https://www.instagram.com/tartco/",
};

function InstagramIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r=".8"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    ["Home", "home"],
    ["Our Tarts", "our-tarts"],
    ["Our Story", "our-story"],
    ["Reviews", "reviews"],
  ];

  return (
    <footer className="bg-[#352014] text-[#faf0e3]">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-8 sm:pt-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <a
              href="#home"
              aria-label="Tart and Co home"
              className="inline-flex flex-col items-center"
            >
              <span className="font-serif text-3xl font-bold tracking-tight">
                tart &amp; co.
              </span>

              <span className="mt-1.5 text-[9px] tracking-[3px] text-[#d3b89b]">
                just eat it
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#d8c5b2]">
              Belgian Lindt chocolate, rich flavours, and little
              moments worth making sweeter.
            </p>

            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-[#ead8c4] transition hover:text-white"
            >
              <InstagramIcon size={17} />
              Follow us on Instagram
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-serif text-lg">Explore</h3>

            <ul className="mt-5 space-y-4 text-sm text-[#d8c5b2]">
              {links.map(([label, id]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="transition hover:text-white"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg">Get in Touch</h3>

            <div className="mt-5 space-y-5">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-start gap-3 text-sm text-[#d8c5b2] transition hover:text-white"
              >
                <Phone size={17} className="mt-0.5 shrink-0" />
                <span>{CONTACT.phone}</span>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-start gap-3 text-sm text-[#d8c5b2] transition hover:text-white"
              >
                <Mail size={17} className="mt-0.5 shrink-0" />
                <span>{CONTACT.email}</span>
              </a>

              <div className="flex items-start gap-3 text-sm text-[#d8c5b2]">
                <MapPin size={17} className="mt-0.5 shrink-0" />

                <span>
                  Karachi, Pakistan
                  <span className="mt-1 block text-xs text-[#bba28c]">
                    Pickup address to be confirmed
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-[#bba28c] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Tart &amp; Co. All rights reserved.
          </p>

          <p className="tracking-wide">Made for your moments.</p>
        </div>
      </div>
    </footer>
  );
}
