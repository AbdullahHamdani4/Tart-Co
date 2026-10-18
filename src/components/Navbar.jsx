 
import { ShoppingBag } from "lucide-react";

export default function Navbar({
  cartCount = 0,
  onCartClick,
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e8dccd] bg-[#faf5ed]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5  sm:px-8 lg:px-12">
        {/* Brand */}
        <a
          href="#home"
          aria-label="Tart and Co home"
          className="group flex flex-col items-center"
        >
          <span className="font-serif text-[26px] font-bold leading-none tracking-[-0.5px] text-[#492b1b] sm:text-[31px]">
            tart &amp; co.
          </span>

          <span className="mt-1.5 flex items-center gap-2 text-[8px] font-normal tracking-[2px] text-[#79563b]">
            <span className="h-px w-3 bg-[#a58a6b]" />
            just eat it
            <span className="h-px w-3 bg-[#a58a6b]" />
          </span>
        </a>

        {/* Cart */}
        <button
          type="button"
          onClick={onCartClick}
          aria-label={`Open cart, ${cartCount} items`}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#e4d4c2] bg-[#fffaf3] text-[#492b1b] transition-colors duration-200 hover:bg-[#492b1b] hover:text-[#fffaf3] sm:h-12 sm:w-12"
        >
          <ShoppingBag size={20} strokeWidth={1.7} />

          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#9b572f] px-1 text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
