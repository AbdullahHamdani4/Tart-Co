
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Ayesha K.",
    date: "Recent order",
    text: "The chocolate was so rich and smooth. We ordered it for a family dinner and everyone wanted another slice.",
    product: "Chocolate Tart",
  },
  {
    name: "Hamza R.",
    date: "Recent order",
    text: "Honestly loved the taste. The tart looked beautiful, and the chocolate was exactly what I was craving.",
    product: "Belgian Chocolate Tart",
  },
  {
    name: "Sarah M.",
    date: "Recent order",
    text: "Ordered one for a small celebration and it was a hit. Definitely something I would order again.",
    product: "Sharing Tart",
  },
];

function ReviewCard({ review }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-[#e8d9c8] bg-[#fffaf3] p-5 sm:p-6">
      <Quote
        size={23}
        strokeWidth={1.4}
        className="mb-4 text-[#a47b58]"
      />

      <div
        className="mb-4 flex gap-1"
        aria-label="5 out of 5 stars"
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={13}
            fill="#a56c38"
            strokeWidth={0}
          />
        ))}
      </div>

      <p className="flex-1 text-sm leading-7 text-[#654a37]">
        “{review.text}”
      </p>

      <div className="mt-6 border-t border-[#eadfD2] pt-4">
        <p className="font-serif text-base font-semibold text-[#492b1b]">
          {review.name}
        </p>

        <p className="mt-1 text-[10px] uppercase tracking-[1.5px] text-[#9a806b]">
          {review.product}
        </p>

        <p className="mt-2 text-[10px] text-[#9a806b]">
          Placeholder review · {review.date}
        </p>
      </div>
    </article>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="scroll-mt-24 bg-[#f3eadd] px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-9 max-w-xl text-center sm:mb-12">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[3px] text-[#986b49]">
            A little love from our customers
          </p>

          <h2 className="font-serif text-3xl text-[#492b1b] sm:text-4xl lg:text-5xl">
            Words Worth Sharing.
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#795f4b]">
            A good tart brings people together. Here is some sample
            feedback for our design preview.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-[#bda187]" />
            <span className="text-xs tracking-[2px] text-[#986b49]">
              TART &amp; CO.
            </span>
            <div className="h-px w-8 bg-[#bda187]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>

        <p className="mt-5 text-center text-[10px] text-[#9a806b]">
          Sample content for development — not genuine customer reviews.
        </p>
      </div>
    </section>
  );
}
