import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingBag,
  X,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Truck,
  Store,
  CheckCircle2,
} from "lucide-react";

import { setCartItem, clearCart } from "./features/cart/cartSlice";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TartCatalog from "./components/TartCatalog";
import OurStory from "./components/OurStory";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

const WHATSAPP_NUMBER = "923332177223";
const DELIVERY_FEE = 300;

const formatPrice = (price) => `Rs. ${price.toLocaleString("en-PK")}`;

const initialForm = {
  name: "",
  phone: "",
  email: "",
  fulfilment: "delivery",
  address: "",
  payment: "cod",
  notes: "",
};

export default function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");

  const cartItems = Object.values(cart).filter((item) => item.quantity > 0);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = form.fulfilment === "delivery" ? DELIVERY_FEE : 0;

  const grandTotal = cartTotal + deliveryFee;

  const handleAddToCart = (tart, quantity) => {
    dispatch(setCartItem({ tart, quantity }));
  };

  const updateForm = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setFormError("");
  };

  const closeCart = () => {
    setCartOpen(false);
    setCheckoutOpen(false);
    setFormError("");
  };

  const scrollToTarts = () => {
    closeCart();

    document
      .getElementById("our-tarts")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const startCheckout = () => {
    setFormError("");
    setCheckoutOpen(true);
  };

  const placeOrder = (event) => {
    event.preventDefault();
    setFormError("");

    if (!cartItems.length) {
      setFormError("Your cart is empty.");
      return;
    }

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const address = form.address.trim();

    if (!name || !phone || !email) {
      setFormError("Please complete your name, phone number and email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!/^[+\d\s()-]{7,20}$/.test(phone)) {
      setFormError("Please enter a valid phone number.");
      return;
    }

    if (form.fulfilment === "delivery" && !address) {
      setFormError("Please enter your delivery address.");
      return;
    }

    const orderLines = cartItems.map(
      (item) =>
        `• ${item.name} Tart x ${item.quantity} — ${formatPrice(
          item.price * item.quantity,
        )}`,
    );

    const paymentLabel = {
      cod: "Cash on Delivery",
      cop: "Cash on Pickup",
      bank: "Bank Transfer (confirm details with Tart & Co)",
    }[form.payment];

    const message = [
      "Assalam-o-Alaikum Tart & Co! I'd like to place an order.",
      "",
      "🧾 *ORDER DETAILS*",
      ...orderLines,
      "",
      `Subtotal: ${formatPrice(cartTotal)}`,
      `Fulfilment: ${form.fulfilment === "delivery" ? "Delivery" : "Pickup"}`,
      ...(form.fulfilment === "delivery"
        ? [`Delivery fee: ${formatPrice(DELIVERY_FEE)}`]
        : []),
      `*Total: ${formatPrice(grandTotal)}*`,
      "",
      "👤 *CUSTOMER DETAILS*",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      ...(form.fulfilment === "delivery" ? [`Address: ${address}`] : []),
      `Payment method: ${paymentLabel}`,
      ...(form.notes.trim() ? [`Order notes: ${form.notes.trim()}`] : []),
      "",
      "Please confirm availability and the order before preparation. Thank you!",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    const whatsappWindow = window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer",
    );

    if (whatsappWindow) {
      dispatch(clearCart());
      setForm(initialForm);
      setCheckoutOpen(false);
      setCartOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5ed] text-[#492b1b]">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => {
          setCheckoutOpen(false);
          setCartOpen(true);
        }}
      />

      <main>
        <Hero />
        <TartCatalog onAddToCart={handleAddToCart} />
        <OurStory />
        <Reviews />
      </main>

      <Footer />

      {/* Floating cart summary */}
      {cartCount > 0 && !cartOpen && (
        <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-5">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-4 rounded-2xl border border-[#68432e] bg-[#492b1b] p-3.5 text-white shadow-[0_8px_35px_rgba(40,20,10,0.25)] sm:p-4">
            <div className="min-w-0">
              <p className="text-xs text-white/75">
                {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
              </p>
              <p className="mt-1 font-serif text-lg">
                {formatPrice(cartTotal)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="flex shrink-0 items-center gap-2 rounded-full bg-[#f5e8d8] px-4 py-3 text-xs font-medium text-[#492b1b] transition hover:bg-white sm:px-5 sm:text-sm"
            >
              View Cart
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Cart and checkout drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40" onClick={closeCart}>
          <section
            role="dialog"
            aria-modal="true"
            aria-label={checkoutOpen ? "Checkout" : "Your shopping cart"}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#faf5ed] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-[#e8dccd] px-5 py-5 sm:px-7">
              <div className="flex items-center gap-3">
                {checkoutOpen && (
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutOpen(false);
                      setFormError("");
                    }}
                    aria-label="Back to cart"
                    className="rounded-full p-2 transition hover:bg-[#eee2d3]"
                  >
                    <ArrowLeft size={19} />
                  </button>
                )}

                <div>
                  <h2 className="font-serif text-2xl">
                    {checkoutOpen ? "Checkout" : "Your Cart"}
                  </h2>
                  <p className="mt-1 text-xs text-[#856c58]">
                    {checkoutOpen
                      ? "Your details, your order."
                      : `${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-full p-2 transition hover:bg-[#eee2d3]"
              >
                <X size={21} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <ShoppingBag
                  size={38}
                  strokeWidth={1.2}
                  className="mb-5 text-[#9b795c]"
                />

                <h3 className="font-serif text-2xl">Nothing in here yet.</h3>

                <p className="mt-2 max-w-xs text-sm leading-6 text-[#795f4b]">
                  Your favourite chocolate tart is waiting for you.
                </p>

                <button
                  type="button"
                  onClick={scrollToTarts}
                  className="mt-6 rounded-full bg-[#492b1b] px-6 py-3 text-sm text-white transition hover:bg-[#68432e]"
                >
                  Explore Our Tarts
                </button>
              </div>
            ) : checkoutOpen ? (
              /* Checkout form */
              <form
                onSubmit={placeOrder}
                className="flex flex-1 flex-col overflow-y-auto"
              >
                <div className="flex-1 space-y-6 p-5 sm:p-7">
                  <div>
                    <h3 className="font-serif text-xl">Customer details</h3>

                    <div className="mt-4 space-y-3">
                      <input
                        name="name"
                        value={form.name}
                        onChange={updateForm}
                        placeholder="Full name"
                        autoComplete="name"
                        required
                        className="w-full rounded-xl border border-[#dfcbb7] bg-[#fffaf3] px-4 py-3 text-sm outline-none transition placeholder:text-[#a18a76] focus:border-[#8b6548]"
                      />

                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={updateForm}
                        placeholder="Phone number"
                        autoComplete="tel"
                        required
                        className="w-full rounded-xl border border-[#dfcbb7] bg-[#fffaf3] px-4 py-3 text-sm outline-none transition placeholder:text-[#a18a76] focus:border-[#8b6548]"
                      />

                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={updateForm}
                        placeholder="Email address"
                        autoComplete="email"
                        required
                        className="w-full rounded-xl border border-[#dfcbb7] bg-[#fffaf3] px-4 py-3 text-sm outline-none transition placeholder:text-[#a18a76] focus:border-[#8b6548]"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl">
                      How would you like your order?
                    </h3>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            fulfilment: "delivery",
                            payment: "cod",
                          }))
                        }
                        className={`rounded-xl border p-3 text-left transition ${
                          form.fulfilment === "delivery"
                            ? "border-[#492b1b] bg-[#f0e2d1]"
                            : "border-[#dfcbb7] bg-[#fffaf3]"
                        }`}
                      >
                        <Truck size={19} />
                        <span className="mt-2 block text-sm font-medium">
                          Delivery
                        </span>
                        <span className="mt-1 block text-xs text-[#856c58]">
                          + Rs. 300
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            fulfilment: "pickup",
                            payment: "cop",
                            address: "",
                          }))
                        }
                        className={`rounded-xl border p-3 text-left transition ${
                          form.fulfilment === "pickup"
                            ? "border-[#492b1b] bg-[#f0e2d1]"
                            : "border-[#dfcbb7] bg-[#fffaf3]"
                        }`}
                      >
                        <Store size={19} />
                        <span className="mt-2 block text-sm font-medium">
                          Pickup
                        </span>
                        <span className="mt-1 block text-xs text-[#856c58]">
                          No delivery fee
                        </span>
                      </button>
                    </div>

                    {form.fulfilment === "delivery" ? (
                      <textarea
                        name="address"
                        value={form.address}
                        onChange={updateForm}
                        placeholder="Complete delivery address in Karachi"
                        autoComplete="street-address"
                        required
                        rows={3}
                        className="mt-3 max-h-32 w-full resize-y overflow-y-auto rounded-xl border border-[#dfcbb7] bg-[#fffaf3] px-4 py-3 text-sm outline-none transition placeholder:text-[#a18a76] focus:border-[#8b6548]"
                      />
                    ) : (
                      <p className="mt-3 rounded-lg bg-[#f0e2d1] p-3 text-xs leading-5 text-[#795f4b]">
                        The pickup location and collection time will need to be
                        confirmed with Tart & Co on WhatsApp.
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-xl">Payment method</h3>

                    <div className="mt-3 space-y-2">
                      {(form.fulfilment === "delivery"
                        ? [
                            ["cod", "Cash on Delivery"],
                            ["bank", "Bank Transfer"],
                          ]
                        : [
                            ["cop", "Cash on Pickup"],
                            ["bank", "Bank Transfer"],
                          ]
                      ).map(([value, label]) => (
                        <label
                          key={value}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition ${
                            form.payment === value
                              ? "border-[#492b1b] bg-[#f0e2d1]"
                              : "border-[#dfcbb7] bg-[#fffaf3]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={value}
                            checked={form.payment === value}
                            onChange={updateForm}
                            className="accent-[#492b1b]"
                          />
                          {label}
                        </label>
                      ))}
                    </div>

                    {form.payment === "bank" && (
                      <p className="mt-2 text-xs leading-5 text-[#856c58]">
                        Confirm bank details and payment instructions directly
                        with Tart & Co before transferring money.
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="order-notes" className="font-serif text-xl">
                      Order notes (optional)
                    </label>

                    <textarea
                      id="order-notes"
                      name="notes"
                      value={form.notes}
                      onChange={updateForm}
                      placeholder="Any special instructions?"
                      rows={2}
                      className="mt-3 max-h-32 w-full resize-y overflow-y-auto rounded-xl border border-[#dfcbb7] bg-[#fffaf3] px-4 py-3 text-sm outline-none transition placeholder:text-[#a18a76] focus:border-[#8b6548]"
                    />
                  </div>

                  {/* Order summary */}
                  <div className="rounded-xl border border-[#e8dccd] bg-[#fffaf3] p-4">
                    <h3 className="font-serif text-lg">Order summary</h3>

                    <div className="mt-3 space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between gap-3 text-sm"
                        >
                          <span className="text-[#795f4b]">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="shrink-0">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-2 border-t border-[#e8dccd] pt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#795f4b]">Subtotal</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-[#795f4b]">Delivery fee</span>
                        <span>
                          {deliveryFee === 0
                            ? "Free"
                            : formatPrice(deliveryFee)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-[#e8dccd] pt-3">
                        <span className="font-medium">Total</span>
                        <span className="font-serif text-xl font-semibold">
                          {formatPrice(grandTotal)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {formError && (
                    <p
                      role="alert"
                      className="rounded-lg bg-red-50 p-3 text-sm text-red-800"
                    >
                      {formError}
                    </p>
                  )}
                </div>

                <div className="sticky bottom-0 border-t border-[#e8dccd] bg-[#fffaf3] p-5 sm:p-7">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#492b1b] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#68432e]"
                  >
                    <MessageCircle size={18} />
                    Place Order
                    <ArrowRight size={16} />
                  </button>

                  <p className="mt-3 text-center text-[10px] leading-4 text-[#856c58]">
                    Your order is not confirmed until Tart & Co confirms it on
                    WhatsApp.
                  </p>
                </div>
              </form>
            ) : (
              <>
                {/* Cart items */}
                <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-[#e8dccd] pb-5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 shrink-0 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-lg">{item.name} Tart</h3>

                        <p className="mt-1 text-xs text-[#856c58]">
                          {item.serves}
                        </p>

                        <p className="mt-2 text-sm font-medium">
                          {formatPrice(item.price)}
                        </p>

                        <div className="mt-2 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              handleAddToCart(item, item.quantity - 1)
                            }
                            aria-label={`Remove one ${item.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dfcbb7]"
                          >
                            −
                          </button>

                          <span className="text-sm">{item.quantity}</span>

                          <button
                            type="button"
                            disabled={item.quantity >= 5}
                            onClick={() =>
                              handleAddToCart(item, item.quantity + 1)
                            }
                            aria-label={`Add one ${item.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dfcbb7] disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <p className="shrink-0 text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#e8dccd] bg-[#fffaf3] p-5 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#795f4b]">Subtotal</span>
                    <span className="font-serif text-xl font-semibold">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-[#856c58]">
                    Delivery charges are calculated at checkout.
                  </p>

                  <button
                    type="button"
                    onClick={startCheckout}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#492b1b] px-5 py-3.5 text-sm text-white transition hover:bg-[#68432e]"
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={scrollToTarts}
                    className="mt-3 w-full py-2 text-sm text-[#795f4b] transition hover:text-[#492b1b]"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
