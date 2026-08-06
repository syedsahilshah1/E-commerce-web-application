// High-quality mock data for the E-Commerce Web Application

export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'RiSmartphoneLine',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    count: 24,
    description: 'Smartphones, headphones, smartwatches, and more.'
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    icon: 'RiShirtLine',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
    count: 36,
    description: 'Premium apparel, shoes, and luxury accessories.'
  },
  {
    id: 'home-decor',
    name: 'Home & Living',
    icon: 'RiHome4Line',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop&q=80',
    count: 18,
    description: 'Designer furniture, ambient lighting, and art.'
  },
  {
    id: 'wellness',
    name: 'Fitness & Wellness',
    icon: 'RiHeartPulseLine',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    count: 15,
    description: 'Activewear, tracking gadgets, and wellness essentials.'
  }
];

export const products = [
  // ELECTRONICS
  {
    id: 1,
    name: 'AeroSound Max Wireless Headphones',
    brand: 'AeroSound',
    category: 'electronics',
    price: 299.99,
    discountPrice: 249.99,
    discountPercentage: 17,
    rating: 4.8,
    reviewsCount: 184,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#000000', '#4A5568', '#E2E8F0'],
    sizes: ['Standard'],
    description: 'Experience pure acoustic bliss with AeroSound Max. Active Noise Cancellation, high-fidelity audio drivers, and up to 40 hours of battery life deliver an unmatched listening experience for audio enthusiasts.',
    specs: {
      'Driver Size': '40mm Dynamic',
      'Connectivity': 'Bluetooth 5.2 / 3.5mm Jack',
      'Battery Life': 'Up to 40 hours (ANC Off)',
      'Charging Port': 'USB Type-C',
      'Weight': '250g'
    },
    reviews: [
      { id: 101, name: 'Alex Mercer', rating: 5, date: '2026-07-20', comment: 'Best headphones I have ever owned. The active noise cancellation is flawless!' },
      { id: 102, name: 'Sarah Connor', rating: 4.5, date: '2026-07-25', comment: 'Super comfortable for long hours. Sound quality is rich, though bass is slightly heavy.' }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 2,
    name: 'AeroWatch Series 4 Smartwatch',
    brand: 'AeroSound',
    category: 'electronics',
    price: 349.99,
    discountPrice: 349.99,
    discountPercentage: 0,
    rating: 4.6,
    reviewsCount: 92,
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#000000', '#D69E2E', '#3182CE'],
    sizes: ['41mm', '45mm'],
    description: 'Stay connected, active, and healthy with AeroWatch Series 4. Featuring an Always-On Retina display, blood oxygen tracking, ECG monitoring, and auto-workout detection, it is the ultimate companion on your wrist.',
    specs: {
      'Display': 'Always-On Retina OLED',
      'Water Resistance': 'WR50 (50 meters)',
      'Sensors': 'ECG, Heart Rate, Blood Oxygen, Gyroscope',
      'Battery Life': 'Up to 18 hours',
      'Compatibility': 'iOS & Android'
    },
    reviews: [
      { id: 103, name: 'David Miller', rating: 4, date: '2026-06-12', comment: 'Great fitness features, but I wish the battery lasted longer than a day.' },
      { id: 104, name: 'Emily Rose', rating: 5, date: '2026-07-18', comment: 'Beautiful screen and super fast. Swapping bands is incredibly simple.' }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: 3,
    name: 'AeroBuds Pro Noise Cancelling Earbuds',
    brand: 'AeroSound',
    category: 'electronics',
    price: 179.99,
    discountPrice: 149.99,
    discountPercentage: 16,
    rating: 4.7,
    reviewsCount: 312,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1588444839799-eaa4344eba19?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#FFFFFF', '#000000'],
    sizes: ['Standard'],
    description: 'Tiny size, massive sound. AeroBuds Pro feature custom audio tech, smart ANC, Transparency mode, and comfortable secure-fit tips, so you can block out the world or let it in.',
    specs: {
      'Bluetooth Version': '5.3',
      'ANC Depth': 'Up to 35dB',
      'Battery Life': '6 hours (ANC on) / 24 hours total with case',
      'IP Rating': 'IPX4 Water Resistant',
      'Wireless Charging': 'Yes, Qi certified'
    },
    reviews: [
      { id: 105, name: 'Mark Zuckerberg', rating: 4.8, date: '2026-07-30', comment: 'Extremely clear calls. Case is super compact and fits anywhere.' }
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: 4,
    name: 'CinemaHome 4K Smart Projector',
    brand: 'CinemaHome',
    category: 'electronics',
    price: 799.99,
    discountPrice: 699.99,
    discountPercentage: 12,
    rating: 4.5,
    reviewsCount: 45,
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#FFFFFF'],
    sizes: ['Standard'],
    description: 'Turn any wall into a premium home theatre. CinemaHome outputs true 4K resolution, 2500 ANSI Lumens brightness, and has Android TV built-in for native Netflix, YouTube, and Disney+ streaming.',
    specs: {
      'Resolution': '3840 x 2140 (4K UHD)',
      'Brightness': '2500 ANSI Lumens',
      'Contrast Ratio': '150,000:1',
      'Operating System': 'Android TV 11.0',
      'Speakers': 'Dual 10W Harman Kardon'
    },
    reviews: [
      { id: 106, name: 'Sam Altman', rating: 5, date: '2026-07-02', comment: 'Incredible picture quality, even with some ambient light in the room.' }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false
  },

  // FASHION
  {
    id: 5,
    name: 'Classic Leather Minimalist Sneakers',
    brand: 'FootWear',
    category: 'fashion',
    price: 129.99,
    discountPrice: 110.00,
    discountPercentage: 15,
    rating: 4.9,
    reviewsCount: 204,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#FFFFFF', '#E2E8F0', '#2D3748'],
    sizes: ['7', '8', '9', '10', '11'],
    description: 'Crafted from full-grain Italian leather, our classic minimalist sneakers fit any setting from boardroom meetings to casual weekends. Breathable calfskin lining and stitched rubber cupsole guarantee long-lasting durability and comfort.',
    specs: {
      'Upper Material': 'Premium Italian Full-Grain Leather',
      'Lining': 'Breathable Calfskin',
      'Sole': '100% Margom Rubber Cupsole',
      'Country of Origin': 'Made in Italy',
      'Style': 'Low-top dress sneaker'
    },
    reviews: [
      { id: 107, name: 'Marcus V.', rating: 5, date: '2026-07-28', comment: 'Sleek, high quality, goes with everything. Standard fit.' }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 6,
    name: 'Premium Wool Blend Double-Breasted Coat',
    brand: 'AuraStyle',
    category: 'fashion',
    price: 249.99,
    discountPrice: 249.99,
    discountPercentage: 0,
    rating: 4.7,
    reviewsCount: 78,
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#2D3748', '#8C7853'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Tailored for a modern silhouette, this premium wool coat is warm, sophisticated, and built for cold months. Made from a heavy-weight wool and cashmere blend, it has elegant notched lapels and satin lining.',
    specs: {
      'Fabric Composition': '70% Wool, 20% Polyester, 10% Cashmere',
      'Fit': 'Slim Tailored Fit',
      'Lining': 'Satin Polyester',
      'Care': 'Dry Clean Only'
    },
    reviews: [
      { id: 108, name: 'Helen G.', rating: 5, date: '2026-05-15', comment: 'Elegant coat. Got many compliments. Keeps me warm!' }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: 7,
    name: 'Everyday Comfort Denim Jacket',
    brand: 'AuraStyle',
    category: 'fashion',
    price: 89.99,
    discountPrice: 69.99,
    discountPercentage: 22,
    rating: 4.4,
    reviewsCount: 145,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#4299E1', '#2B6CB0'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'The definitive classic denim jacket, designed with a comfortable relaxed fit. Featuring reinforced metal shank buttons, double chest pockets, and horizontal side pockets, it will develop a unique patina over time.',
    specs: {
      'Material': '100% Organic Cotton Rigid Denim',
      'Weight': '12.5 oz',
      'Fit': 'Regular Fit',
      'Pockets': '2 chest flap pockets, 2 handwarmer pockets'
    },
    reviews: [
      { id: 109, name: 'Jason T.', rating: 4, date: '2026-06-25', comment: 'Solid build, standard denim thickness. Fits slightly tight around shoulders.' }
    ],
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 8,
    name: 'Vegan Leather Messenger Bag',
    brand: 'AuraStyle',
    category: 'fashion',
    price: 119.99,
    discountPrice: 99.99,
    discountPercentage: 17,
    rating: 4.8,
    reviewsCount: 88,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#8C7853', '#000000'],
    sizes: ['One Size'],
    description: 'A stylish, spacious messenger bag for work or school. Crafted from water-resistant, cruelty-free vegan leather, it includes a padded sleeve for up to a 15-inch laptop and multi-compartment organizers.',
    specs: {
      'Material': 'Premium PU Vegan Leather',
      'Hardware': 'Brushed Gunmetal Alloy',
      'Laptop Compartment': 'Padded sleeve up to 15.6"',
      'Dimensions': '15" x 11.5" x 3.5"'
    },
    reviews: [
      { id: 110, name: 'Olivia K.', rating: 5, date: '2026-07-10', comment: 'Extremely professional bag. Soft texture, looks like real leather.' }
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false
  },

  // HOME DECOR
  {
    id: 9,
    name: 'Nordic Oak Minimalist Lounge Chair',
    brand: 'NordicLiving',
    category: 'home-decor',
    price: 499.99,
    discountPrice: 429.99,
    discountPercentage: 14,
    rating: 4.9,
    reviewsCount: 38,
    stock: 4,
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#E2E8F0', '#EDF2F7', '#CBD5E0'],
    sizes: ['Standard'],
    description: 'Bring clean lines and warmth to your room. Crafted from FSC-certified solid European oak and upholstered in a luxurious, durable wool blend, the Nordic Oak Lounge Chair is designed for maximum relaxation and timeless appeal.',
    specs: {
      'Frame Material': 'FSC Solid European Oak',
      'Upholstery': '70% Wool, 30% Linen Blend',
      'Weight Capacity': '150 kg (330 lbs)',
      'Dimensions': '78cm H x 70cm W x 75cm D',
      'Assembly': 'None required'
    },
    reviews: [
      { id: 111, name: 'Lucas H.', rating: 5, date: '2026-07-22', comment: 'Exquisite craftsmanship. Beautiful wood grain. Very comfortable lounge angle.' }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 10,
    name: 'AromaTherapy Ceramic Ultrasonic Humidifier',
    brand: 'AromaCo',
    category: 'home-decor',
    price: 69.99,
    discountPrice: 59.99,
    discountPercentage: 14,
    rating: 4.6,
    reviewsCount: 160,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519183071298-a2962feb14f4?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#FFFFFF', '#1A202C'],
    sizes: ['150ml', '300ml'],
    description: 'Transform your room into a relaxing spa. Made from hand-crafted matte ceramic, this ultrasonic diffuser humidifies air while circulating dry mist with essential oils. Featuring a warm ambient glow.',
    specs: {
      'Material': 'Handcrafted Ceramic Top, BPA-free Plastic Reservoir',
      'Mist Output': 'Up to 7 hours runtime (Continuous)',
      'Coverage': 'Up to 500 sq ft',
      'Safety Features': 'Auto shut-off when water runs out',
      'Light Settings': 'Dim, Bright, Breathing light'
    },
    reviews: [
      { id: 112, name: 'Nadia R.', rating: 5, date: '2026-07-29', comment: 'Looks gorgeous on my nightstand. Whisper quiet, highly recommend.' }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: 11,
    name: 'Minimalist Dimmable Arch Floor Lamp',
    brand: 'NordicLiving',
    category: 'home-decor',
    price: 189.99,
    discountPrice: 169.99,
    discountPercentage: 11,
    rating: 4.7,
    reviewsCount: 54,
    stock: 9,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#000000', '#D69E2E'],
    sizes: ['Standard'],
    description: 'A striking statement piece that arches beautifully over a reading nook or sectional sofa. Featuring a heavy marble base, a matte black iron neck, and a step-less dimming control wheel.',
    specs: {
      'Base Material': '100% Solid Nero Marquina Marble',
      'Lamp Neck': 'Matte Powder-Coated Iron',
      'Bulb Included': '9W Dimmable LED (800 lumens)',
      'Height': '180cm (71 inches)',
      'Reach': '120cm (47 inches)'
    },
    reviews: [
      { id: 113, name: 'Leo P.', rating: 4, date: '2026-06-30', comment: 'Marble base is extremely heavy, so the lamp is stable. Assembly was a bit tricky.' }
    ],
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: 12,
    name: 'Geometric Ceramic Table Vase Set',
    brand: 'NordicLiving',
    category: 'home-decor',
    price: 49.99,
    discountPrice: 49.99,
    discountPercentage: 0,
    rating: 4.8,
    reviewsCount: 37,
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#CBD5E0'],
    sizes: ['Set of 3'],
    description: 'Add a subtle, Scandinavian artistic touch to your mantelpiece or dining table. This set contains three premium ceramic vases in varying heights and shapes, finished in a fine-speckled matte sand glaze.',
    specs: {
      'Material': 'Glazed Ceramic',
      'Glaze Finish': 'Speckled Matte Sandstone',
      'Vase Heights': 'Large: 20cm, Medium: 15cm, Small: 10cm',
      'Waterproof': 'Yes, can hold water for fresh flowers'
    },
    reviews: [
      { id: 114, name: 'Anna S.', rating: 5, date: '2026-07-15', comment: 'Beautiful texture. Looks expensive. They look great together.' }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true
  },

  // WELLNESS
  {
    id: 13,
    name: 'FlexiFit Cork Fitness Yoga Mat',
    brand: 'FlexiFit',
    category: 'wellness',
    price: 79.99,
    discountPrice: 65.00,
    discountPercentage: 19,
    rating: 4.8,
    reviewsCount: 121,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#D69E2E'],
    sizes: ['6mm Thickness'],
    description: 'Step onto natural comfort. FlexiFit Yoga Mats combine a organic Portuguese cork upper surface with a non-slip natural tree rubber backing. Cork is antimicrobial, hypoallergenic, and provides superior grip when wet.',
    specs: {
      'Top Layer': '100% Sustainably Sourced Portuguese Cork',
      'Bottom Layer': 'Natural Tree Rubber (Eco-friendly)',
      'Dimensions': '183cm x 61cm (72" x 24")',
      'Thickness': '6mm premium cushioning',
      'Weight': '2.2 kg'
    },
    reviews: [
      { id: 115, name: 'Yogi Dan', rating: 5, date: '2026-07-04', comment: 'Absolute best grip for hot yoga. No towel needed. Grip gets better the more I sweat.' }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 14,
    name: 'SmartPulse Elite Heart Rate Tracker',
    brand: 'FlexiFit',
    category: 'wellness',
    price: 149.99,
    discountPrice: 129.99,
    discountPercentage: 13,
    rating: 4.5,
    reviewsCount: 42,
    stock: 10,
    images: [
      'https://images.unsplash.com/photo-1510017808632-95f08e047f36?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1557167678-65979e35ef41?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#000000', '#E53E3E'],
    sizes: ['Standard'],
    description: 'Track your heart metrics with precision. Unlike wrist-based trackers, the SmartPulse chest strap reads electronic activity directly, feeding live heart rate variability, training zones, and calorie count into your favorite workout app.',
    specs: {
      'Sensor Type': 'Electrocardiogram (ECG)',
      'Connectivity': 'Bluetooth 5.0, ANT+, 5kHz analog',
      'Battery Type': 'CR2032 coin cell (Up to 400 hours)',
      'Waterproof': 'IP67 (Washable textile strap)',
      'Weight': '55g'
    },
    reviews: [
      { id: 116, name: 'Coach K.', rating: 5, date: '2026-07-11', comment: 'Crucial tool for zone training. Syncs instantly with my Garmin.' }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: 15,
    name: 'HyperGrip Recover Massage Gun',
    brand: 'FlexiFit',
    category: 'wellness',
    price: 199.99,
    discountPrice: 169.99,
    discountPercentage: 15,
    rating: 4.9,
    reviewsCount: 95,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#2D3748'],
    sizes: ['Standard'],
    description: 'Recover faster and move better. The HyperGrip percussive therapy device targets sore muscles with rapid pulses to relieve tension, stimulate blood flow, and break down lactic acid. Features a ultra-quiet brushless motor.',
    specs: {
      'Speed Settings': '5 speed levels (1800 - 3200 percussions/min)',
      'Stall Force': 'Up to 45 lbs',
      'Battery Life': 'Up to 3 hours (Rechargeable Li-ion)',
      'Attachments': '5 interchangeable head accessories',
      'Noise Level': 'Quiet Glide tech (45dB - 55dB)'
    },
    reviews: [
      { id: 117, name: 'Brad P.', rating: 5, date: '2026-07-27', comment: 'Excellent battery life, very powerful. Highly effective after heavy squat days.' }
    ],
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 16,
    name: 'Vacuum Insulated Stainless Straw Bottle',
    brand: 'FlexiFit',
    category: 'wellness',
    price: 39.99,
    discountPrice: 34.99,
    discountPercentage: 13,
    rating: 4.7,
    reviewsCount: 340,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&auto=format&fit=crop&q=80'
    ],
    colors: ['#319795', '#2B6CB0', '#1A202C', '#E53E3E'],
    sizes: ['24oz', '32oz'],
    description: 'Keep your hydration ice-cold all day. The Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12. Built with durable 18/8 food-grade stainless steel and featuring a leakproof straw lid.',
    specs: {
      'Material': '18/8 Food-Grade Pro-Section Stainless Steel',
      'Insulation': 'Double-wall TempShield Vacuum',
      'BPA Free': 'Yes, completely non-toxic',
      'Cold Retention': 'Up to 24 hours',
      'Hot Retention': 'Up to 12 hours'
    },
    reviews: [
      { id: 118, name: 'Clara M.', rating: 5, date: '2026-08-01', comment: 'No sweating, no leaking. The straw lid makes it very easy to sip during spin class.' }
    ],
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    comment: 'The quality of the Lounge Chair exceeds all my expectations. Delivery was extremely fast, and the customer service was highly professional. 5 stars!',
    rating: 5
  },
  {
    id: 2,
    name: 'David Kojo',
    role: 'Interior Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    comment: 'I recommend this e-commerce site to all my clients. The curated pieces are premium, and the checkout process is smooth and intuitive.',
    rating: 5
  },
  {
    id: 3,
    name: 'Michelle Chen',
    role: 'Tech Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    comment: 'AeroSound Max headphones are absolute gold. Battery life is amazing. Buying from here was a breeze, will shop again!',
    rating: 4.8
  }
];

export const faqs = [
  {
    id: 1,
    category: 'shipping',
    question: 'How long does standard shipping take?',
    answer: 'Standard shipping takes between 3 to 5 business days for domestic orders. Express shipping options are available at checkout, reducing delivery times to 1-2 business days.'
  },
  {
    id: 2,
    category: 'shipping',
    question: 'Do you ship internationally?',
    answer: 'Yes! We ship to over 50 countries worldwide. International shipping rates and times vary depending on the destination and are calculated at checkout.'
  },
  {
    id: 3,
    category: 'returns',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day hassle-free return policy. If you are not satisfied with your purchase, you can return items in their original condition and packaging for a full refund.'
  },
  {
    id: 4,
    category: 'payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and store credit. All transactions are securely encrypted.'
  },
  {
    id: 5,
    category: 'warranty',
    question: 'Do products come with a warranty?',
    answer: 'All electronic items come with a standard 1-year manufacturer warranty covering internal defects. Fitness gear and home decor have a 6-month limited warranty.'
  }
];

export const coupons = [
  { code: 'SAVE10', discountType: 'percentage', value: 10, minSpend: 50 },
  { code: 'FREE50', discountType: 'fixed', value: 50, minSpend: 300 },
  { code: 'WELCOME20', discountType: 'percentage', value: 20, minSpend: 0 }
];

export const teamMembers = [
  {
    name: 'Sophia Sterling',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    bio: 'Sophia has over 15 years of retail tech experience and wanted to build a storefront focused on pure product design and quality.'
  },
  {
    name: 'Ethan Brooks',
    role: 'Head of Product Design',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    bio: 'Ethan leads the curation team, ensuring every product on our platform meets high aesthetic and functional standards.'
  },
  {
    name: 'Nisha Patel',
    role: 'Customer Experience Lead',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bio: 'Nisha is dedicated to making sure every customer leaves our shop satisfied, coordinating our 24/7 client relations department.'
  }
];
