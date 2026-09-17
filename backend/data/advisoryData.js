export const cropAdvisoryData = [
  {
    id: "crop-rice",
    name: "Paddy / Rice (धान)",
    season: "Kharif",
    durationDays: "115-135 Days",
    idealPh: "5.5 - 7.0 (Clayey / Loamy)",
    seedRatePerAcreKg: 12,
    seedProductId: "seed-01",
    seedProductName: "Golden Harvest Hybrid Paddy (Rice) Seeds",
    fertilizerDosePerAcre: {
      ureaKg: 100, // Nitrogen source
      dapKg: 50,   // Phosphorus + Nitrogen
      mopKg: 40,   // Potassium
      zincSulphateKg: 10,
      vermicompostKg: 300
    },
    suggestedProducts: [
      { id: "seed-01", name: "Hybrid Paddy Seeds MTU 1010", quantity: 3, unit: "5 kg Bag" },
      { id: "fert-01", name: "Organic Earthworm Vermicompost", quantity: 10, unit: "25 kg Bag" },
      { id: "fert-02", name: "Bio-NPK 19:19:19", quantity: 2, unit: "1 kg Pack" },
      { id: "prot-01", name: "BioNeem 10,000 PPM Insecticide", quantity: 1, unit: "1 Litre" }
    ],
    growthStages: [
      { stage: "Basal (Sowing/Transplant)", advice: "Apply full DAP + MOP + 1/3rd Urea + Zinc Sulphate before final puddling." },
      { stage: "Tillering (20-25 DAT)", advice: "Apply 2nd dose of Urea (1/3rd). Spray BioNeem if leaf folder noticed." },
      { stage: "Panicle Initiation (45-50 DAT)", advice: "Apply final 1/3rd dose of Urea. Spray NPK 19:19:19 foliar spray." },
      { stage: "Grain Filling & Milking", advice: "Maintain 2-3 cm shallow water layer. Spray Seaweed Extract for grain shine." }
    ]
  },
  {
    id: "crop-wheat",
    name: "Wheat (गेहूं)",
    season: "Rabi",
    durationDays: "135-145 Days",
    idealPh: "6.0 - 7.5 (Well-drained Loam)",
    seedRatePerAcreKg: 40,
    seedProductId: "seed-02",
    seedProductName: "Certified HD-2967 High Yield Wheat Seeds",
    fertilizerDosePerAcre: {
      ureaKg: 110,
      dapKg: 55,
      mopKg: 35,
      zincSulphateKg: 8,
      vermicompostKg: 250
    },
    suggestedProducts: [
      { id: "seed-02", name: "Certified HD-2967 Wheat Seeds", quantity: 2, unit: "20 kg Sack" },
      { id: "fert-01", name: "Organic Earthworm Vermicompost", quantity: 8, unit: "25 kg Bag" },
      { id: "fert-04", name: "Chelated Micronutrient Fertilizer Mix", quantity: 2, unit: "500g Pack" }
    ],
    growthStages: [
      { stage: "Basal Sowing", advice: "Full DAP + MOP + 50% Urea at the time of seed drilling." },
      { stage: "CRI Stage (21-25 Days)", advice: "First critical irrigation. Top dress 25% Urea." },
      { stage: "Jointing & Booting", advice: "Apply remaining 25% Urea. Spray Chelated Micronutrients." },
      { stage: "Grain Filling", advice: "Foliar spray of 0:0:50 or Bio-NPK for plump grains." }
    ]
  },
  {
    id: "crop-tomato",
    name: "Tomato (टमाटर)",
    season: "All Season",
    durationDays: "120-150 Days",
    idealPh: "6.0 - 6.8 (Sandy Loam / Red Soil)",
    seedRatePerAcreKg: 0.05,
    seedProductId: "seed-03",
    seedProductName: "F1 Hybrid Ruby King Tomato Seeds",
    fertilizerDosePerAcre: {
      ureaKg: 80,
      dapKg: 60,
      mopKg: 50,
      calciumNitrateKg: 25,
      vermicompostKg: 500
    },
    suggestedProducts: [
      { id: "seed-03", name: "F1 Hybrid Ruby King Tomato Seeds", quantity: 1, unit: "Pack of 1000 Seeds" },
      { id: "fert-01", name: "Organic Earthworm Vermicompost", quantity: 15, unit: "25 kg Bag" },
      { id: "prot-01", name: "BioNeem 10,000 PPM Insecticide", quantity: 2, unit: "1 Litre" },
      { id: "tool-02", name: "Automatic Drip Irrigation Kit", quantity: 1, unit: "Kit" }
    ],
    growthStages: [
      { stage: "Nursery / Transplanting", advice: "Treat nursery bed with Trichoderma. Apply vermicompost generously in planting pits." },
      { stage: "Vegetative Growth (15-30 DAT)", advice: "Fertigate with 19:19:19 weekly. Stake plants with bamboo poles." },
      { stage: "Flowering & Fruit Set", advice: "Spray Seaweed bio-stimulant + Calcium Nitrate to prevent blossom end rot." },
      { stage: "Harvesting Period", advice: "Regular harvest every 3-4 days. Maintain adequate soil moisture via drip." }
    ]
  },
  {
    id: "crop-cotton",
    name: "Cotton (कपास)",
    season: "Kharif",
    durationDays: "150-180 Days",
    idealPh: "6.5 - 8.0 (Deep Black Soil)",
    seedRatePerAcreKg: 0.9,
    seedProductId: "seed-05",
    seedProductName: "Bollgard II Desi Hybrid Cotton Seeds",
    fertilizerDosePerAcre: {
      ureaKg: 120,
      dapKg: 60,
      mopKg: 40,
      magnesiumSulphateKg: 15,
      vermicompostKg: 400
    },
    suggestedProducts: [
      { id: "seed-05", name: "Bollgard II Desi Hybrid Cotton Seeds", quantity: 2, unit: "450g Pack" },
      { id: "fert-03", name: "Super-Zyme Liquid Seaweed", quantity: 2, unit: "1 Litre" },
      { id: "prot-01", name: "BioNeem 10,000 PPM Pure Azadirachtin", quantity: 2, unit: "1 Litre" }
    ],
    growthStages: [
      { stage: "Sowing & Germination", advice: "Sow seeds at 3x1.5 feet spacing on ridges. Ensure adequate initial soil moisture." },
      { stage: "Square Formation (45 DAT)", advice: "Apply Urea in splits. Spray BioNeem to control thrips, aphids and whitefly." },
      { stage: "Peak Boll Development", advice: "Spray Magnesium Sulphate (10g/L) + Boron to prevent leaf reddening and boll shedding." },
      { stage: "Boll Bursting & Picking", advice: "Pick clean cotton in dry morning hours. Keep harvested bolls free of moisture." }
    ]
  },
  {
    id: "crop-corn",
    name: "Sweet Corn & Maize (मक्का)",
    season: "Kharif / Rabi",
    durationDays: "80-100 Days",
    idealPh: "5.8 - 7.2",
    seedRatePerAcreKg: 4,
    seedProductId: "seed-04",
    seedProductName: "Golden Sweet Corn F1 Hybrid Seeds",
    fertilizerDosePerAcre: {
      ureaKg: 90,
      dapKg: 50,
      mopKg: 30,
      zincSulphateKg: 10,
      vermicompostKg: 300
    },
    suggestedProducts: [
      { id: "seed-04", name: "Golden Sweet Corn F1 Hybrid Seeds", quantity: 4, unit: "1 kg Pack" },
      { id: "fert-02", name: "Bio-NPK 19:19:19", quantity: 2, unit: "1 kg Pack" },
      { id: "tool-01", name: "16-Litre 2-in-1 Battery Knapsack Sprayer", quantity: 1, unit: "Kit" }
    ],
    growthStages: [
      { stage: "Sowing", advice: "Drill seeds 4-5 cm deep at 60cm row spacing." },
      { stage: "Knee High Stage (30 Days)", advice: "Earthing up operation and 1st top dressing of Urea." },
      { stage: "Tasseling & Silking (50-60 Days)", advice: "Critical moisture stage. Do not allow water stress. Top dress final Nitrogen." },
      { stage: "Cob Maturity & Milk Stage", advice: "Harvest sweet corn when kernel moisture is milky sweet." }
    ]
  }
];

export const cropDiseasesDatabase = [
  {
    id: "dis-01",
    crop: "Tomato / Chilli / Brinjal",
    hindiCrop: "टमाटर / मिर्च / बैंगन",
    symptomName: "Yellow Leaf Curl & Stunted Growth (पत्ती मुड़न रोग)",
    category: "Viral / Sucking Pests",
    symptoms: "Upward curling and puckering of leaves, yellowing of leaf veins, stunted bushy appearance, failure to set flowers and fruits.",
    cause: "Tomato Leaf Curl Virus (ToLCV) transmitted by Whitefly (Bemisia tabaci).",
    immediateAction: "Uproot severely infected plants. Spray systemic insecticide/neem formulation immediately to eliminate whitefly vectors.",
    organicRemedy: "Spray BioNeem 10,000 PPM (3ml/L) + Sticky Yellow Traps (10 per acre).",
    recommendedProductIds: ["prot-01", "tool-01"],
    preventiveTip: "Use virus-resistant hybrid seeds (Ruby King F1) and maintain clean weed-free borders."
  },
  {
    id: "dis-02",
    crop: "Paddy (Rice)",
    hindiCrop: "धान",
    symptomName: "Blast Disease / Spindle Shaped Spots (झुलसा / ब्लास्ट रोग)",
    category: "Fungal",
    symptoms: "Spindle-shaped brown spots with greyish-white center on leaves; black rot on collar and panicle neck leading to empty white heads.",
    cause: "Pyricularia oryzae (Fungus favored by high humidity and excess nitrogen).",
    immediateAction: "Stop excess urea application immediately. Drain field water and spray broad-spectrum fungicide.",
    organicRemedy: "Foliar spray of Trichoderma Viride (5g/L) + Pseudomonas fluorescens.",
    recommendedProductIds: ["prot-02", "prot-03", "tool-01"],
    preventiveTip: "Treat seeds with Trichoderma before sowing; balance Nitrogen with Potash fertilizers."
  },
  {
    id: "dis-03",
    crop: "Wheat / Mustard",
    hindiCrop: "गेहूं / सरसों",
    symptomName: "Yellow Rust & Powdery Mildew (पीला रतुआ व चूर्णिल फफूंद)",
    category: "Fungal",
    symptoms: "Yellow powdery stripes along leaf veins; white powdery fungal patches covering leaf surface during cool humid spells.",
    cause: "Puccinia striiformis fungal spores carried by wind.",
    immediateAction: "Apply curative systemic fungicide spray (Propiconazole / Mancozeb blend) during early morning.",
    organicRemedy: "Spray 2% cow urine + fermented sour butter-milk solution or bio-fungicide.",
    recommendedProductIds: ["prot-03", "fert-04"],
    preventiveTip: "Use certified rust-resistant seed varieties like HD-2967."
  },
  {
    id: "dis-04",
    crop: "Cotton / Vegetables",
    hindiCrop: "कपास / सब्जियां",
    symptomName: "Sucking Pest Attack - Aphids, Thrips, Jassids (माहू, थ्रिप्स व कीट)",
    category: "Insect Pest",
    symptoms: "Leaves curl downwards, sickly yellowing, shiny sticky honeydew secreted on leaves followed by black sooty mold.",
    cause: "Rapid multiplication of sucking insects feeding on cellular sap.",
    immediateAction: "Spray cold-pressed Azadirachtin Neem Oil or Acetamiprid thoroughly under the leaf undersides.",
    organicRemedy: "Neem Oil 10,000 PPM (3ml/L) with 1ml liquid soap as emulsifier.",
    recommendedProductIds: ["prot-01", "tool-01"],
    preventiveTip: "Install blue and yellow sticky traps early in the season."
  },
  {
    id: "dis-05",
    crop: "All Crops & Vegetables",
    hindiCrop: "सभी फसलें",
    symptomName: "Damping-off & Root Rot / Collar Rot (जड़ गलन व उकठा)",
    category: "Soil-borne Fungus",
    symptoms: "Water-soaked brown lesions on seedling stem near soil level, seedlings topple over and die, roots turn black and rot.",
    cause: "Soil fungi Rhizoctonia, Pythium, and Fusarium in waterlogged compacted soils.",
    immediateAction: "Drench root zone with Bio-Fungicide Trichoderma Viride or Copper Oxychloride. Improve drainage immediately.",
    organicRemedy: "Mix 2 kg Trichoderma in 100 kg vermicompost and apply directly to plant root bases.",
    recommendedProductIds: ["prot-02", "fert-01"],
    preventiveTip: "Ensure raised seed beds and never overwater seedlings."
  }
];
