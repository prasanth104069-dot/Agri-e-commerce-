export const initialProducts = [
  // ==================== DAIRY PRODUCTS & CATTLE CARE ====================
  {
    id: "dairy-01",
    name: "Pure Vedic A2 Gir Cow Bilona Cultured Ghee (Hand-Churned)",
    hindiName: "शुद्ध वैदिक A2 गिर गाय बिलोना घी (मिट्टी के बर्तन में मंथित)",
    category: "dairy",
    subCategory: "Pure Desi Ghee",
    brand: "GauAmrit Vedic Dairy",
    price: 1650,
    originalPrice: 2100,
    unit: "1 Litre Glass Jar",
    rating: 5.0,
    reviewsCount: 340,
    stock: 120,
    isOrganic: true,
    badge: "100% Vedic A2",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    description: "Prepared from free-grazing indigenous Gir cows milk using the traditional 5-stage Vedic Bilona method (Curd to Makkhan to Ghee on slow woodfire). Rich in golden granules, natural Beta-Carotene, Omega 3-6-9, and Butyric acid.",
    dosageGuide: "1-2 tablespoons daily in warm milk or over hot rotis / dal.",
    suitableCrops: ["Daily Family Health", "Ayurvedic Nutrition", "Immunity Booster"],
    features: [
      "Made purely from A2 whole milk curd (Bilona hand-churned)",
      "Free from hormones, oxytocin, preservatives, and GMOs",
      "Traditional grainy texture (दानेदार) with rich Vedic aroma",
      "Lab tested for 0% adulteration and 100% pure A2 beta-casein"
    ],
    manufacturerInfo: {
      name: "GauAmrit Vedic Dairy Farms Collective",
      license: "FSSAI-1152104000088",
      origin: "Gir Somnath, Gujarat"
    }
  },
  {
    id: "dairy-02",
    name: "Farm-Fresh Organic Malai Paneer (Vacuum Sealed, Zero Preservatives)",
    hindiName: "खेत-ताजा जैविक मलाई पनीर (100% शुद्ध मलाईदार)",
    category: "dairy",
    subCategory: "Fresh Dairy",
    brand: "GauAmrit Vedic Dairy",
    price: 240,
    originalPrice: 320,
    unit: "500g Vacuum Pack",
    rating: 4.9,
    reviewsCount: 180,
    stock: 90,
    isOrganic: true,
    badge: "Farm Fresh",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-soft melt-in-mouth cottage cheese (Paneer) crafted purely from single-origin farm whole milk. High protein (20g per 100g) with zero chemical stabilizers or starch.",
    dosageGuide: "Store refrigerated below 4°C. Consume within 7 days of opening.",
    suitableCrops: ["Daily Protein Nutrition", "Culinary Use"],
    features: [
      "Made fresh every morning within 3 hours of milking",
      "Vacuum packed under sterile hygienic nitrogen flush",
      "Ultra-soft texture that absorbs gravies perfectly",
      "Zero added palm oil or artificial coagulants"
    ],
    manufacturerInfo: {
      name: "GauAmrit Micro Dairy Plant",
      license: "FSSAI-1152104000089",
      origin: "Indore Dairy Hub, MP"
    }
  },
  {
    id: "dairy-03",
    name: "Traditional Cultured Desi White Butter (Makhan / Loni)",
    hindiName: "पारंपरिक देसी सफेद मक्खन (ताजा लोणी)",
    category: "dairy",
    subCategory: "Fresh Butter",
    brand: "Kisan Dairy Co-op",
    price: 310,
    originalPrice: 390,
    unit: "500g Eco-Pack",
    rating: 4.9,
    reviewsCount: 145,
    stock: 75,
    isOrganic: true,
    badge: "Hand Churned",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    description: "Unsalted pure white butter obtained by churning slow-fermented whole milk curd. Contains natural milk probiotics, Vitamin A, and beneficial fatty acids.",
    dosageGuide: "Perfect topping on hot parathas, thalipeeth, and bajra rotis.",
    suitableCrops: ["Home Kitchens", "Breakfasts"],
    features: [
      "100% Unsalted natural cultured white butter",
      "Rich in natural probiotics for gut wellness",
      "Zero artificial colors or preservatives",
      "Daily fresh churn batch delivery"
    ],
    manufacturerInfo: {
      name: "Malwa Cooperative Dairy Federation",
      license: "FSSAI-1141985000012",
      origin: "Dewas, Madhya Pradesh"
    }
  },
  {
    id: "dairy-04",
    name: "Automatic 25-Litre Single Bucket Electric Cow Milking Machine",
    hindiName: "ऑटोमैटिक 25L स्टेनलेस स्टील गाय दुहने की मशीन",
    category: "dairy",
    subCategory: "Dairy Machinery",
    brand: "AgroDairy Tech",
    price: 18500,
    originalPrice: 24900,
    unit: "1 Complete Machine Kit",
    rating: 4.9,
    reviewsCount: 88,
    stock: 25,
    isOrganic: false,
    badge: "Farmer Special",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80",
    description: "Commercial grade 0.75 HP oil-lubricated vacuum pump milking machine with food-grade SS 304 bucket (25 Litre). Milks 1 cow in 4-5 minutes with natural pulsating action (60 pulsations/min) simulating gentle calf sucking.",
    dosageGuide: "Milks 10-12 cows or buffaloes per hour with single operator.",
    suitableCrops: ["Dairy Farms", "Goushalas", "Cattle Sheds"],
    features: [
      "Food-grade silicone liners gentle on cow teats prevents mastitis",
      "Stainless steel 304 sanitary grade bucket (25L)",
      "High vacuum stability with precision pressure regulator",
      "2-Year Motor Warranty with all-India doorstep technician support"
    ],
    manufacturerInfo: {
      name: "AgroDairy Automation Systems",
      license: "ISO-DAIRY-9001-2022",
      origin: "Ludhiana, Punjab"
    }
  },
  {
    id: "dairy-05",
    name: "Cattle Mineral Mixture Ultra (Chelated Zinc, Selenium & Vitamin H)",
    hindiName: "पशु आहार चिलेटेड मिनरल मिक्सचर (विटामिन H व सेलेनियम युक्त)",
    category: "dairy",
    subCategory: "Animal Nutrition",
    brand: "VetCare Animal Health",
    price: 690,
    originalPrice: 890,
    unit: "5 kg Bucket",
    rating: 4.8,
    reviewsCount: 210,
    stock: 160,
    isOrganic: false,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80",
    description: "Specially formulated enriched mineral feed supplement with chelated Zinc, Copper, Cobalt, Iodine, Chromium, Vitamin A, D3, E, and Vitamin H (Biotin) to enhance conception rates and increase milk fat & SNF.",
    dosageGuide: "50 grams daily mixed with morning cattle feed or wheat bran.",
    suitableCrops: ["Dairy Cows", "Buffaloes", "Breeding Cattle"],
    features: [
      "Chelated trace minerals for 90%+ bio-absorption",
      "Prevents repeat breeding and improves herd fertility",
      "Increases daily milk yield by 1 to 2 litres",
      "Enhances udder immunity against sub-clinical mastitis"
    ],
    manufacturerInfo: {
      name: "VetCare Animal Health Labs",
      license: "BIS-VET-MIX-409",
      origin: "Hyderabad, Telangana"
    }
  },
  {
    id: "dairy-06",
    name: "Fermented Sweet Corn Green Fodder Silage Bale (Probiotic Enriched)",
    hindiName: "फर्मेंटेड मक्का हरा चारा साइलेज गांठ (100 किग्रा)",
    category: "dairy",
    subCategory: "Cattle Fodder",
    brand: "Kisan Silage Co.",
    price: 850,
    originalPrice: 1100,
    unit: "100 kg Packed Bale",
    rating: 4.9,
    reviewsCount: 160,
    stock: 200,
    isOrganic: true,
    badge: "High Energy",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80",
    description: "High-protein green corn fodder harvested at the milk-dough stage, chopped, inoculated with Lactobacillus cultures, and hydraulically compressed under 100% anaerobic film. Solves green fodder scarcity all year round.",
    dosageGuide: "Feed 15-20 kg per cow/buffalo daily along with dry roughage.",
    suitableCrops: ["Milking Dairy Cattle", "Goats", "Sheep"],
    features: [
      "Rich in natural lactic acid, digestible starches, and fiber",
      "Maintains constant milk production during dry summer months",
      "Airtight multi-layer UV protected film lasts 18 months without spoilage",
      "Palatable sweet aroma that cattle consume with zero wastage"
    ],
    manufacturerInfo: {
      name: "Kisan Fodder & Silage Technologies",
      license: "AGRI-SILAGE-2023",
      origin: "Nashik, Maharashtra"
    }
  },

  // ==================== AGRI HARVEST & DIRECT FARM PRODUCE ====================
  {
    id: "agri-01",
    name: "Cold-Pressed Wood Churned Pure Yellow Mustard Oil (Kachi Ghani)",
    hindiName: "लकड़ी की घानी का शुद्ध पीली सरसों का तेल (कच्ची घानी)",
    category: "produce",
    subCategory: "Cold Pressed Oils",
    brand: "Gramin Pure Harvest",
    price: 1050,
    originalPrice: 1350,
    unit: "5 Litre Food-Grade Tin",
    rating: 5.0,
    reviewsCount: 290,
    stock: 140,
    isOrganic: true,
    badge: "Wood Pressed",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    description: "Extracted in traditional wooden Kolhu (लकड़ी की घानी) at slow speeds (<35°C) to keep natural pungent allylisothiocyanate aroma, vitamins A & E, and healthy Omega-3 fatty acids intact.",
    dosageGuide: "For daily cooking, deep frying, pickles, and body massage.",
    suitableCrops: ["Daily Health Cooking", "Pickles & Preservation"],
    features: [
      "Zero heat extraction preserves 100% natural micro-nutrients",
      "Zero chemical solvent extraction, zero added argemone",
      "High smoke point ideal for traditional Indian cooking",
      "Packed in food-grade recyclable tin to protect against light oxidation"
    ],
    manufacturerInfo: {
      name: "Gramin Organic Oil Millers Collective",
      license: "FSSAI-1222002500011",
      origin: "Bharatpur, Rajasthan"
    }
  },
  {
    id: "agri-02",
    name: "Direct Farmer Organic Royal 1121 Extra Long Basmati Rice",
    hindiName: "सीधे किसान से - जैविक रॉयल 1121 बासमती चावल",
    category: "produce",
    subCategory: "Organic Grains",
    brand: "Kisan Direct",
    price: 890,
    originalPrice: 1150,
    unit: "10 kg Bag",
    rating: 4.9,
    reviewsCount: 380,
    stock: 250,
    isOrganic: true,
    badge: "Direct Farmer",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    description: "Organically grown 2-year naturally aged 1121 Basmati Rice harvested directly by farmer cooperatives in the foothills of Himalayas. Cooks to 2.5x length with heavenly aroma.",
    dosageGuide: "Soak for 30 minutes before cooking for maximum grain elongation.",
    suitableCrops: ["Consumer Kitchens", "Hotels", "Festivals"],
    features: [
      "100% pesticide-free, unpolished natural whole grain",
      "Aged naturally for 24 months to ensure non-sticky fluffy cooking",
      "Direct farmer price - eliminating all intermediate middlemen",
      "Vacuum packed to retain natural field freshness"
    ],
    manufacturerInfo: {
      name: "Doon Valley Organic Farmers Collective",
      license: "FSSAI-100200420001",
      origin: "Dehradun, Uttarakhand"
    }
  },
  {
    id: "agri-03",
    name: "Organic High-Curcumin Lakadong Turmeric Powder (7.5% Curcumin)",
    hindiName: "जैविक लकाडोंग हल्दी पाउडर (7.5% उच्च करक्यूमिन)",
    category: "produce",
    subCategory: "Farm Spices",
    brand: "Himalayan Herbs & Spices",
    price: 360,
    originalPrice: 480,
    unit: "500g Zip Pouch",
    rating: 4.9,
    reviewsCount: 165,
    stock: 130,
    isOrganic: true,
    badge: "High Curcumin",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    description: "World famous Lakadong turmeric grown naturally in Meghalaya with unmatched 7.0 - 8.0% natural Curcumin content (standard turmeric contains only 2%). Supercharged anti-inflammatory and antioxidant potency.",
    dosageGuide: "1/2 teaspoon daily in warm golden milk (Haldi Doodh) or culinary dishes.",
    suitableCrops: ["Immunity", "Ayurvedic Health", "Cooking"],
    features: [
      "Verified 7.5% active Curcumin (Lab Certificate enclosed)",
      "Zero lead chromate, zero artificial yellow dyes",
      "Stone ground at low temperature to preserve essential oils",
      "Directly sourced from indigenous women farming collectives"
    ],
    manufacturerInfo: {
      name: "Jaintia Hills Organic Producer Co.",
      license: "FSSAI-1182100100004",
      origin: "Meghalaya, India"
    }
  },
  {
    id: "agri-04",
    name: "Unpolished Organic Desi Brown Chana / Chickpeas (High Fiber)",
    hindiName: "अनपॉलिश जैविक देसी चना (उच्च प्रोटीन व फाइबर)",
    category: "produce",
    subCategory: "Pulses & Legumes",
    brand: "Kisan Direct",
    price: 490,
    originalPrice: 650,
    unit: "5 kg Sack",
    rating: 4.8,
    reviewsCount: 190,
    stock: 220,
    isOrganic: true,
    badge: "Unpolished",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80",
    description: "Farm-fresh unpolished small-grain Desi Chana harvested from rain-fed organic fields in Madhya Pradesh. Extremely rich in plant protein, dietary fiber, and iron.",
    dosageGuide: "Soak overnight for 8 hours for delicious curries, sprouts, or roasted chana.",
    suitableCrops: ["Daily Health Protein", "Sprouting"],
    features: [
      "Zero water/oil polishing preserves the mineral-rich outer bran",
      "High germination rate >95% (ideal for daily nutrient-dense sprouts)",
      "Chemical fertilizer & pesticide-free crop",
      "Naturally sun-dried for extended 12-month shelf life"
    ],
    manufacturerInfo: {
      name: "Narmada Valley Farmers Cooperative",
      license: "FSSAI-1142085000044",
      origin: "Hoshangabad, MP"
    }
  },
  {
    id: "agri-05",
    name: "Pure Raw Unprocessed Mustard & Multiflora Farm Honey",
    hindiName: "शुद्ध कच्चा सरसों व वनफूल प्राकृतिक शहद",
    category: "produce",
    subCategory: "Farm Harvest",
    brand: "Apiary Pure",
    price: 450,
    originalPrice: 600,
    unit: "1 kg Glass Jar",
    rating: 5.0,
    reviewsCount: 215,
    stock: 95,
    isOrganic: true,
    badge: "100% Raw",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    description: "Unpasteurized, unheated pure raw honey extracted directly from bee boxes placed in flowering mustard and wildflower fields. Loaded with active enzymes, pollen, and propolis.",
    dosageGuide: "1-2 teaspoons daily with warm water or milk.",
    suitableCrops: ["Immunity", "Daily Nutrition"],
    features: [
      "Zero added sugar, corn syrup, or artificial preservatives",
      "Retains natural flower pollen and antioxidants",
      "NMR tested for 100% purity and zero adulteration",
      "Bottled fresh at the farm site"
    ],
    manufacturerInfo: {
      name: "Sundarbans & Himalayan Beekeepers Cooperative",
      license: "FSSAI-122180260004",
      origin: "Himachal Pradesh, India"
    }
  },

  // ==================== SEEDS & HYBRIDS ====================
  {
    id: "seed-01",
    name: "Golden Harvest Hybrid Paddy (Rice) Seeds - MTU 1010",
    hindiName: "गोल्डन हार्वेस्ट हाइब्रिड धान बीज",
    category: "seeds",
    subCategory: "Paddy & Grains",
    brand: "KrishiVeda Seeds",
    price: 650,
    originalPrice: 850,
    unit: "5 kg Bag",
    rating: 4.8,
    reviewsCount: 142,
    stock: 450,
    isOrganic: true,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    description: "High-yield hybrid paddy seeds certified for superior disease resistance against bacterial leaf blight. Maturity period 115-120 days with long slender aromatic grains.",
    dosageGuide: "10-12 kg per acre for transplantation; 15-20 kg per acre for direct seeding.",
    suitableCrops: ["Paddy / Rice"],
    season: "Kharif",
    features: [
      "High tillering capacity (20-25 tillers per plant)",
      "Tolerant to drought and common blast",
      "Expected yield: 28-32 Quintals / Acre",
      "Certified germination rate > 92%"
    ],
    manufacturerInfo: {
      name: "KrishiVeda Agro Genetics Ltd.",
      license: "AGR-SEED-2024-8841",
      origin: "Hyderabad, India"
    }
  },
  {
    id: "seed-02",
    name: "Certified HD-2967 High Yield Wheat Seeds",
    hindiName: "प्रमाणित HD-2967 उच्च उपज गेहूं बीज",
    category: "seeds",
    subCategory: "Wheat & Grains",
    brand: "Bharat Agro",
    price: 1150,
    originalPrice: 1400,
    unit: "20 kg Sack",
    rating: 4.9,
    reviewsCount: 230,
    stock: 320,
    isOrganic: false,
    badge: "Govt Certified",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    description: "Most popular wheat variety with exceptional chapati making qualities and robust resistance against yellow and brown rust. Suitable for timely sown irrigated conditions.",
    dosageGuide: "40-45 kg per acre.",
    suitableCrops: ["Wheat"],
    season: "Rabi",
    features: [
      "Maturity in 140-145 days",
      "High protein content (12.5%)",
      "Yield potential: 22-26 Quintals / Acre",
      "Resistant to lodging and shattering"
    ],
    manufacturerInfo: {
      name: "National Seeds Corporation Certified",
      license: "NSC-WHT-9921",
      origin: "Punjab, India"
    }
  },
  {
    id: "seed-03",
    name: "F1 Hybrid Ruby King Tomato Seeds (Heavy Yielder)",
    hindiName: "F1 हाइब्रिड रूबी किंग टमाटर बीज",
    category: "seeds",
    subCategory: "Vegetable Seeds",
    brand: "Namdhari Seeds",
    price: 420,
    originalPrice: 550,
    unit: "Pack of 1000 Seeds",
    rating: 4.7,
    reviewsCount: 89,
    stock: 180,
    isOrganic: true,
    badge: "Hot Deal",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    description: "Firm, deep red, attractive oval-to-square fruits averaging 90-110 grams. Highly tolerant to Tomato Leaf Curl Virus (ToLCV) and Bacterial Wilt with excellent shelf life for long-distance transport.",
    dosageGuide: "40-50 grams seeds (approx. 10,000 seeds) required per acre.",
    suitableCrops: ["Tomato", "Vegetables"],
    season: "All Season",
    features: [
      "First harvest starts 60-65 days after transplanting",
      "High firmness for distant transit",
      "Average yield: 30-35 Tons / Acre",
      "Thick pericarp with sweet-tangy taste"
    ],
    manufacturerInfo: {
      name: "Namdhari Agro Hybrids",
      license: "NH-VEG-2023-411",
      origin: "Bengaluru, India"
    }
  },
  {
    id: "seed-04",
    name: "Golden Sweet Corn F1 Hybrid Seeds - Super Sugar 75",
    hindiName: "गोल्डन स्वीट कॉर्न हाइब्रिड बीज",
    category: "seeds",
    subCategory: "Corn & Maize",
    brand: "Advanta Seeds",
    price: 780,
    originalPrice: 950,
    unit: "1 kg Pack",
    rating: 4.6,
    reviewsCount: 64,
    stock: 120,
    isOrganic: true,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80",
    description: "Ultra-sweet tender yellow kernels with exceptional sweetness (>15% Brix). Uniform cob size with complete tip filling and attractive green husks.",
    dosageGuide: "3-4 kg seeds per acre with 60cm x 20cm spacing.",
    suitableCrops: ["Corn", "Maize"],
    season: "Kharif / Summer",
    features: [
      "Harvest in 75-80 days",
      "High market demand from fresh and processing markets",
      "High recovery rate of kernels (40-42%)",
      "Strong root anchorage prevents lodging"
    ],
    manufacturerInfo: {
      name: "Advanta Global Seeds",
      license: "ADV-CRN-554",
      origin: "Hyderabad, India"
    }
  },
  {
    id: "seed-05",
    name: "Bollgard II Desi Hybrid Cotton Seeds (Bollworm Protected)",
    hindiName: "बोलगार्ड II हाइब्रिड कपास बीज",
    category: "seeds",
    subCategory: "Cash Crops",
    brand: "Rasi Seeds",
    price: 860,
    originalPrice: 990,
    unit: "450g Pack + 120g Non-Bt Refuge",
    rating: 4.8,
    reviewsCount: 178,
    stock: 210,
    isOrganic: false,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80",
    description: "Premier cotton seeds engineered with dual-gene protection against American Bollworm, Pink Bollworm, and Spotted Bollworm. Features large bolls with superior fibre length.",
    dosageGuide: "2 packets (900g) per acre.",
    suitableCrops: ["Cotton"],
    season: "Kharif",
    features: [
      "Heavy boll bearing (80-100 bolls/plant)",
      "Staple length: 29.5 - 30.5 mm",
      "Gin turnout: 36-37%",
      "Tolerant to sucking pests during vegetative stage"
    ],
    manufacturerInfo: {
      name: "Rasi Seeds Pvt Ltd",
      license: "RASI-CTN-773",
      origin: "Attur, Tamil Nadu"
    }
  },

  // ==================== FERTILIZERS & SOIL HEALTH ====================
  {
    id: "fert-01",
    name: "100% Organic Earthworm Vermicompost (Nutrient Dense)",
    hindiName: "100% जैविक केंचुआ खाद (वर्मीकम्पोस्ट)",
    category: "fertilizers",
    subCategory: "Organic Fertilizers",
    brand: "BioVriksha",
    price: 399,
    originalPrice: 599,
    unit: "25 kg Bag",
    rating: 4.9,
    reviewsCount: 310,
    stock: 500,
    isOrganic: true,
    badge: "Organic Certified",
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=600&q=80",
    description: "Premium pure vermicompost enriched with beneficial microbial flora, humus, and slow-release nitrogen, phosphorus, and potassium. Restores degraded soil and enhances root aeration.",
    dosageGuide: "200-400 kg per acre for field crops; 1-2 kg per plant for fruit trees/gardens.",
    suitableCrops: ["All Crops", "Vegetables", "Paddy", "Wheat", "Fruit Orchards"],
    features: [
      "Rich in organic carbon (>18%) and humic substances",
      "Increases soil water holding capacity by 40%",
      "Free from weed seeds and harmful pathogens (ICAR tested)",
      "Promotes deep root proliferation"
    ],
    manufacturerInfo: {
      name: "BioVriksha Organic Farms",
      license: "NPOP/NAB/0014",
      origin: "Pune, Maharashtra"
    }
  },
  {
    id: "fert-02",
    name: "Water Soluble Bio-NPK 19:19:19 (Balanced Fertilizer)",
    hindiName: "जल घुलनशील NPK 19:19:19 उर्वरक",
    category: "fertilizers",
    subCategory: "Chemical & Soluble",
    brand: "IFFCO Nano",
    price: 520,
    originalPrice: 650,
    unit: "1 kg Pack",
    rating: 4.8,
    reviewsCount: 195,
    stock: 400,
    isOrganic: false,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22500?auto=format&fit=crop&w=600&q=80",
    description: "100% water-soluble foliar spray and fertigation grade NPK in equal balance. Enhances overall vegetative growth, healthy branch formation, and uniform fruit sizing.",
    dosageGuide: "Foliar spray: 5g per litre of water (1 kg in 200L water per acre); Fertigation: 2-3 kg/acre.",
    suitableCrops: ["All Crops", "Tomato", "Cotton", "Sugarcane", "Rice", "Chilli"],
    features: [
      "Instant absorption through leaf stomata",
      "Fully free of chlorine and heavy metals",
      "Compatible with most fungicides and insecticides",
      "Boosts chlorophyll and green canopy development"
    ],
    manufacturerInfo: {
      name: "IFFCO Fertilizer Complex",
      license: "FCO-NPK-8819",
      origin: "Kandla, Gujarat"
    }
  },
  {
    id: "fert-03",
    name: "Super-Zyme Liquid Seaweed Plant Growth Bio-Stimulant",
    hindiName: "सुपर-जाइम समुद्री शैवाल अर्क बायो-स्टिमुलेंट",
    category: "fertilizers",
    subCategory: "Bio-Stimulants & Tonics",
    brand: "AgroNutri Plus",
    price: 680,
    originalPrice: 890,
    unit: "1 Litre Bottle",
    rating: 4.7,
    reviewsCount: 114,
    stock: 240,
    isOrganic: true,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1585336261024-64949a212724?auto=format&fit=crop&w=600&q=80",
    description: "Cold-processed marine Ascophyllum Nodosum seaweed extract loaded with 60+ trace minerals, natural cytokinins, auxins, and gibberellins to protect crops against climate stress.",
    dosageGuide: "2-3 ml per litre of water for foliar spray at vegetative and flowering stages.",
    suitableCrops: ["Vegetables", "Cotton", "Pulses", "Fruits", "Paddy"],
    features: [
      "Reduces flower and fruit drop by up to 35%",
      "Provides abiotic stress tolerance (heat, frost, drought)",
      "Increases sugar concentration (Brix) and fruit shine",
      "100% natural and safe for honeybees"
    ],
    manufacturerInfo: {
      name: "AgroNutri Biosciences",
      license: "BIO-NUTRI-2023",
      origin: "Kochi, Kerala"
    }
  },
  {
    id: "fert-04",
    name: "Chelated Micronutrient Fertilizer Mix (Zn, Fe, Mn, Cu, B, Mo)",
    hindiName: "चिलेटेड सूक्ष्म पोषक तत्व मिश्रण (जिंक, बोरॉन, आयरन)",
    category: "fertilizers",
    subCategory: "Micronutrients",
    brand: "Mahadhan",
    price: 340,
    originalPrice: 420,
    unit: "500g Pack",
    rating: 4.8,
    reviewsCount: 76,
    stock: 190,
    isOrganic: false,
    badge: "Essential",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    description: "100% EDTA chelated multi-micronutrient formula specifically designed to correct yellowing, stunted growth, and micronutrient deficiencies in crops.",
    dosageGuide: "1-1.5 grams per litre of water (200-250g per acre).",
    suitableCrops: ["Paddy", "Wheat", "Sugarcane", "Citrus", "Vegetables", "Onion"],
    features: [
      "Highly stable across soil and spray water pH 4.0 - 8.0",
      "Quick greening effect visible within 72 hours",
      "Prevents zinc chlorosis and 'khaira' disease in rice",
      "Ensures robust reproductive bud development"
    ],
    manufacturerInfo: {
      name: "Mahadhan Agro Chemicals",
      license: "MDH-MIC-4091",
      origin: "Taloja, Maharashtra"
    }
  },

  // ==================== CROP PROTECTION & BIO-PESTICIDES ====================
  {
    id: "prot-01",
    name: "BioNeem 10,000 PPM Pure Azadirachtin Organic Insecticide",
    hindiName: "बायोनीम 10,000 PPM शुद्ध नीम तेल कीटनाशक",
    category: "protection",
    subCategory: "Organic Insecticides",
    brand: "KrishiRaksha",
    price: 750,
    originalPrice: 950,
    unit: "1 Litre Bottle",
    rating: 4.9,
    reviewsCount: 205,
    stock: 280,
    isOrganic: true,
    badge: "Organic Certified",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
    description: "High potency cold-pressed neem seed extract containing 10,000 PPM Azadirachtin. Controls over 200 species of chewing, sucking, and boring pests without killing beneficial pollinators.",
    dosageGuide: "2-3 ml per litre of water. Spray during early morning or late evening.",
    suitableCrops: ["All Vegetables", "Cotton", "Paddy", "Fruits", "Spices", "Pulses"],
    features: [
      "Multi-action: Anti-feedant, repellent, egg-laying deterrent & IGR",
      "Zero harvest waiting period / Zero chemical residue",
      "Does not create pest resistance or resurgence",
      "Certified for organic export farming (APEDA compliant)"
    ],
    manufacturerInfo: {
      name: "KrishiRaksha Bio Solutions",
      license: "CIB-RC-NEEM-402",
      origin: "Coimbatore, Tamil Nadu"
    }
  },
  {
    id: "prot-02",
    name: "Trichoderma Viride Bio-Fungicide (Root Rot & Wilt Protector)",
    hindiName: "ट्राइकोडर्मा विरिडी जैव कवकनाशी (उकठा व जड़ गलन रोधी)",
    category: "protection",
    subCategory: "Bio-Fungicides",
    brand: "Sanjivani Bio",
    price: 290,
    originalPrice: 380,
    unit: "1 kg Powder",
    rating: 4.8,
    reviewsCount: 162,
    stock: 350,
    isOrganic: true,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    description: "Beneficial antagonistic fungus that attacks and parasitizes pathogenic fungi such as Fusarium wilt, Rhizoctonia root rot, Pythium damping-off, and Phytophthora.",
    dosageGuide: "Seed treatment: 5-10g/kg seed; Soil application: 2-3 kg mixed with 100 kg FYM/vermicompost per acre.",
    suitableCrops: ["Paddy", "Tomato", "Chilli", "Cotton", "Pulses", "Ginger", "Potato"],
    features: [
      "High CFU count (>2 x 10^8 spores per gram)",
      "Protects young seedlings from damping-off and collar rot",
      "Promotes plant root growth hormone synthesis",
      "100% eco-friendly and safe for earthworms"
    ],
    manufacturerInfo: {
      name: "Sanjivani Bio-Tech Labs",
      license: "CIB-BIO-TRI-19",
      origin: "Anand, Gujarat"
    }
  },
  {
    id: "prot-03",
    name: "Safex Broad Spectrum Systemic + Contact Fungicide (Mancozeb + Carbendazim)",
    hindiName: "सैफेक्स कवकनाशी (मैनकोजेब + कार्बेन्डाजिम)",
    category: "protection",
    subCategory: "Chemical Fungicides",
    brand: "Kisan Guard",
    price: 480,
    originalPrice: 600,
    unit: "500g Pack",
    rating: 4.7,
    reviewsCount: 88,
    stock: 190,
    isOrganic: false,
    badge: "Hot Deal",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80",
    description: "Dual-action proven fungicide combination (Carbendazim 12% + Mancozeb 63% WP) providing immediate curative and long-lasting preventive protection against leaf spots, blast, and blights.",
    dosageGuide: "2 grams per litre of water (400g per acre).",
    suitableCrops: ["Paddy", "Groundnut", "Tomato", "Potato", "Grapes", "Chilli"],
    features: [
      "Controls early and late blight, powdery mildew, and anthracnose",
      "Rain-fastness within 2 hours of application",
      "Contains Manganese and Zinc for better foliage vitality",
      "Broad-spectrum safety across major field crops"
    ],
    manufacturerInfo: {
      name: "Kisan Guard Crop Care",
      license: "CIB-FUNG-819",
      origin: "Vapi, Gujarat"
    }
  },

  // ==================== FARM TOOLS & MACHINERY ====================
  {
    id: "tool-01",
    name: "16-Litre 2-in-1 Dual Battery + Manual Knapsack Agriculture Sprayer",
    hindiName: "16 लीटर बैटरी + मैनुअल 2-इन-1 कृषि स्प्रेयर",
    category: "machinery",
    subCategory: "Sprayers & Pumps",
    brand: "AgroMaster Pro",
    price: 2650,
    originalPrice: 3800,
    unit: "Complete Kit",
    rating: 4.9,
    reviewsCount: 420,
    stock: 85,
    isOrganic: false,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1617953141905-b27fb1f17d88?auto=format&fit=crop&w=600&q=80",
    description: "Heavy-duty 12V 12AH rechargeable battery sprayer equipped with high-pressure motor (110 PSI), stainless steel extendable telescopic lance, and 4 brass nozzles for uniform misting.",
    dosageGuide: "Covers 15-20 spray tanks (up to 3 acres) on a single 4-hour battery charge.",
    suitableCrops: ["All Crops", "Orchards", "Horticulture", "Garden"],
    features: [
      "Dual mode: Works on battery and switches to manual hand pump if battery drains",
      "Includes 4 interchangeable nozzles (Cone, Fan, Dual & Shower)",
      "High quality padded shoulder straps with lumbar cushion",
      "1-Year Motor & Battery replacement warranty"
    ],
    manufacturerInfo: {
      name: "AgroMaster Machinery Corp",
      license: "ISI-AGRI-PUMP-900",
      origin: "Rajkot, Gujarat"
    }
  },
  {
    id: "tool-02",
    name: "Automatic Drip Irrigation Kit with Pressure Compensating Drippers (100 Plants)",
    hindiName: "ऑटोमैटिक ड्रिप सिंचाई किट (100 पौधों हेतु)",
    category: "machinery",
    subCategory: "Irrigation Systems",
    brand: "Jain Drip Tech",
    price: 1850,
    originalPrice: 2499,
    unit: "Complete 100-Emitter System",
    rating: 4.8,
    reviewsCount: 147,
    stock: 60,
    isOrganic: false,
    badge: "Water Saver",
    image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80",
    description: "Commercial grade UV-resistant 16mm main line pipe + 4mm feeder tubes, 100 clog-free micro drippers, punch tool, barbs, end caps, and tap connector. Saves up to 70% water.",
    dosageGuide: "Supports up to 100 plants, vegetables, or fruit trees in rows up to 150 feet.",
    suitableCrops: ["Vegetables", "Orchards", "Cotton", "Polyhouse", "Home Garden"],
    features: [
      "Saves 60-70% water compared to flood irrigation",
      "Prevents weed growth between crop rows",
      "Supports liquid fertigation directly to root zones",
      "UV-stabilized virgin polymer lasts 5+ years in open sun"
    ],
    manufacturerInfo: {
      name: "Jain Precision Irrigation Ltd",
      license: "JIN-DRIP-2023",
      origin: "Jalgaon, Maharashtra"
    }
  },
  {
    id: "tool-03",
    name: "Digital 4-in-1 Soil pH, Moisture, Temperature & Sunlight Meter",
    hindiName: "डिजिटल 4-इन-1 मिट्टी pH व नमी परीक्षक मीटर",
    category: "machinery",
    subCategory: "Soil Testing Devices",
    brand: "KrishiSense",
    price: 999,
    originalPrice: 1599,
    unit: "1 Unit Device",
    rating: 4.7,
    reviewsCount: 184,
    stock: 140,
    isOrganic: false,
    badge: "Smart Agri",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80",
    description: "Instant soil diagnostic tool with 200mm high-sensitivity aluminum probe. Features a backlit digital LCD display measuring soil pH (3.5 to 9.0), moisture level (5 stages), temp (-9°C to 50°C), and sunlight lux.",
    dosageGuide: "Insert probe 4-5 inches into moist farm soil for 10 seconds to get instant digital readings.",
    suitableCrops: ["All Soils", "Paddy", "Wheat", "Greenhouses", "Vegetables"],
    features: [
      "Large backlit green LCD screen for bright sunlight visibility",
      "High accuracy sensor with instant temperature compensation",
      "Helps detect soil acidity/alkalinity for optimal fertilizer use",
      "Auto power-off feature with low battery indicator"
    ],
    manufacturerInfo: {
      name: "KrishiSense Agrotech Electronics",
      license: "KS-MTR-882",
      origin: "Bengaluru, Karnataka"
    }
  },
  {
    id: "tool-04",
    name: "Heavy-Duty SK5 Steel Orchard Pruning Shears & Grafting Secateur",
    hindiName: "SK5 स्टील बागवानी प्रूनिंग कटर व सिकेट्यूर",
    category: "machinery",
    subCategory: "Hand Tools",
    brand: "Falcon Tools",
    price: 499,
    originalPrice: 799,
    unit: "1 Tool",
    rating: 4.9,
    reviewsCount: 310,
    stock: 220,
    isOrganic: false,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1599685315640-9ceab2f58944?auto=format&fit=crop&w=600&q=80",
    description: "Forged Japanese SK-5 carbon steel blades engineered for razor sharp, effortless branch cutting up to 25mm diameter. Features ergonomic non-slip shock-absorbing rubber grips and safety thumb lock.",
    dosageGuide: "Ideal for canopy trimming, dead wood removal, and crop pruning in fruits and vegetables.",
    suitableCrops: ["Fruit Trees", "Grapevines", "Tomato", "Cotton", "Roses", "Nurseries"],
    features: [
      "Ultra-hard SK5 carbon steel stays sharp 3x longer",
      "Sap groove design prevents sticking during gummy plant trimming",
      "Heavy duty spring reduces hand fatigue during long farm shifts",
      "Includes spare spring and blade tightening tool"
    ],
    manufacturerInfo: {
      name: "Falcon Agro Tools India",
      license: "FLC-TOOL-903",
      origin: "Ludhiana, Punjab"
    }
  }
];

export const initialCategories = [
  {
    id: "all",
    name: "All Products",
    hindiName: "सभी उत्पाद",
    icon: "LayoutGrid",
    itemCount: 23,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: "dairy",
    name: "Dairy & Cattle Care",
    hindiName: "डेयरी उत्पाद व पशुपालन",
    icon: "Milk",
    itemCount: 6,
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "produce",
    name: "Farm Harvest & Produce",
    hindiName: "किसान उपज व अनाज",
    icon: "ShoppingBag",
    itemCount: 5,
    color: "from-teal-600 to-emerald-800",
    bgColor: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    id: "seeds",
    name: "Seeds & Hybrids",
    hindiName: "बीज और संकर",
    icon: "Sprout",
    itemCount: 5,
    color: "from-green-600 to-emerald-700",
    bgColor: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: "fertilizers",
    name: "Fertilizers & Soil",
    hindiName: "उर्वरक और खाद",
    icon: "Sparkles",
    itemCount: 4,
    color: "from-amber-500 to-yellow-600",
    bgColor: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    id: "protection",
    name: "Crop Protection",
    hindiName: "फसल सुरक्षा व कीटनाशक",
    icon: "ShieldAlert",
    itemCount: 3,
    color: "from-rose-500 to-red-600",
    bgColor: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: "machinery",
    name: "Tools & Machinery",
    hindiName: "कृषि उपकरण व मशीनरी",
    icon: "Tractor",
    itemCount: 4,
    color: "from-orange-600 to-amber-700",
    bgColor: "bg-orange-50 text-orange-700 border-orange-200"
  }
];
