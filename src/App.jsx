
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Cat, Zap, Sparkles, Orbit, Atom, Shield, Flame, Star, Wand2, BookOpen, Info, Stars, BadgeInfo } from "lucide-react";

const categoryStyles = {
  alkali: "from-rose-400 to-pink-500",
  alkaline: "from-orange-300 to-amber-400",
  transition: "from-sky-400 to-blue-500",
  post: "from-indigo-400 to-violet-500",
  metalloid: "from-emerald-400 to-teal-500",
  nonmetal: "from-lime-400 to-green-500",
  halogen: "from-fuchsia-400 to-purple-500",
  noble: "from-cyan-300 to-sky-400",
  lanthanoid: "from-yellow-300 to-orange-400",
  actinoid: "from-red-400 to-orange-500",
  unknown: "from-slate-400 to-slate-500",
};

const felineByCategory = {
  alkali: "Zoomie Housecat",
  alkaline: "Mischief Sand Cat",
  transition: "Armored Tiger",
  post: "Velvet Panther",
  metalloid: "Rune Lynx",
  nonmetal: "Moonlight Cat",
  halogen: "Storm Leopard",
  noble: "Cloud Pallas Cat",
  lanthanoid: "Sunfire Lion",
  actinoid: "Comet Saber Cat",
  unknown: "Mystery Kitten",
};

const categoryLabels = {
  alkali: "Alkali metal",
  alkaline: "Alkaline earth",
  transition: "Transition metal",
  post: "Post-transition metal",
  metalloid: "Metalloid",
  nonmetal: "Reactive nonmetal",
  halogen: "Halogen",
  noble: "Noble gas",
  lanthanoid: "Lanthanide",
  actinoid: "Actinide",
  unknown: "Unknown / synthetic",
};

const elements = [
  { n: 1, symbol: "H", name: "Hydrogen", row: 1, col: 1, category: "nonmetal", pauling: 2.20, allen: 2.30 },
  { n: 2, symbol: "He", name: "Helium", row: 1, col: 18, category: "noble", pauling: null, allen: 4.16 },
  { n: 3, symbol: "Li", name: "Lithium", row: 2, col: 1, category: "alkali", pauling: 0.98, allen: 0.912 },
  { n: 4, symbol: "Be", name: "Beryllium", row: 2, col: 2, category: "alkaline", pauling: 1.57, allen: 1.576 },
  { n: 5, symbol: "B", name: "Boron", row: 2, col: 13, category: "metalloid", pauling: 2.04, allen: 2.051 },
  { n: 6, symbol: "C", name: "Carbon", row: 2, col: 14, category: "nonmetal", pauling: 2.55, allen: 2.544 },
  { n: 7, symbol: "N", name: "Nitrogen", row: 2, col: 15, category: "nonmetal", pauling: 3.04, allen: 3.066 },
  { n: 8, symbol: "O", name: "Oxygen", row: 2, col: 16, category: "nonmetal", pauling: 3.44, allen: 3.610 },
  { n: 9, symbol: "F", name: "Fluorine", row: 2, col: 17, category: "halogen", pauling: 3.98, allen: 4.193 },
  { n: 10, symbol: "Ne", name: "Neon", row: 2, col: 18, category: "noble", pauling: null, allen: 4.787 },
  { n: 11, symbol: "Na", name: "Sodium", row: 3, col: 1, category: "alkali", pauling: 0.93, allen: 0.869 },
  { n: 12, symbol: "Mg", name: "Magnesium", row: 3, col: 2, category: "alkaline", pauling: 1.31, allen: 1.293 },
  { n: 13, symbol: "Al", name: "Aluminium", row: 3, col: 13, category: "post", pauling: 1.61, allen: 1.613 },
  { n: 14, symbol: "Si", name: "Silicon", row: 3, col: 14, category: "metalloid", pauling: 1.90, allen: 1.916 },
  { n: 15, symbol: "P", name: "Phosphorus", row: 3, col: 15, category: "nonmetal", pauling: 2.19, allen: 2.253 },
  { n: 16, symbol: "S", name: "Sulfur", row: 3, col: 16, category: "nonmetal", pauling: 2.58, allen: 2.589 },
  { n: 17, symbol: "Cl", name: "Chlorine", row: 3, col: 17, category: "halogen", pauling: 3.16, allen: 2.869 },
  { n: 18, symbol: "Ar", name: "Argon", row: 3, col: 18, category: "noble", pauling: null, allen: 3.242 },
  { n: 19, symbol: "K", name: "Potassium", row: 4, col: 1, category: "alkali", pauling: 0.82, allen: 0.734 },
  { n: 20, symbol: "Ca", name: "Calcium", row: 4, col: 2, category: "alkaline", pauling: 1.00, allen: 1.034 },
  { n: 21, symbol: "Sc", name: "Scandium", row: 4, col: 3, category: "transition", pauling: 1.36, allen: 1.190 },
  { n: 22, symbol: "Ti", name: "Titanium", row: 4, col: 4, category: "transition", pauling: 1.54, allen: 1.380 },
  { n: 23, symbol: "V", name: "Vanadium", row: 4, col: 5, category: "transition", pauling: 1.63, allen: 1.530 },
  { n: 24, symbol: "Cr", name: "Chromium", row: 4, col: 6, category: "transition", pauling: 1.66, allen: 1.650 },
  { n: 25, symbol: "Mn", name: "Manganese", row: 4, col: 7, category: "transition", pauling: 1.55, allen: 1.750 },
  { n: 26, symbol: "Fe", name: "Iron", row: 4, col: 8, category: "transition", pauling: 1.83, allen: 1.800 },
  { n: 27, symbol: "Co", name: "Cobalt", row: 4, col: 9, category: "transition", pauling: 1.88, allen: 1.840 },
  { n: 28, symbol: "Ni", name: "Nickel", row: 4, col: 10, category: "transition", pauling: 1.91, allen: 1.880 },
  { n: 29, symbol: "Cu", name: "Copper", row: 4, col: 11, category: "transition", pauling: 1.90, allen: 1.850 },
  { n: 30, symbol: "Zn", name: "Zinc", row: 4, col: 12, category: "transition", pauling: 1.65, allen: 1.588 },
  { n: 31, symbol: "Ga", name: "Gallium", row: 4, col: 13, category: "post", pauling: 1.81, allen: 1.756 },
  { n: 32, symbol: "Ge", name: "Germanium", row: 4, col: 14, category: "metalloid", pauling: 2.01, allen: 1.994 },
  { n: 33, symbol: "As", name: "Arsenic", row: 4, col: 15, category: "metalloid", pauling: 2.18, allen: 2.211 },
  { n: 34, symbol: "Se", name: "Selenium", row: 4, col: 16, category: "nonmetal", pauling: 2.55, allen: 2.424 },
  { n: 35, symbol: "Br", name: "Bromine", row: 4, col: 17, category: "halogen", pauling: 2.96, allen: 2.685 },
  { n: 36, symbol: "Kr", name: "Krypton", row: 4, col: 18, category: "noble", pauling: 3.00, allen: 2.966 },
  { n: 37, symbol: "Rb", name: "Rubidium", row: 5, col: 1, category: "alkali", pauling: 0.82, allen: 0.706 },
  { n: 38, symbol: "Sr", name: "Strontium", row: 5, col: 2, category: "alkaline", pauling: 0.95, allen: 0.963 },
  { n: 39, symbol: "Y", name: "Yttrium", row: 5, col: 3, category: "transition", pauling: 1.22, allen: 1.120 },
  { n: 40, symbol: "Zr", name: "Zirconium", row: 5, col: 4, category: "transition", pauling: 1.33, allen: 1.320 },
  { n: 41, symbol: "Nb", name: "Niobium", row: 5, col: 5, category: "transition", pauling: 1.60, allen: 1.600 },
  { n: 42, symbol: "Mo", name: "Molybdenum", row: 5, col: 6, category: "transition", pauling: 2.16, allen: 1.470 },
  { n: 43, symbol: "Tc", name: "Technetium", row: 5, col: 7, category: "transition", pauling: 1.90, allen: 1.510 },
  { n: 44, symbol: "Ru", name: "Ruthenium", row: 5, col: 8, category: "transition", pauling: 2.20, allen: 1.540 },
  { n: 45, symbol: "Rh", name: "Rhodium", row: 5, col: 9, category: "transition", pauling: 2.28, allen: 1.560 },
  { n: 46, symbol: "Pd", name: "Palladium", row: 5, col: 10, category: "transition", pauling: 2.20, allen: 1.580 },
  { n: 47, symbol: "Ag", name: "Silver", row: 5, col: 11, category: "transition", pauling: 1.93, allen: 1.870 },
  { n: 48, symbol: "Cd", name: "Cadmium", row: 5, col: 12, category: "transition", pauling: 1.69, allen: 1.521 },
  { n: 49, symbol: "In", name: "Indium", row: 5, col: 13, category: "post", pauling: 1.78, allen: 1.656 },
  { n: 50, symbol: "Sn", name: "Tin", row: 5, col: 14, category: "post", pauling: 1.96, allen: 1.824 },
  { n: 51, symbol: "Sb", name: "Antimony", row: 5, col: 15, category: "metalloid", pauling: 2.05, allen: 1.984 },
  { n: 52, symbol: "Te", name: "Tellurium", row: 5, col: 16, category: "metalloid", pauling: 2.10, allen: 2.158 },
  { n: 53, symbol: "I", name: "Iodine", row: 5, col: 17, category: "halogen", pauling: 2.66, allen: 2.359 },
  { n: 54, symbol: "Xe", name: "Xenon", row: 5, col: 18, category: "noble", pauling: 2.60, allen: 2.582 },
  { n: 55, symbol: "Cs", name: "Cesium", row: 6, col: 1, category: "alkali", pauling: 0.79, allen: 0.659 },
  { n: 56, symbol: "Ba", name: "Barium", row: 6, col: 2, category: "alkaline", pauling: 0.89, allen: 0.881 },
  { n: 57, symbol: "La", name: "Lanthanum", row: 9, col: 3, category: "lanthanoid", pauling: 1.10, allen: 1.090 },
  { n: 58, symbol: "Ce", name: "Cerium", row: 9, col: 4, category: "lanthanoid", pauling: 1.12, allen: 1.120 },
  { n: 59, symbol: "Pr", name: "Praseodymium", row: 9, col: 5, category: "lanthanoid", pauling: 1.13, allen: 1.130 },
  { n: 60, symbol: "Nd", name: "Neodymium", row: 9, col: 6, category: "lanthanoid", pauling: 1.14, allen: 1.140 },
  { n: 61, symbol: "Pm", name: "Promethium", row: 9, col: 7, category: "lanthanoid", pauling: 1.13, allen: 1.130 },
  { n: 62, symbol: "Sm", name: "Samarium", row: 9, col: 8, category: "lanthanoid", pauling: 1.17, allen: 1.170 },
  { n: 63, symbol: "Eu", name: "Europium", row: 9, col: 9, category: "lanthanoid", pauling: 1.20, allen: 1.200 },
  { n: 64, symbol: "Gd", name: "Gadolinium", row: 9, col: 10, category: "lanthanoid", pauling: 1.20, allen: 1.200 },
  { n: 65, symbol: "Tb", name: "Terbium", row: 9, col: 11, category: "lanthanoid", pauling: 1.20, allen: 1.100 },
  { n: 66, symbol: "Dy", name: "Dysprosium", row: 9, col: 12, category: "lanthanoid", pauling: 1.22, allen: 1.220 },
  { n: 67, symbol: "Ho", name: "Holmium", row: 9, col: 13, category: "lanthanoid", pauling: 1.23, allen: 1.230 },
  { n: 68, symbol: "Er", name: "Erbium", row: 9, col: 14, category: "lanthanoid", pauling: 1.24, allen: 1.240 },
  { n: 69, symbol: "Tm", name: "Thulium", row: 9, col: 15, category: "lanthanoid", pauling: 1.25, allen: 1.250 },
  { n: 70, symbol: "Yb", name: "Ytterbium", row: 9, col: 16, category: "lanthanoid", pauling: 1.10, allen: 1.060 },
  { n: 71, symbol: "Lu", name: "Lutetium", row: 9, col: 17, category: "lanthanoid", pauling: 1.27, allen: 1.270 },
  { n: 72, symbol: "Hf", name: "Hafnium", row: 6, col: 4, category: "transition", pauling: 1.30, allen: 1.160 },
  { n: 73, symbol: "Ta", name: "Tantalum", row: 6, col: 5, category: "transition", pauling: 1.50, allen: 1.340 },
  { n: 74, symbol: "W", name: "Tungsten", row: 6, col: 6, category: "transition", pauling: 2.36, allen: 1.470 },
  { n: 75, symbol: "Re", name: "Rhenium", row: 6, col: 7, category: "transition", pauling: 1.90, allen: 1.600 },
  { n: 76, symbol: "Os", name: "Osmium", row: 6, col: 8, category: "transition", pauling: 2.20, allen: 1.650 },
  { n: 77, symbol: "Ir", name: "Iridium", row: 6, col: 9, category: "transition", pauling: 2.20, allen: 1.680 },
  { n: 78, symbol: "Pt", name: "Platinum", row: 6, col: 10, category: "transition", pauling: 2.28, allen: 1.720 },
  { n: 79, symbol: "Au", name: "Gold", row: 6, col: 11, category: "transition", pauling: 2.54, allen: 1.920 },
  { n: 80, symbol: "Hg", name: "Mercury", row: 6, col: 12, category: "transition", pauling: 2.00, allen: 1.765 },
  { n: 81, symbol: "Tl", name: "Thallium", row: 6, col: 13, category: "post", pauling: 1.62, allen: 1.789 },
  { n: 82, symbol: "Pb", name: "Lead", row: 6, col: 14, category: "post", pauling: 2.33, allen: 1.854 },
  { n: 83, symbol: "Bi", name: "Bismuth", row: 6, col: 15, category: "post", pauling: 2.02, allen: 2.010 },
  { n: 84, symbol: "Po", name: "Polonium", row: 6, col: 16, category: "metalloid", pauling: 2.00, allen: 2.190 },
  { n: 85, symbol: "At", name: "Astatine", row: 6, col: 17, category: "halogen", pauling: 2.20, allen: 2.390 },
  { n: 86, symbol: "Rn", name: "Radon", row: 6, col: 18, category: "noble", pauling: null, allen: 2.600 },
  { n: 87, symbol: "Fr", name: "Francium", row: 7, col: 1, category: "alkali", pauling: 0.70, allen: 0.670 },
  { n: 88, symbol: "Ra", name: "Radium", row: 7, col: 2, category: "alkaline", pauling: 0.90, allen: 0.890 },
  { n: 89, symbol: "Ac", name: "Actinium", row: 10, col: 3, category: "actinoid", pauling: 1.10, allen: 1.100 },
  { n: 90, symbol: "Th", name: "Thorium", row: 10, col: 4, category: "actinoid", pauling: 1.30, allen: 1.300 },
  { n: 91, symbol: "Pa", name: "Protactinium", row: 10, col: 5, category: "actinoid", pauling: 1.50, allen: 1.500 },
  { n: 92, symbol: "U", name: "Uranium", row: 10, col: 6, category: "actinoid", pauling: 1.38, allen: 1.380 },
  { n: 93, symbol: "Np", name: "Neptunium", row: 10, col: 7, category: "actinoid", pauling: 1.36, allen: 1.360 },
  { n: 94, symbol: "Pu", name: "Plutonium", row: 10, col: 8, category: "actinoid", pauling: 1.28, allen: 1.280 },
  { n: 95, symbol: "Am", name: "Americium", row: 10, col: 9, category: "actinoid", pauling: 1.30, allen: 1.300 },
  { n: 96, symbol: "Cm", name: "Curium", row: 10, col: 10, category: "actinoid", pauling: 1.30, allen: 1.300 },
  { n: 97, symbol: "Bk", name: "Berkelium", row: 10, col: 11, category: "actinoid", pauling: 1.30, allen: 1.300 },
  { n: 98, symbol: "Cf", name: "Californium", row: 10, col: 12, category: "actinoid", pauling: 1.30, allen: 1.300 },
  { n: 99, symbol: "Es", name: "Einsteinium", row: 10, col: 13, category: "actinoid", pauling: 1.30, allen: 1.300 },
  { n: 100, symbol: "Fm", name: "Fermium", row: 10, col: 14, category: "actinoid", pauling: 1.30, allen: 1.300 },
  { n: 101, symbol: "Md", name: "Mendelevium", row: 10, col: 15, category: "actinoid", pauling: 1.30, allen: 1.300 },
  { n: 102, symbol: "No", name: "Nobelium", row: 10, col: 16, category: "actinoid", pauling: 1.30, allen: 1.300 },
  { n: 103, symbol: "Lr", name: "Lawrencium", row: 10, col: 17, category: "actinoid", pauling: 1.30, allen: 1.300 },
  { n: 104, symbol: "Rf", name: "Rutherfordium", row: 7, col: 4, category: "transition", pauling: null, allen: null },
  { n: 105, symbol: "Db", name: "Dubnium", row: 7, col: 5, category: "transition", pauling: null, allen: null },
  { n: 106, symbol: "Sg", name: "Seaborgium", row: 7, col: 6, category: "transition", pauling: null, allen: null },
  { n: 107, symbol: "Bh", name: "Bohrium", row: 7, col: 7, category: "transition", pauling: null, allen: null },
  { n: 108, symbol: "Hs", name: "Hassium", row: 7, col: 8, category: "transition", pauling: null, allen: null },
  { n: 109, symbol: "Mt", name: "Meitnerium", row: 7, col: 9, category: "transition", pauling: null, allen: null },
  { n: 110, symbol: "Ds", name: "Darmstadtium", row: 7, col: 10, category: "transition", pauling: null, allen: null },
  { n: 111, symbol: "Rg", name: "Roentgenium", row: 7, col: 11, category: "transition", pauling: null, allen: null },
  { n: 112, symbol: "Cn", name: "Copernicium", row: 7, col: 12, category: "transition", pauling: null, allen: null },
  { n: 113, symbol: "Nh", name: "Nihonium", row: 7, col: 13, category: "post", pauling: null, allen: null },
  { n: 114, symbol: "Fl", name: "Flerovium", row: 7, col: 14, category: "post", pauling: null, allen: null },
  { n: 115, symbol: "Mc", name: "Moscovium", row: 7, col: 15, category: "post", pauling: null, allen: null },
  { n: 116, symbol: "Lv", name: "Livermorium", row: 7, col: 16, category: "post", pauling: null, allen: null },
  { n: 117, symbol: "Ts", name: "Tennessine", row: 7, col: 17, category: "halogen", pauling: null, allen: null },
  { n: 118, symbol: "Og", name: "Oganesson", row: 7, col: 18, category: "noble", pauling: null, allen: null },
];

const bySymbol = Object.fromEntries(elements.map((e) => [e.symbol, e]));
const fmt = (value, digits = 2) => (value == null ? "—" : Number(value).toFixed(digits));
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const isMetal = (category) => ["alkali", "alkaline", "transition", "post", "lanthanoid", "actinoid"].includes(category);
const isNonMetalish = (category) => ["nonmetal", "halogen", "noble"].includes(category);

function pickScale(a, b) {
  if (a.allen != null && b.allen != null) return { scale: "Allen", x1: a.allen, x2: b.allen };
  if (a.pauling != null && b.pauling != null) return { scale: "Pauling", x1: a.pauling, x2: b.pauling };
  return null;
}

function generateFusionName(a, b, strength) {
  const left = a.name.slice(0, Math.max(2, Math.floor(a.name.length / 2)));
  const right = b.name.slice(Math.floor(b.name.length / 2));
  const suffix = strength > 80 ? " Prime" : strength > 60 ? " Rex" : strength > 40 ? " Pounce" : " Puff";
  return `${left}${right}${suffix}`;
}

function bondFeline(type, strength) {
  if (type === "Ionic") return strength > 75 ? "Thunder Lion" : "Shock Jaguar";
  if (type === "Metallic") return strength > 55 ? "Steel Tiger" : "Circuit Cat";
  if (type === "Nonpolar covalent") return strength > 55 ? "Twin Moon Lynx" : "Mirror Kitten";
  if (type === "Polar covalent") return strength > 65 ? "Aurora Panther" : "Ribbon Leopard";
  return strength > 55 ? "Rune Saber Cat" : "Curious Cloud Cat";
}

function bondDescriptor(a, b) {
  const paulingDelta = a.pauling != null && b.pauling != null ? Math.abs(a.pauling - b.pauling) : null;
  const allenDelta = a.allen != null && b.allen != null ? Math.abs(a.allen - b.allen) : null;
  const selectedScale = pickScale(a, b);
  const delta = selectedScale ? Math.abs(selectedScale.x1 - selectedScale.x2) : null;
  const avg = selectedScale ? (selectedScale.x1 + selectedScale.x2) / 2 : null;

  let type = "Unknown / data-limited";
  let summary = "Some electronegativity data is missing, so the bond call is cautious.";
  const bothMetals = isMetal(a.category) && isMetal(b.category);
  const bothNonmetals = isNonMetalish(a.category) && isNonMetalish(b.category);
  const includesMetalloid = a.category === "metalloid" || b.category === "metalloid";

  if (delta != null && avg != null) {
    if (bothMetals && delta < 0.7 && avg < 1.9) {
      type = "Metallic";
      summary = "Low electronegativity contrast plus metal-like character points toward a delocalized metallic bond.";
    } else if (delta >= 1.7) {
      type = "Ionic";
      summary = "A large electronegativity gap strongly favors electron transfer and ionic character.";
    } else if (bothNonmetals && delta < 0.4) {
      type = "Nonpolar covalent";
      summary = "The two atoms pull on shared electrons almost equally, so the bond is mostly nonpolar covalent.";
    } else if (delta >= 0.4 && delta < 1.7) {
      type = "Polar covalent";
      summary = "The electrons are shared, but unevenly, creating a bond with partial ionic character.";
    } else if (includesMetalloid) {
      type = "Network / semipolar covalent";
      summary = "Metalloid participation often creates directional bonding with mixed covalent and metallic flavor.";
    }
  }

  const ketelaarX = avg != null ? clamp((avg / 4.5) * 100, 0, 100) : null;
  const ketelaarY = delta != null ? clamp((delta / 4.2) * 100, 0, 100) : null;
  const strengthBase = delta == null || avg == null
    ? 18
    : clamp(100 * (0.52 * clamp(avg / 4.2, 0, 1) + 0.48 * (1 - Math.abs(delta - 1.15) / 2.6)), 8, 100);

  return {
    paulingDelta,
    allenDelta,
    avg,
    delta,
    selectedScale: selectedScale?.scale ?? "Unavailable",
    type,
    summary,
    ketelaarX,
    ketelaarY,
    strength: Math.round(strengthBase),
    strengthLabel: strengthBase < 25 ? "Playful Kitten Bond" : strengthBase < 45 ? "Clever Lynx Bond" : strengthBase < 65 ? "Guardian Tiger Bond" : strengthBase < 82 ? "Mythic Panther Bond" : "Celestial Saber Bond",
    felineClass: bondFeline(type, strengthBase),
    fusionName: generateFusionName(a, b, strengthBase),
  };
}

function bondParticles(type) {
  if (type === "Ionic") return ["⚡", "✨", "⚡", "✦", "⚡"];
  if (type === "Metallic") return ["🔩", "✨", "⛓️", "✦", "🔧"];
  if (type === "Nonpolar covalent") return ["🌙", "⭐", "🌙", "✦", "⭐"];
  if (type === "Polar covalent") return ["💫", "✨", "🌈", "✦", "💫"];
  return ["🔮", "✨", "🫧", "✦", "🔮"];
}

function bondRecipe(a, b, bond) {
  const traits = [];
  if (bond.delta != null) {
    if (bond.delta >= 1.7) traits.push("big electronegativity gap");
    else if (bond.delta >= 0.4) traits.push("moderate electron pull imbalance");
    else traits.push("very even electron sharing tendency");
  } else {
    traits.push("limited electronegativity data");
  }
  if (isMetal(a.category) && isMetal(b.category)) traits.push("both partners are metal-like");
  if (isNonMetalish(a.category) && isNonMetalish(b.category)) traits.push("both partners are nonmetal-like");
  if (a.category === "metalloid" || b.category === "metalloid") traits.push("a metalloid adds mixed behavior");

  let behavior = "This pair blends several bonding tendencies.";
  if (bond.type === "Ionic") behavior = "One atom tends to surrender electron density while the other strongly attracts it, so the bond gets a charge-separated personality.";
  if (bond.type === "Metallic") behavior = "The electrons are better pictured as a mobile shared cloud, giving the bond a communal metallic personality.";
  if (bond.type === "Nonpolar covalent") behavior = "Both atoms tug on the shared electrons with similar strength, so the bond stays balanced and symmetrical.";
  if (bond.type === "Polar covalent") behavior = "The bond shares electrons, but one side tugs harder, creating a directional dipole-like personality.";

  const vibe = bond.strength > 82 ? "legendary, high-drama fusion" : bond.strength > 65 ? "powerful, stable heroic fusion" : bond.strength > 45 ? "agile, balanced mid-power fusion" : "light, playful low-power fusion";
  return {
    ingredients: traits,
    behavior,
    vibe,
    catalyst: `Blend ${a.symbol} and ${b.symbol} through ${bond.type.toLowerCase()} behavior and map the result onto the Ketelaar triangle.`,
  };
}

function emojiForStrength(strength) {
  if (strength > 82) return "🦁";
  if (strength > 65) return "🐅";
  if (strength > 45) return "🐆";
  if (strength > 25) return "🐈";
  return "🐾";
}

function ElementTile({ element, selected, onClick }) {
  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(element)}
      className={`relative h-16 w-full rounded-2xl border border-white/30 bg-gradient-to-br ${categoryStyles[element.category] || categoryStyles.unknown} p-2 text-left shadow-lg transition-all ${selected ? "ring-4 ring-yellow-200" : "hover:ring-2 hover:ring-white/70"}`}
      title={`${element.name} (${element.symbol})`}
    >
      <div className="absolute right-2 top-1 text-[10px] font-bold text-white/80">{element.n}</div>
      <div className="text-lg font-black leading-none text-white">{element.symbol}</div>
      <div className="mt-1 line-clamp-2 text-[10px] leading-tight text-white/90">{element.name}</div>
    </motion.button>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
      <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70"><Icon className="h-4 w-4" /> {label}</div>
      <div className="text-xl font-black text-white">{value}</div>
    </div>
  );
}

function FelineAvatar({ symbol, name, category, strength = 50, side = "left" }) {
  const colors = {
    alkali: "from-rose-300 to-pink-500",
    alkaline: "from-orange-300 to-amber-500",
    transition: "from-sky-300 to-blue-500",
    post: "from-violet-300 to-fuchsia-500",
    metalloid: "from-emerald-300 to-teal-500",
    nonmetal: "from-lime-300 to-green-500",
    halogen: "from-purple-300 to-fuchsia-500",
    noble: "from-cyan-200 to-sky-500",
    lanthanoid: "from-yellow-300 to-orange-500",
    actinoid: "from-red-300 to-orange-600",
    unknown: "from-slate-300 to-slate-500",
  };

  return (
    <div className="relative mx-auto h-44 w-36">
      <motion.div animate={{ y: [0, -6, 0], rotate: side === "left" ? [-2, 2, -2] : [2, -2, 2] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} className="relative mx-auto mt-4 h-32 w-28">
        <div className={`absolute left-1/2 top-2 h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-br ${colors[category] || colors.unknown} shadow-2xl`} />
        <div className={`absolute left-5 top-0 h-8 w-8 rotate-[-20deg] rounded-t-[90%] rounded-bl-[40%] bg-gradient-to-br ${colors[category] || colors.unknown}`} />
        <div className={`absolute right-5 top-0 h-8 w-8 rotate-[20deg] rounded-t-[90%] rounded-br-[40%] bg-gradient-to-br ${colors[category] || colors.unknown}`} />
        <div className="absolute left-1/2 top-11 h-8 w-12 -translate-x-1/2 rounded-full bg-white/80" />
        <div className="absolute left-[38px] top-[42px] h-3 w-3 rounded-full bg-slate-900" />
        <div className="absolute right-[38px] top-[42px] h-3 w-3 rounded-full bg-slate-900" />
        <div className="absolute left-1/2 top-[58px] h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm bg-pink-300" />
        <div className="absolute left-6 top-[58px] h-[2px] w-8 bg-white/70" />
        <div className="absolute left-6 top-[64px] h-[2px] w-8 bg-white/70" />
        <div className="absolute right-6 top-[58px] h-[2px] w-8 bg-white/70" />
        <div className="absolute right-6 top-[64px] h-[2px] w-8 bg-white/70" />
        <motion.div animate={{ rotate: side === "left" ? [18, 34, 18] : [-18, -34, -18] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} className={`absolute ${side === "left" ? "-right-1" : "-left-1"} top-20 h-14 w-4 origin-top rounded-full bg-gradient-to-b ${colors[category] || colors.unknown}`} />
        <div className="absolute left-1/2 top-[92px] h-14 w-16 -translate-x-1/2 rounded-[45%] bg-white/15" />
        <div className="absolute inset-x-0 bottom-0 text-center text-xs font-black text-white drop-shadow">{symbol}</div>
      </motion.div>
      <div className="text-center">
        <div className="text-sm font-bold text-white">{name}</div>
        <div className="text-xs text-white/70">Power {strength}</div>
      </div>
    </div>
  );
}

function BondEffects({ type }) {
  const particles = bondParticles(type);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[29px]">
      {particles.map((p, i) => (
        <motion.div key={`${p}-${i}`} initial={{ opacity: 0.2, y: 20 }} animate={{ opacity: [0.2, 1, 0.3], y: [-10, -38, -12], rotate: [0, 12, -8, 0] }} transition={{ duration: 2.6 + i * 0.25, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }} className="absolute bottom-6 text-2xl" style={{ left: `${12 + i * 16}%` }}>
          {p}
        </motion.div>
      ))}
    </div>
  );
}

function FelineFusionCard({ a, b, bond }) {
  const aura = bond.strength > 82 ? "from-yellow-300 via-orange-400 to-pink-500" : bond.strength > 65 ? "from-sky-300 via-cyan-400 to-violet-500" : bond.strength > 45 ? "from-green-300 via-emerald-400 to-teal-500" : "from-pink-300 via-rose-400 to-orange-400";
  return (
    <div className={`relative overflow-hidden rounded-[30px] border border-white/30 bg-gradient-to-br ${aura} p-[1px] shadow-2xl`}>
      <div className="relative rounded-[29px] bg-slate-950/80 p-5 backdrop-blur-md">
        <BondEffects type={bond.type} />
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/60">Bond beast</div>
            <div className="text-2xl font-black text-white">{bond.fusionName}</div>
          </div>
          <div className="text-4xl">{emojiForStrength(bond.strength)}</div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="rounded-3xl bg-white/10 p-4 text-center"><FelineAvatar symbol={a.symbol} name={felineByCategory[a.category]} category={a.category} strength={Math.max(20, Math.round(bond.strength * 0.7))} side="left" /></div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15"><Sparkles className="h-8 w-8 text-yellow-200" /></div>
          <div className="rounded-3xl bg-white/10 p-4 text-center"><FelineAvatar symbol={b.symbol} name={felineByCategory[b.category]} category={b.category} strength={Math.max(20, Math.round(bond.strength * 0.7))} side="right" /></div>
        </div>
        <div className="mt-4 rounded-3xl border border-white/15 bg-white/10 p-4">
          <div className="mb-1 flex items-center gap-2 text-white"><Cat className="h-5 w-5" /><span className="text-lg font-extrabold">{bond.felineClass}</span></div>
          <div className="text-sm text-white/75">{bond.strengthLabel} · Fusion strength score: <span className="font-bold text-white">{bond.strength}/100</span></div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div initial={{ width: 0 }} animate={{ width: `${bond.strength}%` }} transition={{ duration: 0.7 }} className={`h-full rounded-full bg-gradient-to-r ${aura}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function KetelaarTriangle({ point, label }) {
  const p = point ? { x: 50 + (point.x - 50) * 0.8, y: 88 - point.y * 0.72 } : null;
  return (
    <div className="rounded-[28px] border border-white/20 bg-slate-950/40 p-4 shadow-2xl">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/80"><Orbit className="h-4 w-4" /> van Arkel–Ketelaar triangle</div>
      <svg viewBox="0 0 100 90" className="h-[260px] w-full overflow-visible rounded-2xl">
        <defs>
          <linearGradient id="triFill" x1="0" x2="1" y1="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
            <stop offset="52%" stopColor="#f472b6" stopOpacity="0.58" />
            <stop offset="100%" stopColor="#facc15" stopOpacity="0.62" />
          </linearGradient>
        </defs>
        <polygon points="10,82 90,82 50,10" fill="url(#triFill)" stroke="rgba(255,255,255,.8)" strokeWidth="1.2" />
        <text x="50" y="6" textAnchor="middle" fill="white" fontSize="5" fontWeight="700">ionic</text>
        <text x="8" y="87" textAnchor="start" fill="white" fontSize="5" fontWeight="700">metallic</text>
        <text x="92" y="87" textAnchor="end" fill="white" fontSize="5" fontWeight="700">covalent</text>
        {p && <><circle cx={p.x} cy={p.y} r="3.3" fill="#fff" /><circle cx={p.x} cy={p.y} r="6.5" fill="rgba(255,255,255,.15)" /><text x={p.x} y={p.y - 6.5} textAnchor="middle" fill="white" fontSize="4.2" fontWeight="700">{label}</text></>}
      </svg>
      <p className="mt-2 text-xs leading-relaxed text-white/70">Higher up means more ionic character. Lower-left leans metallic. Lower-right leans covalent.</p>
    </div>
  );
}

function UsageGuide() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-lg">
      <div className="mb-3 flex items-center gap-2 text-lg font-black text-white"><Info className="h-5 w-5" /> How to use it</div>
      <ol className="space-y-2 text-sm leading-6 text-white/80">
        <li>1. Click any element tile once to choose the first feline element.</li>
        <li>2. Click a second element to create a bond pair.</li>
        <li>3. Read the right-side panel for both electronegativity scales, bond class, and fusion power.</li>
        <li>4. Look at the van Arkel–Ketelaar triangle to see whether the pair leans metallic, covalent, or ionic.</li>
        <li>5. Check the animated feline fusion and the recipe card to understand why that bond behaves that way.</li>
        <li>6. Click any new element to replace the older selection and instantly compare a new pair.</li>
      </ol>
    </div>
  );
}

function CompoundRecipeCard({ a, b, bond }) {
  const recipe = bondRecipe(a, b, bond);
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-lg">
      <div className="mb-3 flex items-center gap-2 text-lg font-black text-white"><BookOpen className="h-5 w-5" /> Compound recipe card</div>
      <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-4">
        <div className="text-xs uppercase tracking-[0.24em] text-white/55">Fusion title</div>
        <div className="text-2xl font-black text-white">{bond.fusionName}</div>
        <div className="mt-1 text-sm text-white/70">{a.name} + {b.name} → {bond.felineClass}</div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-white"><Wand2 className="h-4 w-4" /> Ingredients</div>
            <ul className="space-y-2 text-sm text-white/80">{recipe.ingredients.map((item, idx) => <li key={idx}>• {item}</li>)}</ul>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-white"><Stars className="h-4 w-4" /> Personality</div>
            <p className="text-sm leading-6 text-white/80">{recipe.behavior}</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/80">
          <div><span className="font-bold text-white">Catalyst:</span> {recipe.catalyst}</div>
          <div className="mt-1"><span className="font-bold text-white">Final vibe:</span> {recipe.vibe}</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [picked, setPicked] = useState([bySymbol.Na, bySymbol.Cl]);
  const bond = useMemo(() => bondDescriptor(picked[0], picked[1]), [picked]);

  const handlePick = (element) => {
    setPicked((prev) => {
      if (prev[0]?.symbol === element.symbol) return [element, prev[1]];
      if (prev[1]?.symbol === element.symbol) return [prev[0], element];
      return [prev[1], element];
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#334155_0%,#111827_35%,#020617_100%)] text-white">
      <div className="mx-auto max-w-[1700px] p-6 md:p-8">
        <div className="mb-6 overflow-hidden rounded-[36px] border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-300/30 bg-pink-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-pink-100"><Sparkles className="h-4 w-4" /> Feline Chemistry Studio</div>
              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">The Periodic Purr-suit of <span className="bg-gradient-to-r from-pink-300 via-sky-300 to-yellow-200 bg-clip-text text-transparent">chemical bonds</span></h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/75 md:text-lg">Click any two elements. The app compares their electronegativity on both the <span className="font-bold text-white">Pauling</span> and <span className="font-bold text-white">Allen</span> scales, places the pair on the <span className="font-bold text-white">van Arkel–Ketelaar triangle</span>, estimates bond character, and then reveals the feline creature born from that bond.</p>
            </div>
            <FelineFusionCard a={picked[0]} b={picked[1]} bond={bond} />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-lg md:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-white/60">Interactive periodic table</div>
                <div className="text-2xl font-black text-white">Choose two bonding cats</div>
              </div>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="grid min-w-[1100px] grid-cols-18 gap-2" style={{ gridTemplateColumns: "repeat(18, minmax(0, 1fr))" }}>
                {Array.from({ length: 10 * 18 }, (_, i) => i).map((i) => {
                  const row = Math.floor(i / 18) + 1;
                  const col = (i % 18) + 1;
                  const element = elements.find((e) => e.row === row && e.col === col);
                  if (!element) {
                    const specialLabel = row === 8 && col === 3 ? "57–71" : row === 9 && col === 1 ? "Lanth." : row === 10 && col === 1 ? "Act." : row === 10 && col === 3 ? "89–103" : "";
                    return <div key={i} className="flex h-16 items-center justify-center rounded-2xl border border-dashed border-white/5 bg-white/[0.02] text-[10px] text-white/20">{specialLabel}</div>;
                  }
                  const selected = picked.some((p) => p.symbol === element.symbol);
                  return <ElementTile key={element.symbol} element={element} selected={selected} onClick={handlePick} />;
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <UsageGuide />
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-400 text-slate-900 shadow-lg"><Atom className="h-6 w-6" /></div>
                <div>
                  <div className="text-sm uppercase tracking-[0.25em] text-white/55">Selected pair</div>
                  <div className="text-2xl font-black text-white">{picked[0].name} + {picked[1].name}</div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <StatCard label="Pauling Δχ" value={fmt(bond.paulingDelta)} icon={Zap} />
                <StatCard label="Allen Δχ" value={fmt(bond.allenDelta)} icon={Flame} />
                <StatCard label="Bond class" value={bond.type} icon={Shield} />
                <StatCard label="Fusion power" value={`${bond.strength}/100`} icon={Star} />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {[picked[0], picked[1]].map((e) => (
                  <div key={e.symbol} className="rounded-3xl border border-white/15 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div><div className="text-3xl font-black text-white">{e.symbol}</div><div className="text-sm text-white/75">{e.name}</div></div>
                      <div className={`rounded-full bg-gradient-to-r ${categoryStyles[e.category] || categoryStyles.unknown} px-3 py-1 text-xs font-bold text-white`}>{categoryLabels[e.category]}</div>
                    </div>
                    <div className="mt-3 space-y-1 text-sm text-white/80">
                      <div>Pauling: <span className="font-bold text-white">{fmt(e.pauling)}</span></div>
                      <div>Allen: <span className="font-bold text-white">{fmt(e.allen)}</span></div>
                      <div>Feline archetype: <span className="font-bold text-white">{felineByCategory[e.category]}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-3xl border border-white/15 bg-gradient-to-r from-white/10 to-white/5 p-4 text-sm leading-7 text-white/80"><span className="font-bold text-white">Bond reading:</span> {bond.summary} Using the <span className="font-bold text-white">{bond.selectedScale}</span> scale for the triangle placement gives an average electronegativity of <span className="font-bold text-white">{fmt(bond.avg)}</span> and a difference of <span className="font-bold text-white">{fmt(bond.delta)}</span>.</div>
            </div>
            <KetelaarTriangle point={bond.ketelaarX != null && bond.ketelaarY != null ? { x: bond.ketelaarX, y: bond.ketelaarY } : null} label={`${picked[0].symbol}-${picked[1].symbol}`} />
            <CompoundRecipeCard a={picked[0]} b={picked[1]} bond={bond} />
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-lg">
              <div className="mb-3 flex items-center gap-2 text-lg font-black text-white"><BadgeInfo className="h-5 w-5" /> How the “bond beast” is decided</div>
              <ul className="space-y-2 text-sm leading-6 text-white/75">
                <li>• The app compares the two elements on both Pauling and Allen electronegativity scales.</li>
                <li>• It estimates bond flavor from electronegativity contrast, metal vs nonmetal behavior, and average attraction for electrons.</li>
                <li>• The van Arkel–Ketelaar triangle gives the visual chemistry vibe: metallic, ionic, or covalent territory.</li>
                <li>• A stylized strength score turns that chemistry into a fused feline, from tiny kitten bonds to celestial saber bonds.</li>
                <li>• Animated avatars and floating bond particles make each bond feel visually alive.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
