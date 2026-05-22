// BBpillow product catalog + content
// Prices in THB (Thai Baht). Bilingual th/en strings.

window.BB = window.BB || {};

window.BB.products = [
  {
    id: 'p01', sku: 'BBP-PIL-001',
    th: 'หมอนหนุนใยสังเคราะห์ Cloud',
    en: 'Cloud Synthetic Pillow',
    category: 'pillow', material: 'microfiber',
    price: 189, compare: 290,
    img: './assets/หมอนบอดี้/IMG_2991.JPG',
    rating: 4.8, reviews: 1284, sold: 12840,
    badges: ['best-seller'],
    desc_th: 'ใยซิลิโคนเกรดพรีเมียม นุ่ม ฟู ไม่ยุบง่าย ใช้ได้นาน 3 ปี ระบายอากาศดี',
    desc_en: 'Premium silicone microfiber. Soft, full loft, holds shape 3+ years.',
  },
  {
    id: 'p02', sku: 'BBP-PIL-002',
    th: 'หมอนข้าง Hug',
    en: 'Hug Bolster',
    category: 'pillow', material: 'fiber',
    price: 159, compare: 220,
    img: './assets/หมอนบอดี้/IMG_2992.JPG',
    rating: 4.7, reviews: 642, sold: 5210,
    desc_th: 'หมอนข้างใยสังเคราะห์ ขนาดกอดสบาย',
    desc_en: 'Bolster pillow sized for full-body hug.',
  },
  {
    id: 'p03', sku: 'BBP-MAT-001',
    th: 'ที่นอนท็อปเปอร์ Soft Lay 3.5 ฟุต',
    en: 'Soft Lay Topper 3.5ft',
    category: 'mattress', material: 'microfiber',
    price: 390, compare: 590,
    img: './assets/ที่นอนTopper3.5/IMG_2971.JPG',
    rating: 4.9, reviews: 2104, sold: 18430,
    badges: ['best-seller', 'new'],
    desc_th: 'ที่นอนเสริมใยสังเคราะห์ หนา 3 นิ้ว นุ่มเหมือนนอนบนเมฆ',
    desc_en: '3-inch synthetic fiber topper, cloud-soft comfort.',
  },
  {
    id: 'p04', sku: 'BBP-SHE-001',
    th: 'ผ้าปูที่นอน Cotton-Touch 5 ฟุต',
    en: 'Cotton-Touch Sheet Set 5ft',
    category: 'sheet', material: 'cotton-blend',
    price: 290, compare: 420,
    img: './assets/ชุดผ้าปู/IMG_2995.JPG',
    rating: 4.6, reviews: 891, sold: 7320,
    desc_th: 'ผ้าปูที่นอนสัมผัสนุ่มเหมือนคอตตอน 4 ชิ้น ขนาด 5 ฟุต',
    desc_en: '4-piece sheet set, cotton-like hand feel.',
  },
  {
    id: 'p05', sku: 'BBP-BLK-001',
    th: 'ผ้าห่มขนนุ่ม Warm Dream',
    en: 'Warm Dream Blanket',
    category: 'blanket', material: 'fleece',
    price: 249, compare: 350,
    img: './assets/ผ้านวม5/IMG_2985.JPG',
    rating: 4.8, reviews: 1542, sold: 11200,
    badges: ['best-seller'],
    desc_th: 'ผ้าห่มขนนุ่ม น้ำหนักเบา อบอุ่นตลอดคืน',
    desc_en: 'Lightweight fleece blanket, warm all night.',
  },
  {
    id: 'p06', sku: 'BBP-TOP-001',
    th: 'ท็อปเปอร์ Cooling Gel',
    en: 'Cooling Gel Topper',
    category: 'topper', material: 'gel-fiber',
    price: 399, compare: 580,
    img: './assets/ที่นอนปิกนิก3.5/IMG_2979.JPG',
    rating: 4.7, reviews: 423, sold: 2890,
    badges: ['new'],
    desc_th: 'ท็อปเปอร์เย็นสบาย ระบายอากาศ ไม่อับชื้น',
    desc_en: 'Cooling, breathable topper for hot sleepers.',
  },
  {
    id: 'p07', sku: 'BBP-PIL-003',
    th: 'หมอนเด็ก Mini Cloud',
    en: 'Mini Cloud Kids Pillow',
    category: 'pillow', material: 'microfiber',
    price: 129, compare: 180,
    img: './assets/หมอนรองให้นมบุตร/IMG_2967.JPG',
    rating: 4.9, reviews: 312, sold: 1840,
    desc_th: 'หมอนสำหรับเด็ก ปลอดภัย ไร้สารตกค้าง',
    desc_en: 'Hypoallergenic kids pillow, safe materials.',
  },
  {
    id: 'p08', sku: 'BBP-SHE-002',
    th: 'ปลอกหมอนคู่ Smooth',
    en: 'Smooth Pillowcase Pair',
    category: 'sheet', material: 'microfiber',
    price: 99, compare: 150,
    img: './assets/ชุดผ้าปู/IMG_2996.JPG',
    rating: 4.5, reviews: 268, sold: 3210,
    desc_th: 'ปลอกหมอน 2 ใบ ผ้านุ่มซับเหงื่อดี',
    desc_en: '2-pack pillowcases, soft & moisture-wicking.',
  },
];

window.BB.categories = [
  { id: 'all', th: 'ทั้งหมด', en: 'All' },
  { id: 'pillow', th: 'หมอน', en: 'Pillows' },
  { id: 'mattress', th: 'ที่นอน', en: 'Mattresses' },
  { id: 'topper', th: 'ท็อปเปอร์', en: 'Toppers' },
  { id: 'sheet', th: 'ผ้าปูที่นอน', en: 'Sheets' },
  { id: 'blanket', th: 'ผ้าห่ม', en: 'Blankets' },
];

window.BB.materials = [
  { id: 'microfiber', th: 'ใยไมโครไฟเบอร์', en: 'Microfiber' },
  { id: 'fiber', th: 'ใยสังเคราะห์', en: 'Synthetic fiber' },
  { id: 'cotton-blend', th: 'ผสมคอตตอน', en: 'Cotton blend' },
  { id: 'fleece', th: 'ขนนุ่ม', en: 'Fleece' },
  { id: 'gel-fiber', th: 'เจลไฟเบอร์', en: 'Gel fiber' },
];

window.BB.reviews = [
  { id: 'r1', user: 'Pim S.', stars: 5, date: '2 weeks ago',
    th: 'นอนหลับสบายมาก หมอนนุ่มฟู คุ้มราคามาก ๆ', en: 'So comfortable, soft & lofty. Great value.' },
  { id: 'r2', user: 'Ton K.', stars: 5, date: '1 month ago',
    th: 'ส่งไว ห่อดี ใช้แล้วชอบมาก แนะนำเลย', en: 'Fast shipping, well-packed. Love it.' },
  { id: 'r3', user: 'Aom W.', stars: 4, date: '2 months ago',
    th: 'คุณภาพดีเกินราคา จะกลับมาซื้ออีก', en: 'Quality exceeds the price. Will reorder.' },
];

window.BB.dict = {
  // Header
  brand: { th: 'บีบีพิลโลว์', en: 'BBpillow' },
  tagline: { th: 'นอนหลับมีคุณภาพ ในราคาตลาดนัด', en: 'Quality sleep at flea-market prices' },
  // Nav
  home: { th: 'หน้าแรก', en: 'Home' },
  shop: { th: 'ช้อป', en: 'Shop' },
  wholesale: { th: 'ค้าส่ง', en: 'Wholesale' },
  story: { th: 'เรื่องราว', en: 'Our Story' },
  account: { th: 'บัญชี', en: 'Account' },
  cart: { th: 'ตะกร้า', en: 'Cart' },
  // Hero
  heroEyebrow: { th: 'แบรนด์ไทยเพื่อการนอนคุณภาพ', en: 'Thai brand for quality sleep' },
  heroSub: { th: 'เครื่องนอนคุณภาพห้างฯ ในราคาที่ทุกบ้านเอื้อมถึง — ไม่ต้องลังเลที่จะใช้ทุกวัน',
             en: 'Department-store quality bedding, priced for every home. Use it every day, worry-free.' },
  shopNow: { th: 'ช้อปเลย', en: 'Shop now' },
  bulkInquiry: { th: 'สอบถามค้าส่ง', en: 'Bulk inquiry' },
  // Sections
  bestsellers: { th: 'ขายดี', en: 'Best sellers' },
  categories: { th: 'หมวดสินค้า', en: 'Categories' },
  whyUs: { th: 'ทำไมต้อง BBpillow', en: 'Why BBpillow' },
  ourStory: { th: 'เรื่องราวของเรา', en: 'Our story' },
  newsletter: { th: 'รับสิทธิพิเศษทาง LINE', en: 'Get LINE-only perks' },
  // Buttons / product
  addToCart: { th: 'เพิ่มลงตะกร้า', en: 'Add to cart' },
  buyNow: { th: 'ซื้อเลย', en: 'Buy now' },
  outOfStock: { th: 'สินค้าหมด', en: 'Out of stock' },
  inStock: { th: 'พร้อมส่ง', en: 'In stock' },
  free: { th: 'ฟรี', en: 'Free' },
  freeShip: { th: 'ส่งฟรีเมื่อซื้อครบ 500 บาท', en: 'Free shipping over ฿500' },
  // Filters
  filter: { th: 'ตัวกรอง', en: 'Filter' },
  sort: { th: 'จัดเรียง', en: 'Sort' },
  category: { th: 'หมวด', en: 'Category' },
  material: { th: 'วัสดุ', en: 'Material' },
  price: { th: 'ราคา', en: 'Price' },
  // Cart
  yourCart: { th: 'ตะกร้าของคุณ', en: 'Your cart' },
  empty: { th: 'ตะกร้าว่าง', en: 'Your cart is empty' },
  subtotal: { th: 'ยอดรวม', en: 'Subtotal' },
  shipping: { th: 'ค่าจัดส่ง', en: 'Shipping' },
  total: { th: 'รวมทั้งสิ้น', en: 'Total' },
  checkout: { th: 'ชำระเงิน', en: 'Checkout' },
  continue: { th: 'ช้อปต่อ', en: 'Continue shopping' },
  // Wholesale
  bulkBenefits: { th: 'สิทธิประโยชน์สำหรับลูกค้าธุรกิจ', en: 'Wholesale benefits' },
  requestQuote: { th: 'ขอใบเสนอราคา', en: 'Request a quote' },
  downloadCatalog: { th: 'ดาวน์โหลด E-Catalog', en: 'Download E-Catalog' },
  // Dashboard
  myOrders: { th: 'คำสั่งซื้อ', en: 'Orders' },
  loyaltyPoints: { th: 'แต้มสะสม', en: 'Loyalty points' },
  profile: { th: 'โปรไฟล์', en: 'Profile' },
  // Footer
  rightsReserved: { th: 'สงวนลิขสิทธิ์', en: 'All rights reserved' },
};

window.BB.t = function(key, lang) {
  const d = window.BB.dict[key];
  if (!d) return key;
  return lang === 'th' ? d.th : d.en;
};

window.BB.fmtBaht = function(n) {
  return '฿' + n.toLocaleString('en-US');
};
