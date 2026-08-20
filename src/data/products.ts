import { Product } from '../types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'BILLY',
    name: 'BILLY Bookcase',
    category: 'Bookcases & Shelving',
    price: '$79.99',
    sku: '002.638.50',
    dimensions: '31 1/2 x 11 x 79 1/2 "',
    color: 'White',
    material: 'Particleboard, Paper foil',
    description:
      'A simple unit can be enough storage for a limited space or the foundation for a larger storage solution if your needs change. Adjustable shelves adapt space between shelves according to your needs.',
    layers: {
      l1_ui: {
        title: 'BILLY',
        subtitle: 'Bookcase, white, 31 1/2x11x79 1/2 "',
        note: 'Iconic, clean Scandinavian showroom presentation. Zero keyword stuffing.',
      },
      l2_seo: {
        tag: 'BILLY Bookcase (White, 79") | Modern Bookshelf Storage | IKEA',
        meta: 'Shop the iconic IKEA BILLY 79-inch tall white bookcase. Features customizable adjustable shelves for living room and office storage.',
        note: 'Injected into HTML <head> for Google Search SERP rankings without visual UI clutter.',
      },
      l3_synonyms: [
        'white bookshelf',
        'tall bookcase',
        'adjustable shelves',
        'narrow vertical storage',
        'living room book storage',
      ],
      l4_feed: {
        title: 'IKEA BILLY - 79" Modern Tall Bookshelf with Adjustable Storage Shelves, White',
        category: 'Furniture > Shelving > Bookcases',
        note: 'High attribute density feed entry for Google Shopping & Amazon multi-brand ad auctions.',
      },
    },
    recall: {
      baseline: 20.0,
      optimized: 85.7,
      gain: '+65.7%',
    },
    attributes: {
      dimensions: 95,
      material: 90,
      color: 100,
      utility: 95,
      modularity: 90,
    },
  },
  {
    id: 'POANG',
    name: 'POÄNG Armchair',
    category: 'Armchairs & Accent Chairs',
    price: '$129.00',
    sku: '292.407.96',
    dimensions: '26 3/4 x 32 1/4 x 39 3/8 "',
    color: 'Birch veneer / Knisa light beige',
    material: 'Layer-glued bent birch, 100% polyester',
    description:
      'Layer-glued bent birch frame gives comfortable resilience. High back gives good support for your neck. Removable, machine-washable cushion cover.',
    layers: {
      l1_ui: {
        title: 'POÄNG',
        subtitle: 'Armchair, birch veneer / Knisa light beige',
        note: 'Preserves the iconic minimalist lounge chair identity.',
      },
      l2_seo: {
        tag: 'POÄNG Armchair | Scandinavian Bentwood Lounge Chair | IKEA',
        meta: 'Discover the ergonomic IKEA POÄNG armchair with bent birch frame and neck support cushion.',
        note: "Captures high-volume 'bentwood lounge chair' Google searches.",
      },
      l3_synonyms: [
        'scandinavian lounge chair',
        'bentwood accent chair',
        'high back reading chair',
        'washable cushion armchair',
        'birch wood armchair',
      ],
      l4_feed: {
        title: 'IKEA POÄNG Armchair - Scandinavian Bentwood Accent Lounge Chair with Neck Support, Beige',
        category: 'Furniture > Chairs > Armchairs',
        note: "Ranks for generic 'accent lounge chair' ad auctions.",
      },
    },
    recall: {
      baseline: 25.0,
      optimized: 80.0,
      gain: '+55.0%',
    },
    attributes: {
      dimensions: 85,
      material: 95,
      color: 90,
      utility: 90,
      modularity: 75,
    },
  },
  {
    id: 'KALLAX',
    name: 'KALLAX Shelf Unit',
    category: 'Cube Storage & Room Dividers',
    price: '$149.99',
    sku: '104.099.32',
    dimensions: '57 7/8 x 57 7/8 "',
    color: 'Black-brown',
    material: 'Particleboard, Fiberboard, Acrylic paint',
    description:
      'Standing or lying, against the wall or to divide the room – KALLAX series adapts to your space and needs. 4x4 16-cube modular configuration.',
    layers: {
      l1_ui: {
        title: 'KALLAX',
        subtitle: 'Shelf unit, black-brown, 57 7/8x57 7/8 "',
        note: 'Clean showroom headline.',
      },
      l2_seo: {
        tag: 'KALLAX 16-Cube Shelf Unit (4x4) | Room Divider Storage | IKEA',
        meta: 'IKEA KALLAX 4x4 16-cube storage organizer and room divider shelf in black-brown finish.',
        note: "Targets '16-cube storage organizer' searches.",
      },
      l3_synonyms: [
        'cube storage organizer',
        '16 cube bookcase',
        '4x4 room divider',
        'vinyl record storage shelf',
        'modular square cubby',
      ],
      l4_feed: {
        title: 'IKEA KALLAX Shelving Unit - 16-Cube (4x4) Modular Storage Organizer & Room Divider, 58x58"',
        category: 'Furniture > Shelving > Cube Storage',
        note: "Solves zero-result hits for 'cube organizer' queries.",
      },
    },
    recall: {
      baseline: 18.2,
      optimized: 81.8,
      gain: '+63.6%',
    },
    attributes: {
      dimensions: 95,
      material: 85,
      color: 95,
      utility: 100,
      modularity: 100,
    },
  },
  {
    id: 'MALM',
    name: 'MALM Bed Frame, High',
    category: 'Beds & Bed Frames',
    price: '$299.00',
    sku: '890.094.84',
    dimensions: '66 1/8 x 83 1/8 x 39 3/8 " (Queen)',
    color: 'White stained oak veneer',
    material: 'Solid wood veneer, steel hardware',
    description:
      'A clean design with solid wood veneer that is just as beautiful on all sides. Place the bed freestanding or with headboard against wall.',
    layers: {
      l1_ui: {
        title: 'MALM',
        subtitle: 'Bed frame, high, Queen, white stained oak veneer',
        note: 'Minimalist aesthetic.',
      },
      l2_seo: {
        tag: 'MALM Queen Bed Frame (High) | Modern Platform Bed | IKEA',
        meta: 'Buy the modern IKEA MALM queen size high platform bed frame with headboard in white stained oak.',
        note: "Targets 'queen platform bed with headboard' searches.",
      },
      l3_synonyms: [
        'queen platform bed',
        'wood veneer bed frame',
        'underbed storage bed',
        'modern headboard bed',
        'scandinavian queen bed',
      ],
      l4_feed: {
        title: 'IKEA MALM Queen Bed Frame - Clean-Lined High Platform Bed with Headboard, White Stained Oak',
        category: 'Furniture > Beds > Bed Frames',
        note: 'Standardizes Queen sizing & platform category.',
      },
    },
    recall: {
      baseline: 22.2,
      optimized: 77.8,
      gain: '+55.6%',
    },
    attributes: {
      dimensions: 90,
      material: 95,
      color: 90,
      utility: 85,
      modularity: 80,
    },
  },
  {
    id: 'STRANDMON',
    name: 'STRANDMON Wing Chair',
    category: 'Living Room Seating',
    price: '$279.00',
    sku: '903.598.29',
    dimensions: '32 1/4 x 37 3/4 x 39 3/4 "',
    color: 'Nordvalla dark gray',
    material: 'Solid wood frame, High-resilience foam',
    description:
      'Classic 1950s look with modern comfort. High back provides extra support for your neck, with deep tactile fabric seat.',
    layers: {
      l1_ui: {
        title: 'STRANDMON',
        subtitle: 'Wing chair, Nordvalla dark gray',
        note: 'Classic Scandinavian showroom presentation.',
      },
      l2_seo: {
        tag: 'STRANDMON Wing Chair | Classic High-Back Reading Chair | IKEA',
        meta: 'Explore the comfortable IKEA STRANDMON high-back wingback accent chair with deep padded seating in dark gray.',
        note: "Ranks for standard 'wingback chair' Google queries.",
      },
      l3_synonyms: [
        'high-back wingback chair',
        'accent reading armchair',
        'tufted lounge chair',
        'dark gray fireside chair',
        'comfortable high back chair',
      ],
      l4_feed: {
        title: 'IKEA STRANDMON Wing Chair - Classic High-Back Wingback Accent Chair with Deep Cushion, Dark Gray',
        category: 'Furniture > Chairs > Wing Chairs',
        note: "Captures marketplace 'wingback accent chair' searches.",
      },
    },
    recall: {
      baseline: 23.1,
      optimized: 84.6,
      gain: '+61.5%',
    },
    attributes: {
      dimensions: 85,
      material: 90,
      color: 95,
      utility: 90,
      modularity: 70,
    },
  },
];
