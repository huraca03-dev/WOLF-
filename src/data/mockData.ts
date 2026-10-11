import { Product, ComboOption, Review, FaqItem, GiftPackagingOption } from '../types';

export const HERO_BANNER_IMG = '/src/assets/images/hero_wolf_custom_1791745357768.jpg';
export const TSHIRT_IMG = '/src/assets/images/product_tshirt_custom_1791745367532.jpg';
export const MUG_IMG = '/src/assets/images/product_mug_custom_1791745376687.jpg';
export const TOTEBAG_IMG = '/src/assets/images/product_totebag_custom_1791745384295.jpg';

export const BASE_COLORS = [
  { name: 'Blanco Nieve', hex: '#FFFFFF', border: '#E5E7EB', textHex: '#111111' },
  { name: 'Negro Ónix', hex: '#18181B', border: '#27272A', textHex: '#FFFFFF' },
  { name: 'Beige Arena', hex: '#E8DFD8', border: '#D7C4B7', textHex: '#111111' },
  { name: 'Gris Jaspe', hex: '#9CA3AF', border: '#6B7280', textHex: '#FFFFFF' },
];

export const TEXT_COLORS = [
  { name: 'Negro', hex: '#111111' },
  { name: 'Blanco', hex: '#FFFFFF' },
  { name: 'Beige Cálido', hex: '#D7C4B7' },
  { name: 'Dorado Champagne', hex: '#D4AF37' },
  { name: 'Rojo Carmín', hex: '#DC2626' },
  { name: 'Azul Real', hex: '#2563EB' },
];

export const FONT_OPTIONS = [
  {
    id: 'serif' as const,
    name: 'Cursiva Elegante',
    preview: 'Playfair Display',
    fontClass: 'font-editorial italic',
  },
  {
    id: 'urban' as const,
    name: 'Urbana Bold',
    preview: 'Space Grotesk',
    fontClass: 'font-urban font-bold tracking-tight uppercase',
  },
  {
    id: 'sans' as const,
    name: 'Minimalista Sans',
    preview: 'Plus Jakarta Sans',
    fontClass: 'font-sans font-semibold tracking-wide',
  },
];

export const GRAPHIC_THEMES = [
  {
    id: 'spotify',
    name: 'Código Spotify & Música',
    category: 'Música',
    description: 'Onda sonora y código escaneable de tu canción favorita',
    svgIcon: 'spotify',
  },
  {
    id: 'anniversary',
    name: 'Aniversario & Parejas',
    category: 'Amor & Recuerdos',
    description: 'Silueta minimalista de manos y coordenadas de tu fecha',
    svgIcon: 'heart',
  },
  {
    id: 'minimal_line',
    name: 'Línea Continua & Arte',
    category: 'Ilustración',
    description: 'Ilustración geométrica moderna con trazos de autor',
    svgIcon: 'art',
  },
  {
    id: 'motivational',
    name: 'Frases de Fuerza & Wolf',
    category: 'Tipográfico',
    description: 'Inspiración personal en tipografía editorial audaz',
    svgIcon: 'quote',
  },
  {
    id: 'birthday',
    name: 'Cumpleaños & Edición Especial',
    category: 'Celebración',
    description: 'Emblema "Limited Edition" con año de nacimiento',
    svgIcon: 'star',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-tshirt',
    name: 'Camiseta Básica Personalizable',
    type: 'tshirt',
    price: 45000,
    description: 'Algodón peinado premium de 200g. Tacto ultra suave, costuras reforzadas de hombro a hombro y estampado de alta definición que no se desgasta al lavar.',
    material: '100% Algodón Peinado Colombiano 200g',
    image: TSHIRT_IMG,
    sizes: ['S', 'M', 'L', 'XL'],
    dimensions: 'Corte unisex regular fit',
    colors: [
      { name: 'Negro Ónix', hex: '#18181B', bgClass: 'bg-zinc-900' },
      { name: 'Blanco Nieve', hex: '#FFFFFF', bgClass: 'bg-white' },
      { name: 'Beige Arena', hex: '#E8DFD8', bgClass: 'bg-[#E8DFD8]' },
      { name: 'Gris Jaspe', hex: '#9CA3AF', bgClass: 'bg-gray-400' },
    ],
  },
  {
    id: 'prod-mug',
    name: 'Mug Cerámico Personalizable (11 oz)',
    type: 'mug',
    price: 25000,
    description: 'Cerámica de alta densidad apta para microondas y lavavajillas. Acabado mate de lujo con impresión perimetral 360° en colores vivos e indelebles.',
    material: 'Cerámica Triple AAA Esmaltada 11 oz',
    image: MUG_IMG,
    dimensions: 'Capacidad 325 ml / Altura 9.5 cm',
    colors: [
      { name: 'Negro Mate', hex: '#18181B', bgClass: 'bg-zinc-900' },
      { name: 'Blanco Brillo', hex: '#FFFFFF', bgClass: 'bg-white' },
      { name: 'Beige Nude', hex: '#E8DFD8', bgClass: 'bg-[#E8DFD8]' },
    ],
  },
  {
    id: 'prod-totebag',
    name: 'Tote Bag de Lona Personalizable',
    type: 'totebag',
    price: 30000,
    description: 'Lona de algodón orgánico de alta resistencia (280g) con asas reforzadas ergonómicas de 65cm. Ideal para el día a día, universidad o compras sostenibles.',
    material: 'Lona de Algodón Crudo 280g',
    image: TOTEBAG_IMG,
    dimensions: '38 cm ancho x 42 cm alto (Fuelle 8 cm)',
    colors: [
      { name: 'Beige Lona', hex: '#E8DFD8', bgClass: 'bg-[#E8DFD8]' },
      { name: 'Negro Carbón', hex: '#18181B', bgClass: 'bg-zinc-900' },
      { name: 'Blanco Crudo', hex: '#FFFFFF', bgClass: 'bg-white' },
    ],
  },
  {
    id: 'prod-keychain',
    name: 'Llavero Acrílico / Metálico Personalizado',
    type: 'keychain',
    price: 15000,
    description: 'Acrílico cristal de 4mm cortado a láser o acabado metálico pulido. Grabado de doble cara de alta fidelidad con argolla plana de acero inoxidable.',
    material: 'Acrílico Cristal 4mm + Argolla Acero',
    image: TSHIRT_IMG, // fallback, canvas will render real keychain
    dimensions: '5.5 cm x 4.0 cm',
    colors: [
      { name: 'Acrílico Cristal', hex: '#FFFFFF', bgClass: 'bg-white' },
      { name: 'Acrílico Negro', hex: '#18181B', bgClass: 'bg-zinc-900' },
    ],
  },
  {
    id: 'prod-puzzle',
    name: 'Rompecabezas Personalizado de Colección',
    type: 'puzzle',
    price: 40000,
    description: 'Cartón prensado rígido de 2mm con laminado brillante satinado. 120 piezas de encaje perfecto. Viene en caja organizadora con la imagen miniatura de guía.',
    material: 'Cartón Rígido 2mm con Barniz UV',
    image: HERO_BANNER_IMG,
    dimensions: '29 cm x 20 cm (Formato A4 - 120 Piezas)',
    colors: [
      { name: 'Estándar Premium', hex: '#FFFFFF', bgClass: 'bg-white' },
    ],
  },
];

export const COMBOS: ComboOption[] = [
  {
    id: 'combo-1',
    name: 'Combo Camiseta + Tote Bag',
    tagline: 'El favorito de streetstyle para regalar o renovar tu estilo diario.',
    price: 75000,
    originalPrice: 82000,
    savings: 7000,
    popular: true,
    items: [
      { type: 'tshirt', name: 'Camiseta Algodón Premium', description: 'Tallas S a XL, corte impecable.' },
      { type: 'totebag', name: 'Tote Bag Lona 280g', description: 'Lona resistente de alta capacidad.' },
    ],
  },
  {
    id: 'combo-2',
    name: 'Combo Llavero + Mug',
    tagline: 'El detalle perfecto para fechas especiales, aniversarios y colegas.',
    price: 40000,
    originalPrice: 45000,
    savings: 5000,
    popular: false,
    items: [
      { type: 'keychain', name: 'Llavero Acrílico Doble Cara', description: 'Corte láser ultra limpio.' },
      { type: 'mug', name: 'Mug Cerámico 11 oz', description: 'Cerámica premium para tu café diario.' },
    ],
  },
  {
    id: 'combo-3',
    name: 'Combo Mug + Camiseta Personalizada',
    tagline: 'Nuestra combinación insignia para fanáticos de los recuerdos y diseño con identidad.',
    price: 70000,
    originalPrice: 77000,
    savings: 7000,
    popular: false,
    items: [
      { type: 'mug', name: 'Mug Cerámico 11 oz', description: 'Resistente a microondas con arte 360°.' },
      { type: 'tshirt', name: 'Camiseta Algodón Premium', description: '100% Algodón con estampado indeleble.' },
    ],
  },
];

export const GIFT_PACKAGING_OPTIONS: GiftPackagingOption[] = [
  {
    id: 'standard',
    name: 'Empaque Estándar Ecológico WOLF',
    price: 0,
    description: 'Bolsa kraft biodegradable con sticker de seguridad y sello de lacre WOLF.',
    includedMessage: false,
  },
  {
    id: 'luxury-box',
    name: 'Caja Rígida de Regalo Exclusiva WOLF Box',
    price: 8000,
    description: 'Caja rígida negro mate con cinta de satén beige, viruta protectora, papel picado de color y tarjeta caligráfica personalizada con tu mensaje.',
    includedMessage: true,
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'María Camila Restrepo',
    location: 'Bocagrande, Cartagena',
    rating: 5,
    date: 'Hace 3 días',
    product: 'Combo Camiseta + Tote Bag',
    comment: 'La calidad del algodón de la camiseta superó todas mis expectativas. Subí la foto de mi perrito y quedó nítida en el DTF. El envío en Cartagena llegó al día siguiente.',
    verified: true,
    tag: 'Cliente Verificado',
  },
  {
    id: 'rev-2',
    name: 'Andrés Felipe Morales',
    location: 'Manga, Cartagena',
    rating: 5,
    date: 'Hace 1 semana',
    product: 'Combo Mug + Camiseta Personalizada',
    comment: 'Elegí el pago del 50% de anticipo por Nequi y cancelé el resto al recibir en mi casa. El código Spotify del mug escanea perfecto en la app. Excelente atención.',
    verified: true,
    tag: 'Cliente Verificado',
  },
  {
    id: 'rev-3',
    name: 'Valentina Cuello',
    location: 'Castillogrande, Cartagena',
    rating: 5,
    date: 'Hace 2 semanas',
    product: 'Combo Llavero + Mug con Caja de Regalo',
    comment: 'La caja de regalo de $8.000 vale completamente la pena. La cinta de satén y la tarjeta escrita a mano le dieron un toque de lujo que le encantó a mi novio en su aniversario.',
    verified: true,
    tag: 'Cliente Verificado',
  },
  {
    id: 'rev-4',
    name: 'Carlos Mario Tatis',
    location: 'Turbaco / Cartagena',
    rating: 5,
    date: 'Hace 3 semanas',
    product: 'Rompecabezas de Colección',
    comment: 'Hicimos un rompecabezas familiar con una foto de Barú. Las piezas encajan firme y el brillo es espectacular. 10/10 para WOLF.',
    verified: true,
    tag: 'Cliente Verificado',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Cuánto tiempo tarda la elaboración de mi pedido personalizado?',
    answer: 'Al ser un taller local de co-creación en Cartagena, nuestros tiempos son récord: de 24 a 48 horas hábiles después de aprobado el diseño y recibido el anticipo del 50%. En temporadas altas, te confirmaremos el despacho de inmediato vía WhatsApp.',
    category: 'produccion',
  },
  {
    id: 'faq-2',
    question: '¿Cómo funciona el anticipo del 50%?',
    answer: 'Pensando en tu total tranquilidad, únicamente abonas el 50% para que nuestro equipo corte, ensamble y estampe tu producto. El 50% restante lo cancelas contra entrega si estás en el perímetro urbano de Cartagena, o antes del despacho si es envío nacional.',
    category: 'produccion',
  },
  {
    id: 'faq-3',
    question: '¿Cuáles son los costos y tiempos de entrega en Cartagena?',
    answer: 'Manejamos tarifa plana local de $8.000 COP para domicilios en Cartagena (Bocagrande, Manga, Centro Histórico, Castillogrande, Crespo, La Castellana, etc.). ¡En compras superiores a $90.000 COP el envío local es completamente GRATIS!',
    category: 'envios',
  },
  {
    id: 'faq-4',
    question: '¿Cómo debo lavar las prendas estampadas para máxima durabilidad?',
    answer: 'Recomendamos lavar la camiseta al revés con agua fría o templada, evitar el uso de blanqueadores clorados directos y no planchar directamente sobre el estampado (usar plancha tibia al revés o con un paño intermedio). Con estos cuidados tu prenda durará intacta por años.',
    category: 'cuidados',
  },
  {
    id: 'faq-5',
    question: '¿Qué garantía tengo sobre el diseño y la calidad?',
    answer: 'Garantía 100% WOLF: si tu producto presenta algún defecto de fabricación, falla en la costura o error de impresión atribuible a nuestro taller, te reimprimimos la pieza sin costo adicional o reembolsamos tu dinero.',
    category: 'garantia',
  },
];

export const RECENT_PURCHASES = [
  { name: 'María C.', location: 'Bocagrande', combo: 'Combo Mug + Camiseta Personalizada', time: 'Hace 4 minutos' },
  { name: 'Sebastián G.', location: 'Manga', combo: 'Combo Camiseta + Tote Bag', time: 'Hace 9 minutos' },
  { name: 'Valentina P.', location: 'Castillogrande', combo: 'Combo Llavero + Mug', time: 'Hace 17 minutos' },
  { name: 'Daniel R.', location: 'Pie de la Popa', combo: 'Camiseta Algodón Premium (Blanco)', time: 'Hace 28 minutos' },
  { name: 'Camila T.', location: 'Getsemaní', combo: 'Combo Camiseta + Tote Bag + Caja Regalo', time: 'Hace 35 minutos' },
];
