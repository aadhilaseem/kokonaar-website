// KOKONAAR — site script

const WHATSAPP = "919995293400";
const wa = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("site-nav");
if (toggle && nav) {
  const mq = window.matchMedia("(max-width: 860px)");
  const setOpen = (open) => {
    nav.dataset.open = String(open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  const sync = () => setOpen(!mq.matches);
  sync();
  mq.addEventListener("change", sync);
  toggle.addEventListener("click", () => setOpen(nav.dataset.open !== "true"));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { if (mq.matches) setOpen(false); }));
}

// Product details
const products = {
  cocopeat: {
    title: "Cocopeat",
    images: ["assets/images/cocopeat.jpg", "assets/images/cocopeat_alt.jpg"],
    description: "Our cocopeat is washed, dried and compressed into blocks. It is an excellent organic soil conditioner and growing medium that holds water while keeping roots well aerated.",
    features: ["High water retention capacity", "100% natural and biodegradable", "Promotes strong root growth", "Ideal for potting mixes and greenhouses"],
  },
  coco_chips: {
    title: "Coco Chips",
    images: ["assets/images/coco_chips.jpg"],
    description: "Cut from the coconut husk, these chips suit orchids, anthuriums and other epiphytes. They drain freely while holding the right amount of moisture.",
    features: ["Excellent drainage and aeration", "Resists fungal growth", "Lasts longer than bark", "Sustainably sourced"],
  },
  coir_fibre: {
    title: "Coir Fibre",
    images: ["assets/images/coir_fibre.jpg"],
    description: "Extracted from the protective husk of the coconut, this golden fibre is strong and durable, and is used in many industrial and commercial applications.",
    features: ["High tensile strength", "Naturally resistant to rot and saltwater", "Used for mattresses, ropes and brushes", "Eco-friendly alternative to synthetic fibres"],
  },
  geo_textiles: {
    title: "Coir Geo Textiles",
    images: ["assets/images/geo_textiles.jpg"],
    description: "Woven coir netting for natural soil erosion control. It protects the soil, holds moisture and lets vegetation establish itself.",
    features: ["100% biodegradable netting", "Prevents soil erosion on slopes", "Improves water absorption", "Degrades naturally over 3–5 years"],
  },
  coir_mats: {
    title: "Coir Mats",
    images: ["assets/images/coir_mats.jpg"],
    description: "Durable woven coir mats for homes and commercial entrances. The natural bristles scrape dirt from shoes and resist moisture.",
    features: ["Tough natural bristles trap dirt", "Resists mould and mildew", "Non-slip backing available", "Custom designs and sizes"],
  },
  garden_articles: {
    title: "Garden Articles",
    images: ["assets/images/garden_articles.jpg"],
    description: "Eco-friendly gardening products, including coir pots, hanging basket liners and moss poles that support natural plant growth.",
    features: ["Roots grow directly through the pots", "100% biodegradable, pot and all", "Natural air pruning for roots", "Natural look in any garden"],
  },
  grow_bags: {
    title: "Open Top Grow Bags",
    images: ["assets/images/grow_bags.jpg"],
    description: "Ready-to-use coir substrate compressed into open-top bags. Suited to commercial hydroponics, tomatoes, cucumbers and berries.",
    features: ["Balanced air-to-water ratio", "UV-treated bags for greenhouse use", "Pre-cut drainage and plant holes available", "Saves time and labour"],
  },
  needle_felt: {
    title: "Needle Felt",
    images: ["assets/images/needle_felt.jpg"],
    description: "A non-woven mat made by mechanically interlocking coir fibres. Used for weed control in landscaping and for acoustic and thermal insulation.",
    features: ["Effective weed barrier for landscaping", "Acoustic and thermal insulation", "Used in mattress manufacturing", "Breathable and natural"],
  },
};

const dialog = document.getElementById("product-dialog");
if (dialog && typeof dialog.showModal === "function") {
  const mainImg = dialog.querySelector(".dialog-gallery > img");
  const thumbs = dialog.querySelector(".thumbs");
  const title = dialog.querySelector("h2");
  const desc = dialog.querySelector(".dialog-text p");
  const list = dialog.querySelector(".features");
  const ask = dialog.querySelector(".ask");

  const show = (src, alt) => {
    mainImg.src = src;
    mainImg.alt = alt;
    thumbs.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.src === src)));
  };

  document.querySelectorAll(".product").forEach((card) => {
    card.addEventListener("click", () => {
      const p = products[card.dataset.product];
      if (!p) return;
      title.textContent = p.title;
      desc.textContent = p.description;
      list.replaceChildren(...p.features.map((f) => Object.assign(document.createElement("li"), { textContent: f })));
      thumbs.replaceChildren();
      if (p.images.length > 1) {
        p.images.forEach((src, i) => {
          const b = document.createElement("button");
          b.type = "button";
          b.dataset.src = src;
          b.setAttribute("aria-label", `${p.title} photo ${i + 1}`);
          b.append(Object.assign(document.createElement("img"), { src, alt: "" }));
          b.addEventListener("click", () => show(src, p.title));
          thumbs.append(b);
        });
      }
      thumbs.hidden = p.images.length < 2;
      show(p.images[0], p.title);
      ask.href = wa(`Hello KOKONAAR, I'd like a price for ${p.title}.`);
      dialog.showModal();
    });
  });
  dialog.querySelector(".close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
}

// Quote form: opens WhatsApp with the enquiry filled in
const form = document.getElementById("quote");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = (id) => document.getElementById(id).value.trim();
    const lines = ["Hello KOKONAAR, I'd like a quote.", "", `Name: ${v("q-name")}`, `Phone: ${v("q-phone")}`, `Product: ${v("q-product")}`];
    if (v("q-qty")) lines.push(`Quantity: ${v("q-qty")}`);
    if (v("q-email")) lines.push(`Email: ${v("q-email")}`);
    if (v("q-msg")) lines.push(`Details: ${v("q-msg")}`);
    const url = wa(lines.join("\n"));
    // "noopener" would make window.open return null, so a popup blocker couldn't be detected
    if (!window.open(url, "_blank")) window.location.href = url;
  });
}

document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
