"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@sanity/client";
import {
  Search,
  MessageCircle,
  ArrowLeft,
  SlidersHorizontal,
  X,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";

type Product = {
  name: string;
  category: string;
  image: string;
  description?: string;
  price?: number;
  showPrice?: boolean;
  featured?: boolean;
};

const fallbackProducts: Product[] = [
  ["Youtheory Collagen Skin, Hair & Nail Formula","Collagen & Beauty","1000342865.jpg"],
  ["Youtheory Men Collagen Advanced Formula","Men’s Wellness","1000342867.jpg"],
  ["Immunboost Kids Multi + Omega-3 Gummies","Kids’ Vitamins","1000342869.jpg"],
  ["3 Ballerina Tea","Herbal Wellness","1000342871.jpg"],
  ["Juliet Eve Women’s Libido Power Booster","Women’s Wellness","1000342874.jpg"],
  ["Duozi Vitamin D3 + K2","Vitamins & Everyday Health","1000342876.jpg"],
  ["Ubiquinol Mega CoQ10 400mg","Vitamins & Everyday Health","1000342878.jpg"],
  ["Medpath Natural Magnesium Glycinate 400mg","Vitamins & Everyday Health","1000342880.jpg"],
  ["Duozi Folic Acid Tablets","Vitamins & Everyday Health","1000342882.jpg"],
  ["Nature’s Cure Vitamin C 500mg","Vitamins & Everyday Health","1000342884.jpg"],
  ["Kids Multi Vitamin Gummies","Kids’ Vitamins","1000342886.jpg"],
  ["Collagen + Glutathione","Collagen & Beauty","1000342888.jpg"],
  ["Daynee Ultra CoQ10 200mg","Vitamins & Everyday Health","1000342890.jpg"],
  ["WinsTown Myo-Inositol & D-Chiro Inositol 40:1","Women’s Wellness","1000342892.jpg"],
  ["Happy Hormones PCOS Multivitamin","Women’s Wellness","1000342894.jpg"],
  ["Duozi Calcium Magnesium Zinc + Vitamin D3","Vitamins & Everyday Health","1000342896.jpg"],
  ["Alaska Deep Sea Fish Oil Omega-3","Vitamins & Everyday Health","1000342898.jpg"],
  ["Breast Tea","Women’s Wellness","1000342900.jpg"],
  ["Vita Optimal Protein Trim","Weight Management","1000342902.jpg"],
  ["Beckon Hip Up Multiple Vitamins","Women’s Wellness","1000342904.jpg"],
  ["Beckon Carrot Oil","Collagen & Beauty","1000342904.jpg"],
  ["Beckon Collagen Essence Hip Up Cream","Collagen & Beauty","1000342904.jpg"],
  ["PureEve Menofix","Women’s Wellness","1000342906.jpg"],
  ["Nature’s Cure Collagen Glowing Powder 200,000mg","Collagen & Beauty","1000342908.jpg"],
  ["Duozi Magnesium Glycinate 500mg","Vitamins & Everyday Health","1000342911.jpg"],
  ["Duozi Super Gluta Glow","Collagen & Beauty","1000342912.jpg"],
  ["Daynee Keto + ACV Weight Loss Gummies","Weight Management","1000342915.jpg"],
  ["Daynee Magnesium Complex Softgels 500mg","Vitamins & Everyday Health","1000342917.jpg"],
  ["Duozi Super Collagen Nourish + Glow","Collagen & Beauty","1000342919.jpg"],
  ["Lennox FirmUp Forte Gold","Collagen & Beauty","1000342921.jpg"],
  ["Duozi Joint Support","Vitamins & Everyday Health","1000342923.jpg"],
  ["Vital Proteins Collagen Peptides","Collagen & Beauty","1000342925.jpg"],
  ["Juliet Eve Hormone Balance + Probiotics","Women’s Wellness","1000342928.jpg"],
  ["Vitabiotics Wellwoman Multi-Vitamin Gummies","Women’s Wellness","1000342931.jpg"],
  ["M&C Marine Collagen+ 5-in-1","Collagen & Beauty","1000342933.jpg"],
  ["Yiyonu Women’s Probiotic Gummies","Women’s Wellness","1000342935.jpg"],
  ["Healthpath Natural Myo-Inositol + D-Chiro Inositol 40:1","Women’s Wellness","1000342937.jpg"],
  ["Juliet Eve Booty Bloom","Women’s Wellness","1000342939.jpg"],
  ["Satin Skinz Pristine White","Collagen & Beauty","1000342942.jpg"],
  ["ONNY Collagen","Collagen & Beauty","1000342944.jpg"],
  ["Duozi Pure Evening Primrose Oil 1000mg","Women’s Wellness","1000342946.jpg"],
  ["Duozi CoQ10 200mg","Vitamins & Everyday Health","1000342948.jpg"],
  ["Duozi Calcium 1200mg + Vitamin D3","Vitamins & Everyday Health","1000342950.jpg"],
  ["Vital Evening Primrose Oil 1300mg","Women’s Wellness","1000342952.jpg"],
  ["Ascorbic Acid (Vitamin C) Tablets","Vitamins & Everyday Health","1000342954.jpg"],
  ["Smokers Detox Herbal Tea","Herbal Wellness","1000342957.jpg"],
  ["Kandal White Doll","Collagen & Beauty","1000342961.jpg"],
  ["ProLife Vitamin C","Vitamins & Everyday Health","1000342963.jpg"],
  ["ProLife Calcium","Vitamins & Everyday Health","1000342963.jpg"],
  ["ProLife Multivitamin + Minerals","Vitamins & Everyday Health","1000342963.jpg"],
  ["ProLife Magnesium","Vitamins & Everyday Health","1000342963.jpg"],
  ["Duozi Multi Collagen","Collagen & Beauty","1000342965.jpg"],
  ["Healthpath Natural Omega-3 Fish Oil 1000mg","Vitamins & Everyday Health","1000342967.jpg"],
  ["Healthpath Natural Vitamin B6 100mg","Vitamins & Everyday Health","1000342969.jpg"],
  ["Hamdard Safi","Herbal Wellness","1000342972.jpg"],
  ["DHA Plus Choline & Inositol","Kids’ Vitamins","1000342974.jpg"],
  ["Healthpath Natural Vitamin E 1000 IU","Vitamins & Everyday Health","1000342976.jpg"],
  ["Glucosamine HCl + MSM 1,500mg","Vitamins & Everyday Health","1000342978.jpg"],
  ["Mason Natural Collagen 1500 + C","Collagen & Beauty","1000342980.jpg"],
  ["Healthpath Evening Primrose Oil 1000mg","Women’s Wellness","1000342982.jpg"],
  ["NeoCell Grassfed Collagen Peptides + Vitamin C & Biotin 6000mg","Collagen & Beauty","1000342987.jpg"],
  ["Eyes Bright Herbal Tea","Herbal Wellness","1000342989.jpg"],
  ["Alpha Arbutin Collagen Peptide Drink 7D","Collagen & Beauty","1000342992.jpg"],
  ["100% Maca Aguaje 5000mg Capsules","Women’s Wellness","1000342994.jpg"],
  ["Gluta Glow Sparkle","Collagen & Beauty","1000342996.jpg"],
  ["Jinja Herbal Extracts","Herbal Wellness","1000343002.jpg"],
  ["X Power Coffee for Men","Men’s Wellness","1000343004.jpg"],
  ["Maximum Kongy Capsule","Men’s Wellness","1000343004.jpg"],
  ["28 Day Slimming Tea","Weight Management","1000343006.jpg"],
  ["Breast Enlargement Gummies","Women’s Wellness","1000343010.jpg"],
  ["Collagen Cranberry Solid Beverage","Collagen & Beauty","1000343014.jpg"],
  ["Genius-10 Kids Gummies","Kids’ Vitamins","1000343016.jpg"],
].map(([name, category, image]) => ({
  name,
  category,
  image: `/catalog/${image}`,
}));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-02-19",
  useCdn: false,
});

const cats = [
  "All",
  "Vitamins & Everyday Health",
  "Collagen & Beauty",
  "Women’s Wellness",
  "Men’s Wellness",
  "Weight Management",
  "Herbal Wellness",
  "Kids’ Vitamins",
];

function Enquire({ name }: { name: string }) {
  const text = encodeURIComponent(
    `Hello Makascare Lifestyle, I’m interested in ${name}. Please can I get the price and more information?`
  );

  return (
    <a
      target="_blank"
      rel="noreferrer"
      className="shop-wa"
      href={`https://wa.me/2348035218130?text=${text}`}
    >
      <MessageCircle size={15} /> Enquire on WhatsApp
    </a>
  );
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("category");

    if (value && cats.includes(value)) {
      setCat(value);
    }
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const sanityProducts = await client.fetch<Product[]>(`
          *[_type == "product" && inStock != false] | order(featured desc, name asc) {
            name,
            category,
            "image": image.asset->url,
            description,
            price,
            showPrice,
            featured
          }
        `);

        if (sanityProducts?.length) {
          setProducts(sanityProducts);
        }
      } catch (error) {
        console.error("Sanity products could not be loaded:", error);
      }
    }

    loadProducts();
  }, []);

  const shown = useMemo(() => {
    const list = products.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        p.name.toLowerCase().includes(q.toLowerCase())
    );

    if (sort === "az") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "za") {
      return [...list].sort((a, b) => b.name.localeCompare(a.name));
    }

    return [...list].sort(
      (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    );
  }, [products, cat, q, sort]);

  return (
    <main className="shop-page">
      <header className="shop-head">
        <div className="container">
          <a href="/" className="back">
            <ArrowLeft size={16} /> Makascare Lifestyle
          </a>

          <div className="shop-title">
            <div>
              <span>THE MAKASCARE COLLECTION</span>
              <h1>
                Find your <em>everyday wellness.</em>
              </h1>
            </div>

            <p>
              Browse our available range, then chat directly with Makascare for
              current pricing and product information.
            </p>
          </div>

          <div className="search-box">
            <Search />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
            />
            <SlidersHorizontal />
          </div>
        </div>
      </header>

      <div className="category-tabs">
        <div className="container tabs-inner">
          {cats.map((c) => (
            <button
              className={cat === c ? "active" : ""}
              onClick={() => setCat(c)}
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <section className="container shop-body">
        <div className="results">
          <span>
            {shown.length} products · {cat}
          </span>

          <label className="sort-control">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="az">Name A–Z</option>
              <option value="za">Name Z–A</option>
            </select>
            <ChevronDown size={13} />
          </label>
        </div>

        <div className="catalog-grid">
          {shown.map((p, i) => (
            <article className="catalog-card" key={p.name}>
              <button
                className="catalog-open"
                onClick={() => setSelected(p)}
                aria-label={`View ${p.name}`}
              >
                <div className="catalog-image">
                  <Image
                    src={p.image}
                    fill
                    sizes="(max-width:700px) 50vw, 280px"
                    alt={p.name}
                  />
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <i>
                    Quick view <ArrowUpRight size={13} />
                  </i>
                </div>

                <div className="catalog-copy">
                  <small>{p.category}</small>
                  <h2>{p.name}</h2>

                  <p>
                    {p.description ||
                      "Available from Makascare Lifestyle. Contact us for current price, availability and product information."}
                  </p>

                  {p.showPrice && typeof p.price === "number" && (
                    <strong>₦{p.price.toLocaleString()}</strong>
                  )}
                </div>
              </button>

              <div className="catalog-action">
                <Enquire name={p.name} />
              </div>
            </article>
          ))}
        </div>

        {!shown.length && (
          <div className="empty">
            No products found. Try another search or category.
          </div>
        )}
      </section>

      <section className="shop-cta">
        <div className="container">
          <span>NEED A LITTLE HELP?</span>
          <h2>Not sure what you’re looking for?</h2>
          <p>
            Chat directly with Makascare and tell us what you’d like to browse.
          </p>

          <a
            className="shop-wa light"
            href="https://wa.me/2348035218130"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} /> Start a WhatsApp chat
          </a>
        </div>
      </section>

      {selected && (
        <div
          className="product-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selected.name}
          onMouseDown={(e) => {
            if (e.currentTarget === e.target) setSelected(null);
          }}
        >
          <div className="product-sheet">
            <button
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close product details"
            >
              <X />
            </button>

            <div className="modal-image">
              <Image
                src={selected.image}
                fill
                sizes="(max-width:800px) 100vw, 560px"
                alt={selected.name}
              />
            </div>

            <div className="modal-copy">
              <span className="modal-category">{selected.category}</span>

              <h2>{selected.name}</h2>

              <div className="price-pill">
                {selected.showPrice && typeof selected.price === "number"
                  ? `₦${selected.price.toLocaleString()}`
                  : "Enquire for current price"}
              </div>

              <p>
                {selected.description ||
                  "Available from Makascare Lifestyle. Chat with us for current availability, pack information and guidance on the product label."}
              </p>

              <div className="info-box">
                <strong>Before using any supplement</strong>
                <span>
                  Read the product label and directions carefully. If you are
                  pregnant, breastfeeding, taking medication or managing a
                  health condition, speak with an appropriate healthcare
                  professional before use.
                </span>
              </div>

              <Enquire name={selected.name} />

              <button
                className="continue"
                onClick={() => setSelected(null)}
              >
                Continue browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
      }["Duozi Joint Support","Vitamins & Everyday Health","1000342923.jpg"],
["Vital Proteins Collagen Peptides","Collagen & Beauty","1000342925.jpg"],
["Juliet Eve Hormone Balance + Probiotics","Women’s Wellness","1000342928.jpg"],
["Vitabiotics Wellwoman Multi-Vitamin Gummies","Women’s Wellness","1000342931.jpg"],
["M&C Marine Collagen+ 5-in-1","Collagen & Beauty","1000342933.jpg"],
["Yiyonu Women’s Probiotic Gummies","Women’s Wellness","1000342935.jpg"],
["Healthpath Natural Myo-Inositol + D-Chiro Inositol 40:1","Women’s Wellness","1000342937.jpg"],
["Juliet Eve Booty Bloom","Women’s Wellness","1000342939.jpg"],
["Satin Skinz Pristine White","Collagen & Beauty","1000342942.jpg"],
["ONNY Collagen","Collagen & Beauty","1000342944.jpg"],
["Duozi Pure Evening Primrose Oil 1000mg","Women’s Wellness","1000342946.jpg"],
["Duozi CoQ10 200mg","Vitamins & Everyday Health","1000342948.jpg"],
["Duozi Calcium 1200mg + Vitamin D3","Vitamins & Everyday Health","1000342950.jpg"],
["Vital Evening Primrose Oil 1300mg","Women’s Wellness","1000342952.jpg"],
["Ascorbic Acid (Vitamin C) Tablets","Vitamins & Everyday Health","1000342954.jpg"],
["Smokers Detox Herbal Tea","Herbal Wellness","1000342957.jpg"],
["Kandal White Doll","Collagen & Beauty","1000342961.jpg"],
["ProLife Vitamin C","Vitamins & Everyday Health","1000342963.jpg"],
["ProLife Calcium","Vitamins & Everyday Health","1000342963.jpg"],
["ProLife Multivitamin + Minerals","Vitamins & Everyday Health","1000342963.jpg"],
["ProLife Magnesium","Vitamins & Everyday Health","1000342963.jpg"],
["Duozi Multi Collagen","Collagen & Beauty","1000342965.jpg"],
["Healthpath Natural Omega-3 Fish Oil 1000mg","Vitamins & Everyday Health","1000342967.jpg"],
["Healthpath Natural Vitamin B6 100mg","Vitamins & Everyday Health","1000342969.jpg"],
["Hamdard Safi","Herbal Wellness","1000342972.jpg"],
["DHA Plus Choline & Inositol","Kids’ Vitamins","1000342974.jpg"],
["Healthpath Natural Vitamin E 1000 IU","Vitamins & Everyday Health","1000342976.jpg"],
["Glucosamine HCl + MSM 1,500mg","Vitamins & Everyday Health","1000342978.jpg"],
["Mason Natural Collagen 1500 + C","Collagen & Beauty","1000342980.jpg"],
["Healthpath Evening Primrose Oil 1000mg","Women’s Wellness","1000342982.jpg"],
["NeoCell Grassfed Collagen Peptides + Vitamin C & Biotin 6000mg","Collagen & Beauty","1000342987.jpg"],
["Eyes Bright Herbal Tea","Herbal Wellness","1000342989.jpg"],
["Alpha Arbutin Collagen Peptide Drink 7D","Collagen & Beauty","1000342992.jpg"],
["100% Maca Aguaje 5000mg Capsules","Women’s Wellness","1000342994.jpg"],
["Gluta Glow Sparkle","Collagen & Beauty","1000342996.jpg"],
["Jinja Herbal Extracts","Herbal Wellness","1000343002.jpg"],
["X Power Coffee for Men","Men’s Wellness","1000343004.jpg"],
["Maximum Kongy Capsule","Men’s Wellness","1000343004.jpg"],
["28 Day Slimming Tea","Weight Management","1000343006.jpg"],
["Breast Enlargement Gummies","Women’s Wellness","1000343010.jpg"],
["Collagen Cranberry Solid Beverage","Collagen & Beauty","1000343014.jpg"],
["Genius-10 Kids Gummies","Kids’ Vitamins","1000343016.jpg"],
].map(([name,category,image])=>({name,category,image:`/catalog/${image}`}));
const cats=["All","Vitamins & Everyday Health","Collagen & Beauty","Women’s Wellness","Men’s Wellness","Weight Management","Herbal Wellness","Kids’ Vitamins"];
function Enquire({name}:{name:string}){const text=encodeURIComponent(`Hello Makascare Lifestyle, I’m interested in ${name}. Please can I get the price and more information?`);return <a target="_blank" rel="noreferrer" className="shop-wa" href={`https://wa.me/2348035218130?text=${text}`}><MessageCircle size={15}/> Enquire on WhatsApp</a>}
export default function Shop(){
 const [cat,setCat]=useState("All");const [q,setQ]=useState("");const [selected,setSelected]=useState<(typeof products)[number]|null>(null);const [sort,setSort]=useState("featured");
 useEffect(()=>{const value=new URLSearchParams(window.location.search).get("category");if(value&&cats.includes(value))setCat(value)},[]);
 const shown=useMemo(()=>{const list=products.filter(p=>(cat==="All"||p.category===cat)&&p.name.toLowerCase().includes(q.toLowerCase()));return sort==="az"?[...list].sort((a,b)=>a.name.localeCompare(b.name)):sort==="za"?[...list].sort((a,b)=>b.name.localeCompare(a.name)):list},[cat,q,sort]);
 return <main className="shop-page"><header className="shop-head"><div className="container"><a href="/" className="back"><ArrowLeft size={16}/> Makascare Lifestyle</a><div className="shop-title"><div><span>THE MAKASCARE COLLECTION</span><h1>Find your <em>everyday wellness.</em></h1></div><p>Browse our available range, then chat directly with Makascare for current pricing and product information.</p></div><div className="search-box"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products…"/><SlidersHorizontal/></div></div></header><div className="category-tabs"><div className="container tabs-inner">{cats.map(c=><button className={cat===c?"active":""} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div></div><section className="container shop-body"><div className="results"><span>{shown.length} products · {cat}</span><label className="sort-control">Sort <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="az">Name A–Z</option><option value="za">Name Z–A</option></select><ChevronDown size={13}/></label></div><div className="catalog-grid">{shown.map((p,i)=><article className="catalog-card" key={p.name}><button className="catalog-open" onClick={()=>setSelected(p)} aria-label={`View ${p.name}`}><div className="catalog-image"><Image src={p.image} fill sizes="(max-width:700px) 50vw, 280px" alt={p.name}/><span>{String(i+1).padStart(2,"0")}</span><i>Quick view <ArrowUpRight size={13}/></i></div><div className="catalog-copy"><small>{p.category}</small><h2>{p.name}</h2><p>Available from Makascare Lifestyle. Contact us for current price, availability and product information.</p></div></button><div className="catalog-action"><Enquire name={p.name}/></div></article>)}</div>{!shown.length&&<div className="empty">No products found. Try another search or category.</div>}</section><section className="shop-cta"><div className="container"><span>NEED A LITTLE HELP?</span><h2>Not sure what you’re looking for?</h2><p>Chat directly with Makascare and tell us what you’d like to browse.</p><a className="shop-wa light" href="https://wa.me/2348035218130" target="_blank" rel="noreferrer"><MessageCircle size={16}/> Start a WhatsApp chat</a></div></section>
 {selected&&<div className="product-modal" role="dialog" aria-modal="true" aria-label={selected.name} onMouseDown={e=>{if(e.currentTarget===e.target)setSelected(null)}}><div className="product-sheet"><button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close product details"><X/></button><div className="modal-image"><Image src={selected.image} fill sizes="(max-width:800px) 100vw, 560px" alt={selected.name}/></div><div className="modal-copy"><span className="modal-category">{selected.category}</span><h2>{selected.name}</h2><div className="price-pill">Enquire for current price</div><p>Available from Makascare Lifestyle. Chat with us for current availability, pack information and guidance on the product label.</p><div className="info-box"><strong>Before using any supplement</strong><span>Read the product label and directions carefully. If you are pregnant, breastfeeding, taking medication or managing a health condition, speak with an appropriate healthcare professional before use.</span></div><Enquire name={selected.name}/><button className="continue" onClick={()=>setSelected(null)}>Continue browsing</button></div></div></div>}
 </main>}
