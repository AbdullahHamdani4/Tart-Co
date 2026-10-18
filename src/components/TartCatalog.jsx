 
import { useDispatch, useSelector } from "react-redux";
import { Plus, Minus, ShoppingBag } from "lucide-react";

import { setCartItem } from "../features/cart/cartSlice";

const TARTS = [
  {
    id: "slice",
    name: "Slice",
    serves: "Serves 1",
    price: 1100,
    image:
      "https://res.cloudinary.com/t0z3ou5l/image/upload/v1792268427/Screenshot_20261018_003326_Instagram.jpg",
    description: "A little chocolate indulgence, just for you.",
  },
  {
    id: "small",
    name: "Small",
    serves: "Serves 3–4",
    price: 5000,
    image:
      "https://res.cloudinary.com/t0z3ou5l/image/upload/v1792268427/Screenshot_20261018_003406_Instagram.jpg",
    bestSelling: true,
    description: "Perfect for sharing a little sweetness.",
  },
  {
    id: "medium",
    name: "Medium",
    serves: "Serves 6–7",
    price: 8000,
    image:
      "https://res.cloudinary.com/t0z3ou5l/image/upload/v1792268427/Screenshot_20261018_003406_Instagram.jpg",
    description: "Made for gatherings and chocolate lovers.",
  },
  {
    id: "large",
    name: "Large",
    serves: "Serves 8–9",
    price: 11000,
    image:
      "https://res.cloudinary.com/t0z3ou5l/image/upload/v1792264465/Screenshot_20261018_001107_Instagram.jpg",
    description: "A generous tart for the whole table.",
  },
];

function formatPrice(price) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

function TartCard({ tart, quantity, onQuantityChange }) {
  const increase = () => {
    if (quantity < 5) {
      onQuantityChange(tart, quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 0) {
      onQuantityChange(tart, quantity - 1);
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-xl border border-[#e8d9c8] bg-[#fffaf3] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(73,43,27,0.10)]">
      {/* Product image */}
      <button
        type="button"
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("tart:open-product", {
              detail: tart,
            })
          )
        }
        className="relative block aspect-[4/3] w-full overflow-hidden bg-[#eadccb] text-left"
        aria-label={`View ${tart.name} tart details`}
      >
        <img
          src={tart.image}
          alt={`${tart.name} Belgian chocolate tart`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {tart.bestSelling && (
          <span className="absolute left-3 top-3 rounded-full bg-[#8b4b29] px-3 py-1.5 text-[9px] font-medium uppercase tracking-[1.5px] text-white shadow-sm">
            Best Selling
          </span>
        )}
      </button>

      {/* Product details */}
      <div className="p-3.5 sm:p-4">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#492b1b] sm:text-xl">
            {tart.name}
          </h3>

          <p className="mt-1 text-xs text-[#856c58]">
            {tart.serves}
          </p>
        </div>

        <p className="mt-3 min-h-10 text-xs leading-5 text-[#795f4b]">
          {tart.description}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#eee2d4] pt-3">
          <span className="font-serif text-base font-semibold text-[#492b1b] sm:text-lg">
            {formatPrice(tart.price)}
          </span>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={increase}
              aria-label={`Add ${tart.name} to cart`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#492b1b] text-white transition hover:bg-[#754a30]"
            >
              <Plus size={18} />
            </button>
          ) : (
            <div className="flex h-9 items-center gap-3 rounded-full border border-[#dfcbb7] bg-[#f8efe4] px-2">
              <button
                type="button"
                onClick={decrease}
                aria-label={`Remove one ${tart.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#492b1b] hover:bg-[#ead9c6]"
              >
                <Minus size={14} />
              </button>

              <span className="min-w-3 text-center text-sm font-medium text-[#492b1b]">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increase}
                disabled={quantity >= 5}
                aria-label={`Add one ${tart.name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#492b1b] hover:bg-[#ead9c6] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>

        {quantity >= 5 && (
          <p className="mt-2 text-right text-[10px] text-[#856c58]">
            Maximum 5 per product
          </p>
        )}
      </div>
    </article>
  );
}

export default function TartCatalog() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const handleQuantityChange = (tart, quantity) => {
    dispatch(
      setCartItem({
        tart,
        quantity,
      })
    );
  };

  return (
    <section
      id="our-tarts"
      className="scroll-mt-24 bg-[#faf5ed] px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[3px] text-[#986b49]">
              Made for chocolate lovers
            </p>

            <h2 className="font-serif text-3xl text-[#492b1b] sm:text-4xl lg:text-5xl">
              Our Tarts
            </h2>

            <p className="mt-2 text-xs leading-5 text-[#856c58] sm:text-sm">
              Same rich taste. Different sizes for different moments.
            </p>
          </div>

          <ShoppingBag
            size={23}
            strokeWidth={1.3}
            className="mb-1 shrink-0 text-[#8b6548]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {TARTS.map((tart) => (
            <TartCard
              key={tart.id}
              tart={tart}
              quantity={cartItems[tart.id]?.quantity ?? 0}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-[10px] tracking-wide text-[#9a806b]">
          Freshly prepared with premium Belgian chocolate.
        </p>
      </div>
    </section>
  );
}
