
const HERO_IMAGE =
  "https://res.cloudinary.com/t0z3ou5l/image/upload/v1792264465/Screenshot_20261018_001107_Instagram.jpg";

export default function Hero() {
  const handleOrderClick = () => {
    document
      .getElementById("our-tarts")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="bg-[#faf5ed] px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="relative mx-auto min-h-[590px] max-w-7xl overflow-hidden rounded-xl bg-[#2b170e] sm:min-h-[520px] sm:rounded-2xl lg:min-h-[580px]">
        {/* Image: preserve the portrait composition on mobile */}
        <img
          src={HERO_IMAGE}
          alt="Rich Belgian chocolate being poured over a chocolate tart"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-[65%_center]"
        />

        {/* Contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 sm:bg-gradient-to-r sm:from-black/75 sm:via-black/40 sm:to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[590px] flex-col justify-end px-5 pb-9 pt-16 text-white sm:min-h-[520px] sm:max-w-[620px] sm:justify-center sm:px-10 sm:py-12 lg:min-h-[580px] lg:px-16">
          <p className="mb-4 text-[9px] tracking-[2.5px] text-[#f0d7bd] sm:text-[11px] sm:tracking-[3px]">
            PREMIUM BELGIAN CHOCOLATE TARTS
          </p>

          <h1 className="font-serif text-[46px] leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Just Eat It.
          </h1>

          <p className="mt-4 max-w-sm text-[13px] leading-6 text-white/90 sm:text-sm sm:leading-7">
            Belgian Lindt chocolate. Premium ingredients.
            Rich, smooth, melt-in-your-mouth goodness.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <button
              type="button"
              onClick={handleOrderClick}
              className="rounded-full bg-[#f5e8d8] px-6 py-3 text-xs font-medium text-[#492b1b] transition-colors hover:bg-white sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Order Now
            </button>

            <button
              type="button"
              onClick={handleOrderClick}
              className="rounded-full border border-white/75 px-6 py-3 text-xs text-white transition-colors hover:bg-white hover:text-[#492b1b] sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Book Your Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
