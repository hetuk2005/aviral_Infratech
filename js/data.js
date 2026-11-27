/**
 * Structured mock database mirroring MongoDB collections for Aviral Infratech Pvt. Ltd.
 */
window.AVIRAL_DATA = {
  stats: [
    { value: '15+', label: 'Projects Delivered' },
    { value: '12+', label: 'Years of Experience' },
    { value: '6+', label: 'Prime Locations' },
    { value: '350+', label: 'Happy Families' },
    { value: '30+', label: 'Channel Partners' }
  ],

  lands: [
    {
      _id: 'aura-city',
      name: 'Aura City',
      location: 'Banthra, Khasarwara, Lucknow 226401',
      category: ['airport', 'ready', 'residential'],
      status: 'Ready for Registry',
      airportDistance: '10 Min from Airport',
      totalArea: '1,25,023 sq.ft.',
      plotRange: '526 – 2,400 sq.ft.',
      roadWidth: '25 ft. Blacktop',
      totalPlots: 79,
      ratePerSqft: 1999,
      image: 'assets/images/entrance-gate.jpg',
      summary:
        'Flagship gated residential township just 2 km off Lucknow–Kanpur Road near Junab Ganj Tiraha. Features precast boundary walls, yellow-black kerbs, street lights & immediate registry.',
      highlights: ['79 Demarcated Plots', '25 ft. Internal Roads', 'Gated Entry & Guard Cabin', 'Immediate Possession']
    },
    {
      _id: 'aviral-city',
      name: 'Aviral City',
      location: 'Amausi – Kanpur Road Corridor, Lucknow',
      category: ['airport', 'highway', 'residential'],
      status: 'Fast Selling',
      airportDistance: '8 Min from Airport',
      totalArea: '95,000 sq.ft.',
      plotRange: '800 – 2,000 sq.ft.',
      roadWidth: '25 – 30 ft. Roads',
      totalPlots: 64,
      ratePerSqft: 1999,
      image: 'assets/images/hero-township.jpg',
      summary:
        'Low-density green plotted community engineered for frequent flyers and families seeking quick access to C.C.S. International Airport, Metro corridor & schools.',
      highlights: ['8 Min Airport Drive', 'Dedicated Green Park', 'Underground Drainage', 'Bank Loan Assistance']
    },
    {
      _id: 'prasad-uni-site',
      name: 'Prasad Uni Site',
      location: 'Near Prasad University, Kanpur–Raebareli Link Marg',
      category: ['highway', 'commercial', 'ready'],
      status: 'Prime Highway Front',
      airportDistance: '9 Min from Airport',
      totalArea: '1,10,000 sq.ft.',
      plotRange: '700 – 2,400 sq.ft.',
      roadWidth: '25 ft. Wide Road',
      totalPlots: 68,
      ratePerSqft: 2499,
      image: 'assets/images/aerial-plots.jpg',
      summary:
        'High-appreciation residential & semi-commercial plots located right near Prasad University and 5 minutes from D-Mart along the fast-growing Link Marg.',
      highlights: ['Corner Commercial Units', '2 Min Prasad University', '5 Min D-Mart', 'Clear Freehold Title']
    }
  ],

  plotPlans: [
    {
      id: 'starter-plan',
      badge: 'Smart Entry',
      title: 'Starter Home Plan',
      range: '526 – 800 sq.ft.',
      featured: false,
      description: 'Compact freehold residential plots built for efficient 2 BHK homes or high-yield airport-corridor investment.',
      features: [
        'Ideal dimensions: 20 × 30 ft to 22 × 36 ft',
        '25 ft. wide blacktop road access',
        'Immediate registry & boundary demarcation',
        'Low entry ticket near Kanpur Road'
      ],
      defaultSqft: 700
    },
    {
      id: 'classic-family-plan',
      badge: 'Most Popular',
      title: 'Classic Family Plan',
      range: '900 – 1,400 sq.ft.',
      featured: true,
      description: 'Our highest-demand residential plot configuration suited for spacious 3 BHK independent houses with car parking.',
      features: [
        'Ideal dimensions: 25 × 40 ft to 30 × 45 ft',
        'East & North Vaastu-friendly options',
        'Electricity poles, drainage & street lights',
        '5 min to D-Mart & 10 min to Airport'
      ],
      defaultSqft: 1000
    },
    {
      id: 'duplex-corner-plan',
      badge: 'Premium Lifestyle',
      title: 'Duplex & Corner Estate',
      range: '1,500 – 2,400 sq.ft.',
      featured: false,
      description: 'Grand corner and two-side open residential plots designed for luxury duplex villas, front lawns & multi-car garages.',
      features: [
        'Sizes up to 2,400 sq.ft. (Plots 1, 15, 17, 32)',
        'Two-side 25 ft. wide road frontage',
        'Priority corner selection on site visit',
        'Custom architectural layout guidance'
      ],
      defaultSqft: 2000
    },
    {
      id: 'commercial-frontage-plan',
      badge: 'High Yield',
      title: 'Commercial Frontage Plan',
      range: '1,000 – 2,500 sq.ft.',
      featured: false,
      description: 'Main link-road & entrance-adjacent plots tailored for clinics, retail showrooms, offices & rental apartments.',
      features: [
        'Direct visibility from Link Marg approach',
        'High footfall near university & highway',
        'Wide parking setback & 25 ft.+ frontage',
        'Strong capital appreciation potential'
      ],
      defaultSqft: 1200
    }
  ],

  paymentPlans: [
    {
      id: 'instant-registry',
      badge: 'Fastest Handover',
      title: 'Instant Registry Plan',
      range: 'Immediate Possession',
      featured: true,
      description: 'Complete outright purchase with same-week registry, mutation support & immediate construction permission.',
      features: [
        '10% token booking on site selection',
        '90% within 21 days at Sub-Registrar office',
        'Priority choice of corner & park-facing plots',
        'Complimentary boundary pillar marking'
      ],
      defaultSqft: 1000
    },
    {
      id: 'flexi-50-50',
      badge: 'Balanced Choice',
      title: 'Flexi 50–50 Plan',
      range: '50% + 50% Split',
      featured: false,
      description: 'Lock your plot rate today with 50% booking payment and pay the remaining 50% across 6 months.',
      features: [
        '50% down payment locks exact plot number',
        'Balance 50% in 2 easy quarterly milestones',
        'Zero processing fee from Aviral Infratech',
        'Registry immediately on full completion'
      ],
      defaultSqft: 1000
    },
    {
      id: 'easy-emi-plan',
      badge: 'Investor Friendly',
      title: '18-Month Easy EMI Plan',
      range: '30% Down + EMI',
      featured: false,
      description: 'Structured monthly payment plan ideal for salaried buyers and long-term Lucknow land investors.',
      features: [
        'Book with 30% initial allotment amount',
        'Spread remaining 70% over 12 to 18 months',
        'Transparent ledger & digital payment receipts',
        'Free family site-visit pickup in Lucknow'
      ],
      defaultSqft: 800
    }
  ],

  /* Representative plots directly matching Brochure Page 4 CAD table */
  layoutPlots: [
    { id: 1, area: 2300, road: '25 ft.', facing: 'North-East Corner', status: 'corner' },
    { id: 2, area: 784, road: '25 ft.', facing: 'North', status: 'available' },
    { id: 3, area: 765, road: '25 ft.', facing: 'North', status: 'available' },
    { id: 4, area: 744, road: '25 ft.', facing: 'North', status: 'booked' },
    { id: 5, area: 724, road: '25 ft.', facing: 'North', status: 'available' },
    { id: 6, area: 704, road: '25 ft.', facing: 'North', status: 'available' },
    { id: 7, area: 926, road: '25 ft.', facing: 'Corner', status: 'corner' },
    { id: 8, area: 2116, road: '25 ft.', facing: 'East', status: 'corner' },
    { id: 9, area: 922, road: '25 ft.', facing: 'East', status: 'available' },
    { id: 10, area: 972, road: '25 ft.', facing: 'East', status: 'booked' },
    { id: 11, area: 1021, road: '25 ft.', facing: 'East', status: 'available' },
    { id: 12, area: 1052, road: '25 ft.', facing: 'East', status: 'available' },
    { id: 13, area: 938, road: '25 ft.', facing: 'East', status: 'booked' },
    { id: 14, area: 800, road: '25 ft.', facing: 'South-East Corner', status: 'corner' },
    { id: 15, area: 2400, road: '25 ft.', facing: 'Corner Villa', status: 'corner' },
    { id: 16, area: 1200, road: '25 ft.', facing: 'South', status: 'available' },
    { id: 17, area: 2400, road: '25 ft.', facing: 'Corner Villa', status: 'corner' },
    { id: 18, area: 1015, road: '25 ft.', facing: 'North', status: 'available' },
    { id: 19, area: 979, road: '25 ft.', facing: 'North', status: 'booked' },
    { id: 20, area: 1562, road: '25 ft.', facing: 'East Corner', status: 'corner' },
    { id: 21, area: 1256, road: '25 ft.', facing: 'North', status: 'available' },
    { id: 22, area: 1229, road: '25 ft.', facing: 'North', status: 'available' },
    { id: 23, area: 861, road: '25 ft.', facing: 'North', status: 'available' },
    { id: 24, area: 840, road: '25 ft.', facing: 'North', status: 'booked' },
    { id: 25, area: 700, road: '25 ft.', facing: 'North', status: 'available' },
    { id: 26, area: 559, road: '25 ft.', facing: 'North', status: 'available' },
    { id: 27, area: 526, road: '25 ft.', facing: 'West Corner', status: 'corner' },
    { id: 28, area: 945, road: '25 ft.', facing: 'West', status: 'available' },
    { id: 29, area: 1000, road: '25 ft.', facing: 'South', status: 'available' },
    { id: 30, area: 1000, road: '25 ft.', facing: 'South', status: 'booked' },
    { id: 31, area: 1000, road: '25 ft.', facing: 'South', status: 'available' },
    { id: 32, area: 2400, road: '25 ft.', facing: 'East Corner', status: 'corner' },
    { id: 33, area: 2400, road: '25 ft.', facing: 'East Corner', status: 'corner' },
    { id: 34, area: 1000, road: '25 ft.', facing: 'North', status: 'available' },
    { id: 35, area: 1000, road: '25 ft.', facing: 'North', status: 'available' },
    { id: 36, area: 1000, road: '25 ft.', facing: 'North', status: 'booked' }
  ],

  reels: [
    {
      id: 'reel-airport-drive',
      category: 'airport',
      tag: 'Airport Drive',
      duration: '0:42',
      views: '18.4K views',
      title: '10-Min Drive from Lucknow Airport to Aura City',
      caption: 'Live route showcase from C.C.S. Airport terminal via Kanpur Road & Junab Ganj Tiraha to Banthra.',
      project: 'Aura City • ₹1,999/sq.ft.',
      image: 'assets/images/reel-airport-corridor.jpg'
    },
    {
      id: 'reel-drone-survey',
      category: 'drone',
      tag: 'Drone Flyover',
      duration: '0:55',
      views: '24.1K views',
      title: '1,25,023 Sq.Ft. Gated Township Aerial Drone Tour',
      caption: 'Full bird’s-eye tour of 79 demarcated plots, boundary walls, and intersecting 25 ft. roads.',
      project: 'Aviral City • ₹1,999/sq.ft.',
      image: 'assets/images/hero-township.jpg'
    },
    {
      id: 'reel-road-gate',
      category: 'infrastructure',
      tag: 'Road & Gate',
      duration: '0:38',
      views: '12.9K views',
      title: 'Main Entrance Archway & 25 Ft. Blacktop Road Quality',
      caption: 'Walkthrough of our grand steel-and-orange security gate, yellow-black kerbs & street light poles.',
      project: 'Aviral City • ₹1,999/sq.ft.',
      image: 'assets/images/entrance-gate.jpg'
    },
    {
      id: 'reel-family-visit',
      category: 'clients',
      tag: 'Client Visit',
      duration: '0:48',
      views: '15.2K views',
      title: 'Happy Families Inspecting Ready Corner Plots',
      caption: 'Weekend site visit highlights near Prasad University with plot boundary marking and on-spot plan consultation.',
      project: 'Prasad Uni Site • ₹2,499/sq.ft.',
      image: 'assets/images/reel-site-visit.jpg'
    }
  ],

  landmarks: [
    {
      time: '2 Min',
      title: 'Prasad University, Lucknow',
      detail: 'Immediate educational & medical institutional hub right off the approach road.',
      featured: false
    },
    {
      time: '3 Min',
      title: 'Lucknow–Kanpur Road (NH-27) & Junab Ganj Tiraha',
      detail: 'Just 2 km from the main 6-lane highway corridor connecting Lucknow & Kanpur.',
      featured: false
    },
    {
      time: '5 Min',
      title: 'D-Mart Hypermarket, Kanpur Road',
      detail: 'Everyday groceries, retail shopping & family conveniences five minutes away.',
      featured: false
    },
    {
      time: '10 Min',
      title: 'Chaudhary Charan Singh International Airport',
      detail: 'Effortless air travel connectivity driving rapid residential & rental appreciation.',
      featured: true
    },
    {
      time: '18 Min',
      title: 'Aviral Infratech Corporate Office — Ashiyana',
      detail: 'CP-1, Sector - H, LDA Colony, Ashiyana, Lucknow — visit our team anytime.',
      featured: false
    }
  ]
};
