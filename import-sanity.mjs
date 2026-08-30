import fs from "fs";
import path from "path";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_TOKEN");

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-02-19",
  useCdn: false,
});

const products = [
  ["product-001","Youtheory Collagen Skin, Hair & Nail Formula","Collagen & Beauty","1000342865.jpg",true],
  ["product-002","Youtheory Men Collagen Advanced Formula","Men’s Wellness","1000342867.jpg",false],
  ["product-003","Immunboost Kids Multi + Omega-3 Gummies","Kids’ Vitamins","1000342869.jpg",true],
  ["product-004","3 Ballerina Tea","Herbal Wellness","1000342871.jpg",false],
  ["product-005","Juliet Eve Women’s Libido Power Booster","Women’s Wellness","1000342874.jpg",false],
  ["product-006","Duozi Vitamin D3 + K2","Vitamins & Everyday Health","1000342876.jpg",false],
  ["product-007","Ubiquinol Mega CoQ10 400mg","Vitamins & Everyday Health","1000342878.jpg",false],
  ["product-008","Medpath Natural Magnesium Glycinate 400mg","Vitamins & Everyday Health","1000342880.jpg",true],
  ["product-009","Duozi Folic Acid Tablets","Vitamins & Everyday Health","1000342882.jpg",false],
  ["product-010","Nature’s Cure Vitamin C 500mg","Vitamins & Everyday Health","1000342884.jpg",false],
  ["product-011","Kids Multi Vitamin Gummies","Kids’ Vitamins","1000342886.jpg",false],
  ["product-012","Collagen + Glutathione","Collagen & Beauty","1000342888.jpg",false],
  ["product-013","Daynee Ultra CoQ10 200mg","Vitamins & Everyday Health","1000342890.jpg",false],
  ["product-014","WinsTown Myo-Inositol & D-Chiro Inositol 40:1","Women’s Wellness","1000342892.jpg",false],
  ["product-015","Happy Hormones PCOS Multivitamin","Women’s Wellness","1000342894.jpg",false],
  ["product-016","Duozi Calcium Magnesium Zinc + Vitamin D3","Vitamins & Everyday Health","1000342896.jpg",false],
  ["product-017","Alaska Deep Sea Fish Oil Omega-3","Vitamins & Everyday Health","1000342898.jpg",false],
  ["product-018","Breast Tea","Women’s Wellness","1000342900.jpg",false],
  ["product-019","Vita Optimal Protein Trim","Weight Management","1000342902.jpg",false],
  ["product-020","Beckon Hip Up Multiple Vitamins","Women’s Wellness","1000342904.jpg",false],
  ["product-021","Beckon Carrot Oil","Collagen & Beauty","1000342904.jpg",false],
  ["product-022","Beckon Collagen Essence Hip Up Cream","Collagen & Beauty","1000342904.jpg",false],
  ["product-023","PureEve Menofix","Women’s Wellness","1000342906.jpg",false],
  ["product-024","Nature’s Cure Collagen Glowing Powder 200,000mg","Collagen & Beauty","1000342908.jpg",false],
  ["product-025","Duozi Magnesium Glycinate 500mg","Vitamins & Everyday Health","1000342911.jpg",false],
  ["product-026","Duozi Super Gluta Glow","Collagen & Beauty","1000342912.jpg",false],
  ["product-027","Daynee Keto + ACV Weight Loss Gummies","Weight Management","1000342915.jpg",false],
  ["product-028","Daynee Magnesium Complex Softgels 500mg","Vitamins & Everyday Health","1000342917.jpg",false],
  ["product-029","Duozi Super Collagen Nourish + Glow","Collagen & Beauty","1000342919.jpg",false],
  ["product-030","Lennox FirmUp Forte Gold","Collagen & Beauty","1000342921.jpg",false],
  ["product-031","Duozi Joint Support","Vitamins & Everyday Health","1000342923.jpg",false],
  ["product-032","Vital Proteins Collagen Peptides","Collagen & Beauty","1000342925.jpg",true],
  ["product-033","Juliet Eve Hormone Balance + Probiotics","Women’s Wellness","1000342928.jpg",false],
  ["product-034","Vitabiotics Wellwoman Multi-Vitamin Gummies","Women’s Wellness","1000342931.jpg",true],
  ["product-035","M&C Marine Collagen+ 5-in-1","Collagen & Beauty","1000342933.jpg",false],
  ["product-036","Yiyonu Women’s Probiotic Gummies","Women’s Wellness","1000342935.jpg",false],
  ["product-037","Healthpath Natural Myo-Inositol + D-Chiro Inositol 40:1","Women’s Wellness","1000342937.jpg",false],
  ["product-038","Juliet Eve Booty Bloom","Women’s Wellness","1000342939.jpg",false],
  ["product-039","Satin Skinz Pristine White","Collagen & Beauty","1000342942.jpg",false],
  ["product-040","ONNY Collagen","Collagen & Beauty","1000342944.jpg",false],
  ["product-041","Duozi Pure Evening Primrose Oil 1000mg","Women’s Wellness","1000342946.jpg",false],
  ["product-042","Duozi CoQ10 200mg","Vitamins & Everyday Health","1000342948.jpg",false],
  ["product-043","Duozi Calcium 1200mg + Vitamin D3","Vitamins & Everyday Health","1000342950.jpg",false],
  ["product-044","Vital Evening Primrose Oil 1300mg","Women’s Wellness","1000342952.jpg",false],
  ["product-045","Ascorbic Acid (Vitamin C) Tablets","Vitamins & Everyday Health","1000342954.jpg",false],
  ["product-046","Smokers Detox Herbal Tea","Herbal Wellness","1000342957.jpg",false],
  ["product-047","Kandal White Doll","Collagen & Beauty","1000342961.jpg",false],
  ["product-048","ProLife Vitamin C","Vitamins & Everyday Health","1000342963.jpg",false],
  ["product-049","ProLife Calcium","Vitamins & Everyday Health","1000342963.jpg",false],
  ["product-050","ProLife Multivitamin + Minerals","Vitamins & Everyday Health","1000342963.jpg",false],
  ["product-051","ProLife Magnesium","Vitamins & Everyday Health","1000342963.jpg",false],
  ["product-052","Duozi Multi Collagen","Collagen & Beauty","1000342965.jpg",false],
  ["product-053","Healthpath Natural Omega-3 Fish Oil 1000mg","Vitamins & Everyday Health","1000342967.jpg",false],
  ["product-054","Healthpath Natural Vitamin B6 100mg","Vitamins & Everyday Health","1000342969.jpg",false],
  ["product-055","Hamdard Safi","Herbal Wellness","1000342972.jpg",false],
  ["product-056","DHA Plus Choline & Inositol","Kids’ Vitamins","1000342974.jpg",false],
  ["product-057","Healthpath Natural Vitamin E 1000 IU","Vitamins & Everyday Health","1000342976.jpg",false],
  ["product-058","Glucosamine HCl + MSM 1,500mg","Vitamins & Everyday Health","1000342978.jpg",false],
  ["product-059","Mason Natural Collagen 1500 + C","Collagen & Beauty","1000342980.jpg",false],
  ["product-060","Healthpath Evening Primrose Oil 1000mg","Women’s Wellness","1000342982.jpg",false],
  ["product-061","NeoCell Grassfed Collagen Peptides + Vitamin C & Biotin 6000mg","Collagen & Beauty","1000342987.jpg",true],
  ["product-062","Eyes Bright Herbal Tea","Herbal Wellness","1000342989.jpg",false],
  ["product-063","Alpha Arbutin Collagen Peptide Drink 7D","Collagen & Beauty","1000342992.jpg",false],
  ["product-064","100% Maca Aguaje 5000mg Capsules","Women’s Wellness","1000342994.jpg",false],
  ["product-065","Gluta Glow Sparkle","Collagen & Beauty","1000342996.jpg",false],
  ["product-066","Jinja Herbal Extracts","Herbal Wellness","1000343002.jpg",false],
  ["product-067","X Power Coffee for Men","Men’s Wellness","1000343004.jpg",false],
  ["product-068","Maximum Kongy Capsule","Men’s Wellness","1000343004.jpg",false],
  ["product-069","28 Day Slimming Tea","Weight Management","1000343006.jpg",false],
  ["product-070","Breast Enlargement Gummies","Women’s Wellness","1000343010.jpg",false],
  ["product-071","Collagen Cranberry Solid Beverage","Collagen & Beauty","1000343014.jpg",false],
  ["product-072","Genius-10 Kids Gummies","Kids’ Vitamins","1000343016.jpg",false],
];

const imageCache = new Map();

for (const [id, name, category, filename, featured] of products) {
  const existing = await client.getDocument(id);

  if (existing) {
    console.log(`Skipping existing: ${name}`);
    continue;
  }

  let assetRef = imageCache.get(filename);

  if (!assetRef) {
    const imagePath = path.join(
      process.cwd(),
      "public",
      "catalog",
      filename
    );

    if (!fs.existsSync(imagePath)) {
      throw new Error(`Missing product image: ${filename}`);
    }

    const asset = await client.assets.upload(
      "image",
      fs.createReadStream(imagePath),
      { filename }
    );

    assetRef = asset._id;
    imageCache.set(filename, assetRef);
  }

  await client.create({
    _id: id,
    _type: "product",
    name,
    category,
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: assetRef,
      },
    },
    showPrice: false,
    inStock: true,
    featured,
  });

  console.log(`Imported: ${name}`);
}

console.log("Makascare Sanity product import complete.");
