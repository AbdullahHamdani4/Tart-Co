
const STORY_IMAGE =
  "https://res.cloudinary.com/t0z3ou5l/image/upload/v1792264465/Screenshot_20261018_001107_Instagram.jpg";

export default function OurStory() {
  const handleOrderClick = () => {
    document
      .getElementById("our-tarts")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="our-story"
      className="scroll-mt-24 bg-[#faf5ed] px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Story content */}
        <div className="order-2 lg:order-1">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[3px] text-[#986b49]">
            A little about us
          </p>

          <h2 className="max-w-lg font-serif text-3xl leading-tight text-[#492b1b] sm:text-4xl lg:text-5xl">
            More Than Just a Tart.
          </h2>

          <div className="mt-5 h-px w-14 bg-[#b38b68]" />

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#795f4b] sm:text-base sm:leading-8">
            At Tart &amp; Co, we believe the best moments deserve
            something special. A little chocolate after a long day,
            a dessert shared with friends, or a celebration made
            sweeter.
          </p>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#795f4b] sm:text-base sm:leading-8">
            Made with Belgian Lindt chocolate and premium ingredients,
            our tarts bring together rich flavour, a smooth texture,
            and the kind of indulgence worth slowing down for.
          </p>

          <p className="mt-5 font-serif text-lg italic text-[#805638]">
            Made for your moments. Made to be enjoyed.
          </p>

          <button
            type="button"
            onClick={handleOrderClick}
            className="mt-7 rounded-full bg-[#492b1b] px-7 py-3.5 text-sm text-[#fffaf3] transition-colors hover:bg-[#68432e]"
          >
            Find Your Tart
          </button>
        </div>

        {/* Large tart image */}
        <div className="order-1 lg:order-2">
          <div className="relative">
            <div className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-[#d9c3ab] sm:-bottom-4 sm:-right-4" />

            <img
              src={STORY_IMAGE}
              alt="Rich chocolate tart made with premium chocolate"
              loading="lazy"
              className="relative aspect-[5/4] w-full rounded-2xl object-cover object-center sm:aspect-[4/3] lg:aspect-[5/6]"
            />

            <div className="absolute bottom-4 left-4 rounded-lg border border-white/20 bg-[#faf5ed]/95 px-4 py-3 shadow-sm backdrop-blur-sm sm:bottom-6 sm:left-6 sm:px-5">
              <p className="font-serif text-base text-[#492b1b] sm:text-lg">
                Tart &amp; Co.
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-[2px] text-[#856c58]">
                Just eat it
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
