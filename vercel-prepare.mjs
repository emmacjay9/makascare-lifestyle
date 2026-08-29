import fs from 'fs';
import path from 'path';

const root = process.cwd();
const ensure = p => fs.mkdirSync(path.join(root,p), {recursive:true});
const copy = (src,dst) => {
  const s = path.join(root,src), d = path.join(root,dst);
  if (!fs.existsSync(s)) throw new Error(`Missing required file: ${src}`);
  ensure(path.dirname(dst));
  fs.copyFileSync(s,d);
};

ensure('app/shop');
ensure('app/privacy');
ensure('app/terms');
ensure('components');
ensure('public/products');
ensure('public/catalog');

copy('MakascareHome.tsx','components/MakascareHome.tsx');
copy('Shop.tsx','components/Shop.tsx');
copy('globals.css','app/globals.css');
copy('layout.tsx','app/layout.tsx');

fs.writeFileSync(path.join(root,'app/page.tsx'), `import MakascareHome from "@/components/MakascareHome";\nexport default function Home() { return <MakascareHome />; }\n`);
fs.writeFileSync(path.join(root,'app/shop/page.tsx'), `import Shop from "../../components/Shop";\nexport default function Page(){return <Shop/>}\n`);
fs.writeFileSync(path.join(root,'app/privacy/page.tsx'), `export const metadata = { title: "Privacy | Makascare Lifestyle" };\nexport default function Privacy(){return <main className="legal-page"><div className="legal-wrap"><a href="/">← Makascare Lifestyle</a><p className="legal-kicker">PRIVACY</p><h1>Privacy notice</h1><p>Makascare Lifestyle uses this website to showcase products and help customers contact the business. We do not ask you to create an account or enter payment details on this website.</p><h2>WhatsApp and social media</h2><p>If you choose to contact Makascare through WhatsApp, Facebook or TikTok, the information you share is handled through those services and may also be used by Makascare to respond to your enquiry and fulfil your order.</p><h2>Information you choose to share</h2><p>Please only provide information needed for your enquiry or order. Do not send sensitive medical information through the website.</p><h2>Website data</h2><p>The site may be hosted by a third-party provider that processes basic technical information needed to deliver the website securely. If analytics or additional tracking tools are added later, this notice should be updated before they are enabled.</p><h2>Contact</h2><p>Questions about this notice can be sent through the contact links on the website.</p><p className="legal-note">This is a simple website privacy notice for the current catalogue-and-enquiry setup and should be reviewed if the business adds checkout, accounts, email marketing or analytics.</p></div></main>}\n`);
fs.writeFileSync(path.join(root,'app/terms/page.tsx'), `export const metadata = { title: "Terms & Product Information | Makascare Lifestyle" };\nexport default function Terms(){return <main className="legal-page"><div className="legal-wrap"><a href="/">← Makascare Lifestyle</a><p className="legal-kicker">TERMS & PRODUCT INFORMATION</p><h1>Important information</h1><p>Makascare Lifestyle is a catalogue and enquiry website. Product availability, prices, delivery charges and order details are confirmed directly with the business before purchase.</p><h2>Supplement information</h2><p>Product names and packaging are shown to help customers identify available items. Information on this website is general information only and is not medical advice, diagnosis or treatment.</p><p>Always read the manufacturer’s label, ingredients, warnings and directions before use. If you are pregnant, breastfeeding, taking medication, have a medical condition, or are purchasing for a child, seek appropriate professional advice before using a supplement.</p><h2>Customer experiences</h2><p>Testimonials describe individual customer experiences. They do not guarantee that another customer will have the same result.</p><h2>Orders and delivery</h2><p>Orders are currently arranged directly through Makascare’s contact channels. Current price, stock, payment arrangements, delivery timing and any return conditions should be confirmed before payment.</p><h2>Product imagery</h2><p>Packaging can change. Customers should confirm the exact product, size and formulation at the time of ordering.</p><p className="legal-note">These website terms are a practical starting point, not a substitute for jurisdiction-specific legal advice.</p></div></main>}\n`);

const named = [
  'magnesium-glycinate.jpg','neocell.jpg','youtheory-collagen.jpg','youtheory-men.jpg','immunboost-kids.jpg','evening-primrose.jpg','vital-proteins.jpg','multi-collagen.jpg','wellwoman.jpg','keto-acv.jpg'
];
for (const f of named) copy(f,`public/products/${f}`);

for (const f of fs.readdirSync(root)) {
  if (/^100034\d+\.jpg$/i.test(f)) copy(f,`public/catalog/${f}`);
}

console.log('Makascare folder structure prepared successfully.');
