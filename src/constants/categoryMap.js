// FILE: categoryMap.js
export const CATEGORY_MAP = {
  1: "Mortise Lock",
  2: "Main Door Handle",
  3: "Cabinet Door Handle",
  4: "Accessories",
  5: "Plate",
  6: "Dabbi",
  7: "Kadi/Chest Handle",
  8: "Knob",
  9: "Magnet",
  10: "Khuti/Hook",
  11: "Key Hole",
  12: "Door Buffer/Silencer",
  13: "Stopper",
  14: "Glass Bracket",
  15: "Key Stand",
  16: "L-Button",
  17: "Other",
};

export const getCategoryName = (id) =>
  CATEGORY_MAP[id] || "Unknown Category";
