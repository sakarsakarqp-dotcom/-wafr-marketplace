TypeScript
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  UserRound,
  Menu,
  Package,
  Smartphone,
  Shirt,
  House,
  Sparkles,
  Dumbbell,
  BookOpen,
  Car,
  Monitor,
  ShoppingBasket,
  ArrowLeft,
  Star,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  emoji: string;
  color: string;
  rating: number;
  description: string;
};

const categories = [
  { name: "كل المنتجات", icon: ShoppingBasket },
  { name: "الإلكترونيات", icon: Smartphone },
  { name: "الأزياء", icon: Shirt },
  { name: "المنزل", icon: House },
  { name: "الجمال", icon: Sparkles },
  { name: "الرياضة", icon: Dumbbell },
  { name: "الكتب", icon: BookOpen },
  { name: "السيارات", icon: Car },
  { name: "الحواسيب", icon: Monitor },
  { name: "مستلزمات يومية", icon: Package },
];

const products: Product[] = [
  {
    id: 1,
    name: "سماعات لاسلكية عصرية",
    category: "الإلكترونيات",
    price: 24.99,
    oldPrice: 35,
    emoji: "🎧",
    color: "#e0e7ff",
    rating: 4.8,
    description: "سماعات لاسلكية للاستخدام اليومي مع تصميم مريح.",
  },
  {
    id: 2,
    name: "حقيبة يومية أنيقة",
    category: "الأزياء",
    price: 32.5,
    emoji: "👜",
    color: "#fce7f3",
    rating: 4.7,
    description: "حقيبة عملية بتصميم بسيط يناسب الاستخدام اليومي.",
  },
  {
    id: 3,
    name: "مصباح ديكور منزلي",
    category: "المنزل",
    price: 18.75,
    oldPrice: 25,
    emoji: "💡",
    color: "#fef3c7",
    rating: 4.6,
    description: "مصباح أنيق لإضافة لمسة مميزة إلى غرفتك.",
  },
  {
    id: 4,
    name: "ساعة يد كلاسيكية",
    category: "الإلكترونيات",
    price: 45,
    emoji: "⌚",
    color: "#dcfce7",
    rating: 4.9,
    description: "ساعة بتصميم كلاسيكي مناسب لمختلف المناسبات.",
  },
  {
    id: 5,
    name: "حذاء رياضي مريح",
    category: "الرياضة",
    price: 39.9,
    oldPrice: 49.9,
    emoji: "👟",
    color: "#ffedd5",
    rating: 4.8,
    description: "حذاء مريح للمشي والأنشطة اليومية.",
  },
  {
    id: 6,
    name: "مجموعة عناية شخصية",
    category: "الجمال",
    price: 21.5,
    emoji: "🧴",
    color: "#f3e8ff",
    rating: 4.5,
    description: "مجموعة منتجات عناية للاستخدام الشخصي.",
  },
  {
    id: 7,
    name: "دفتر ملاحظات فاخر",
    category: "الكتب",
    price: 8.5,
    emoji: "📓",
    color: "#e0f2fe",
    rating: 4.7,
    description: "دفتر لتدوين الملاحظات والأفكار وتنظيم العمل.",
  },
  {
    id: 8,
    name: "إكسسوارات سيارة",
    category: "السيارات",
    price: 14.25,
    emoji: "🚘",
    color: "#f1f5f9",
    rating: 4.4,
    description: "إكسسوارات عملية للاستخدام داخل السيارة.",
  },
  {
    id: 9,
    name: "لوحة مفاتيح للحاسوب",
    category: "الحواسيب",
    price: 27.5,
    oldPrice: 34,
    emoji: "⌨️",
    color: "#ccfbf1",
    rating: 4.6,
    description: "لوحة مفاتيح للاستخدام المكتبي والدراسة.",
  },
  {
    id: 10,
    name: "كوب حراري للسفر",
    category: "مستلزمات يومية",
    price: 12.9,
    emoji: "☕",
    color: "#fee2e2",
    rating: 4.8,
    description: "كوب عملي للمشروبات أثناء التنقل.",
  },
  {
    id: 11,
    name: "نظارة شمسية عصرية",
    category: "الأزياء",
    price: 19.9,
    emoji: "🕶️",
    color: "#ede9fe",
    rating: 4.5,
    description: "نظارة بتصميم عصري يناسب الإطلالات اليومية.",
  },
  {
    id: 12,
    name: "سلة تنظيم منزلية",
    category: "المنزل",
    price: 11.75,
    emoji: "🧺",
    color: "#fef9c3",
    rating: 4.6,
    description: "سلة للمساعدة على ترتيب الأغراض المنزلية.",
  },
];

const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("كل المنتجات");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "كل المنتجات" || product.category === category;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      const matchesFavorites = !showFavorites || favorites.includes(product.id);

      return matchesCategory && matchesSearch && matchesFavorites;
    });
  }, [search, category, showFavorites, favorites]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const cartTotal = products.reduce(
    (total, product) => total + product.price * (cart[product.id] || 0),
    0,
  );

  function changeQuantity(id: number, amount: number) {
    setCart((previous) => {
      const next = { ...previous };
      const quantity = (next[id] || 0) + amount;

      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }

      return next;
    });
  }

  function toggleFavorite(id: number) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  }

  function chooseCategory(name: string) {
    setCategory(name);
    setShowFavorites(false);
    setMobileMenu(false);
  }

  return (
    <main className="min-h-screen">
      <div className="bg-emerald-950 px-4 py-2 text-center text-sm text-white">
        تسوّق أذكى مع وَفْر — خيارات أكثر في مكان واحد
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
          <button
            className="rounded-xl p-2 hover:bg-slate-100 md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="فتح القائمة"
          >
            <Menu size={23} />
          </button>

          <button
            onClick={() => {
              chooseCategory("كل المنتجات");
              setSearch("");
              setShowFavorites(false);
            }}
            className="shrink-0 text-right"
          >
            <span className="block text-3xl font-black tracking-tight text-emerald-700">
              وَفْر<span className="text-amber-500">.</span>
            </span>
            <span className="text-xs text-slate-500">
              سوق واحد، خيارات بلا حدود
            </span>
          </button>

          <div className="mx-auto hidden max-w-xl flex-1 md:block">
            <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 focus-within:border-emerald-500">
              <Search size={20} className="text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ابحث عن منتج أو فئة..."
                className="w-full bg-transparent px-3 py-3 outline-none"
              />
            </div>
          </div>

          <div className="mr-auto flex items-center gap-2 md:mr-0">
            <button
              onClick={() => {
                setShowFavorites(!showFavorites);
                setShowCart(false);
              }}
              className="relative rounded-xl p-3 hover:bg-rose-50"
              aria-label="المفضلة"
              title="المفضلة"
            >
              <Heart
                size={22}
                className={
                  showFavorites || favorites.length
                    ? "text-rose-500"
                    : "text-slate-600"
                }
                fill={showFavorites ? "currentColor" : "none"}
              />
              {favorites.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] text-white">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setShowCart(!showCart);
                setShowFavorites(false);
              }}
              className="relative rounded-xl bg-emerald-700 p-3 text-white hover:bg-emerald-800"
              aria-label="سلة المشتريات"
              title="سلة المشتريات"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-xs font-bold text-slate-900">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-3 md:hidden">
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
            <Search size={19} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث عن منتج أو فئة..."
              className="w-full bg-transparent px-3 py-3 outline-none"
            />
          </div>
        </div>

        <nav
          className={`mx-auto max-w-7xl flex-wrap gap-2 px-4 pb-3 ${
            mobileMenu ? "flex" : "hidden md:flex"
          }`}
        >
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => chooseCategory(item.name)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                  category === item.name && !showFavorites
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-emerald-50"
                }`}
              >
                <Icon size={16} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-l from-emerald-950 via-emerald-800 to-teal-700 px-6 py-12 text-white md:px-12 md:py-16">
          <div className="absolute -left-10 -top-16 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-emerald-300/10" />

          <div className="relative max-w-2xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              <Sparkles size={17} className="text-amber-300" />
              تجربة تسوق مختلفة
            </span>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              كل ما تبحث عنه،
              <br />
              <span className="text-amber-300">في مكان واحد.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-emerald-50 md:text-lg">
              اكتشف مجموعة متنوعة من المنتجات، وابحث بسهولة، واجمع اختياراتك
              المفضلة في تجربة تسوق بسيطة.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              اكتشف المنتجات
              <ArrowLeft size={19} />
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold text-emerald-700">
              تسوّق حسب احتياجك
            </p>
            <h2 className="text-2xl font-black text-slate-900">
              اكتشف الأقسام
            </h2>
          </div>
          <span className="text-sm text-slate-500">
            {categories.length} أقسام
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => chooseCategory(item.name)}
                className={`group flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50 ${
                  category === item.name && !showFavorites
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-100 bg-white"
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    index % 3 === 0
                      ? "bg-emerald-100 text-emerald-700"
                      : index % 3 === 1
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                  }`}
                >
                  <Icon size={23} />
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section id="products" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold text-emerald-700">
              {showFavorites ? "اختياراتك الخاصة" : "اختيارات متنوعة"}
            </p>
            <h2 className="text-2xl font-black text-slate-900">
              {showFavorites
                ? "المنتجات المفضلة"
                : category === "كل المنتجات"
                  ? "منتجات مقترحة"
                  : category}
            </h2>
          </div>

          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            {filteredProducts.length} منتج
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Package size={42} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-lg font-bold">ما لقينا نتائج</h3>
            <p className="mt-2 text-sm text-slate-500">
              جرّب كلمة بحث أخرى أو اختر قسمًا مختلفًا.
            </p>
            <button
              onClick={() => {
                setSearch("");
                chooseCategory("كل المنتجات");
                setShowFavorites(false);
              }}
              className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 text-white"
            >
              عرض كل المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="relative flex h-36 items-center justify-center sm:h-48"
                  style={{ backgroundColor: product.color }}
                >
                  <span className="text-6xl transition duration-300 group-hover:scale-110 sm:text-7xl">
                    {product.emoji}
                  </span>

                  {product.oldPrice && (
                    <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-2 py-1 text-[10px] font-bold text-white">
                      عرض
                    </span>
                  )}

                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-rose-500 shadow-sm transition hover:bg-white"
                    aria-label="إضافة إلى المفضلة"
                  >
                    <Heart
                      size={18}
                      fill={
                        favorites.includes(product.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>

                <div className="p-3 sm:p-4">
                  <p className="text-xs text-emerald-700">
                    {product.category}
                  </p>
                  <h3 className="mt-2 min-h-10 text-sm font-bold leading-6 text-slate-800">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1 text-xs text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-slate-400">تقييم تجريبي</span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-lg font-black text-slate-900">
                      {money(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {money(product.oldPrice)}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                    {product.description}
                  </p>

                  <button
                    onClick={() => changeQuantity(product.id, 1)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                  >
                    <Plus size={17} />
                    أضف إلى السلة
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-3xl font-black text-emerald-400">
              وَفْر.
            </span>
            <p className="mt-2 text-sm text-slate-400">
              سوق واحد، خيارات بلا حدود.
            </p>
          </div>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} وَفْر — جميع الحقوق محفوظة
          </p>
        </div>
      </footer>

      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40">
          <button
            className="absolute inset-0 cursor-default"
            onClick={() => setShowCart(false)}
            aria-label="إغلاق السلة"
          />

          <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-xl font-black">سلة المشتريات</h2>
              <button
                onClick={() => setShowCart(false)}
                className="rounded-lg px-3 py-2 hover:bg-slate-100"
              >
                إغلاق
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {products.filter((product) => cart[product.id]).length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingCart
                    size={42}
                    className="mx-auto text-slate-300"
                  />
                  <p className="mt-4 font-bold">السلة فارغة</p>
                  <p className="mt-2 text-sm text-slate-500">
                    أضف المنتجات التي تعجبك لتظهر هنا.
                  </p>
                </div>
              ) : (
                products
                  .filter((product) => cart[product.id])
                  .map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3"
                    >
                      <div
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl"
                        style={{ backgroundColor: product.color }}
                      >
                        {product.emoji}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-bold">{product.name}</p>
                        <p className="mt-1 text-sm text-emerald-700">
                          {money(product.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => changeQuantity(product.id, -1)}
                            className="rounded-lg border p-1"
                            aria-label="تقليل الكمية"
                          >
                            <Minus size={15} />
                          </button>
                          <span className="text-sm font-bold">
                            {cart[product.id]}
                          </span>
                          <button
                            onClick={() => changeQuantity(product.id, 1)}
                            className="rounded-lg border p-1"
                            aria-label="زيادة الكمية"
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setCart((previous) => {
                            const next = { ...previous };
                            delete next[product.id];
                            return next;
                          })
                        }
                        className="rounded-lg p-2 text-rose-500 hover:bg-rose-50"
                        aria-label="حذف المنتج"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
              )}
            </div>

            <div className="border-t p-5">
              <div className="mb-4 flex justify-between">
                <span className="text-slate-600">المجموع التقديري</span>
                <span className="text-xl font-black">
                  {money(cartTotal)}
                </span>
              </div>
              <button
                disabled={cartCount === 0}
                onClick={() =>
                  alert(
                    "هذه نسخة أولية للواجهة. إتمام الطلب يحتاج ربط قاعدة البيانات وخدمة الطلبات والدفع.",
                  )
                }
                className="w-full rounded-xl bg-emerald-700 px-4 py-4 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                متابعة الطلب
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                الأسعار المعروضة تجريبية، والدفع وإتمام الطلب غير مفعّلين بعد.
              </p>
            </div>
          </aside>
        </div>
      )}

      <button
        onClick={() => {
          setShowCart(true);
          setShowFavorites(false);
        }}
        className="fixed bottom-5 left-5 z-20 flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-4 font-bold text-white shadow-xl md:hidden"
      >
        <ShoppingCart size={20} />
        السلة ({cartCount})
      </button>

      <div className="sr-only">
        <UserRound aria-hidden="true" />
      </div>
    </main>
  );
    }
