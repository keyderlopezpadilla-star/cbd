export interface BlogAuthor {
  id: string
  name: string
  role: string
  bio: string
  avatar: string | null
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: BlogAuthor
  category: string
  tags: string[]
  readTime: number
  publishedAt: string
  featuredImage: string
}

export const BLOG_CATEGORIES = [
  'Educacion',
  'Noticias',
  'Productos',
  'Estilo de Vida',
  'Ciencia',
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export const BLOG_AUTHORS: BlogAuthor[] = [
  {
    id: 'author-1',
    name: 'Dra. Elena Martinez',
    role: 'Directora de Investigacion',
    bio: 'Doctora en Bioquimica con mas de 10 anos de experiencia en investigacion de cannabinoides. Especialista en aplicaciones terapeuticas del CBD y su interaccion con el sistema endocannabinoide.',
    avatar: null,
  },
  {
    id: 'author-2',
    name: 'Carlos Ruiz',
    role: 'Editor de Contenido',
    bio: 'Periodista especializado en la industria del cannabis medicinal y bienestar. Colaborador en medios nacionales e internacionales sobre regulacion y tendencias del sector.',
    avatar: null,
  },
  {
    id: 'author-3',
    name: 'Ana Lopez',
    role: 'Especialista en Producto',
    bio: 'Experta en formulaciones de CBD con certificacion en cosmetica natural. Asesora en desarrollo de productos para el sector wellness y retail especializado.',
    avatar: null,
  },
  {
    id: 'author-4',
    name: 'Miguel Torres',
    role: 'Analista de Mercado',
    bio: 'Economista con enfoque en mercados emergentes de cannabis legal. Analiza tendencias de consumo y regulaciones en Europa y Latinoamerica.',
    avatar: null,
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'guia-completa-cbd-bienestar',
    title: 'Guia Completa: CBD y Bienestar en 2024',
    excerpt: 'Descubre como el CBD esta transformando el sector del bienestar con aplicaciones que van desde el manejo del estres hasta el cuidado de la piel.',
    content: `El cannabidiol (CBD) se ha consolidado como uno de los ingredientes mas prometedores en el sector del bienestar durante los ultimos anos. A diferencia del THC, el CBD no produce efectos psicoactivos, lo que lo convierte en una opcion atractiva para quienes buscan los beneficios terapeuticos del cannabis sin alteraciones cognitivas.

Las investigaciones recientes han demostrado que el CBD interactua con el sistema endocannabinoide del cuerpo humano, un sistema regulador que influye en funciones como el sueno, el apetito, el dolor y la respuesta inmune. Esta interaccion explica por que el CBD muestra potencial en tantas areas diferentes del bienestar personal.

Entre las aplicaciones mas populares encontramos el manejo del estres y la ansiedad, el apoyo al descanso nocturno, el alivio de molestias musculares y articulares, y el cuidado dermatologico. Los aceites sublinguales siguen siendo el formato mas demandado, aunque las cremas topicas y las capsulas ganan terreno rapidamente en el mercado espanol.`,
    author: BLOG_AUTHORS[0],
    category: 'Educacion',
    tags: ['bienestar', 'cbd', 'salud', 'guia'],
    readTime: 8,
    publishedAt: '2024-01-15',
    featuredImage: '/images/blog/cbd-bienestar.jpg',
  },
  {
    id: 'post-2',
    slug: 'regulacion-cbd-espana-2024',
    title: 'Regulacion del CBD en Espana: Novedades 2024',
    excerpt: 'Un repaso completo a los cambios regulatorios que afectan al sector del CBD en Espana y la Union Europea durante este ano.',
    content: `El marco regulatorio del CBD en Espana continua evolucionando, y 2024 trae consigo cambios significativos que todo operador del sector debe conocer. La Agencia Espanola de Medicamentos y Productos Sanitarios (AEMPS) ha actualizado sus directrices sobre productos con cannabidiol, estableciendo nuevos parametros para su comercializacion.

La Union Europea, por su parte, ha avanzado en la clasificacion del CBD como Novel Food, lo que implica que los productos destinados al consumo oral deben obtener una autorizacion especifica. Este proceso, aunque largo, proporciona mayor seguridad juridica a las empresas del sector y garantiza estandares de calidad para los consumidores.

En el ambito cosmetico, el CBD mantiene su estatus legal como ingrediente en productos topicos, siempre que el contenido de THC no supere el 0.2%. Las tiendas especializadas deben asegurarse de que sus proveedores cuentan con los certificados de analisis correspondientes y que el etiquetado cumple con la normativa vigente sobre claims y propiedades.`,
    author: BLOG_AUTHORS[1],
    category: 'Noticias',
    tags: ['regulacion', 'legal', 'espana', 'europa'],
    readTime: 6,
    publishedAt: '2024-01-12',
    featuredImage: '/images/blog/regulacion-cbd.jpg',
  },
  {
    id: 'post-3',
    slug: 'aceites-cbd-como-elegir',
    title: 'Aceites de CBD: Como Elegir el Adecuado para Ti',
    excerpt: 'Full Spectrum, Broad Spectrum o Aislado? Te explicamos las diferencias entre los tipos de aceite de CBD y como seleccionar el mas apropiado.',
    content: `Elegir el aceite de CBD adecuado puede resultar abrumador dada la variedad de opciones disponibles en el mercado. Los tres tipos principales son Full Spectrum (espectro completo), Broad Spectrum (amplio espectro) y CBD Aislado, y cada uno ofrece beneficios distintos segun las necesidades del usuario.

El aceite Full Spectrum contiene todos los cannabinoides, terpenos y flavonoides presentes en la planta, incluida una cantidad minima de THC (inferior al 0.2%). Esta combinacion genera lo que se conoce como el "efecto sequito", donde los compuestos trabajan sinergicamente para potenciar sus efectos individuales. Es la opcion preferida por quienes buscan el maximo beneficio terapeutico.

El Broad Spectrum ofrece un perfil similar al Full Spectrum pero con el THC completamente eliminado, ideal para personas que desean evitar cualquier rastro de THC. El CBD Aislado, por su parte, es la forma mas pura del cannabidiol (99%+) y resulta apropiado para quienes necesitan dosificaciones exactas o tienen sensibilidad a otros compuestos del cannabis.`,
    author: BLOG_AUTHORS[2],
    category: 'Productos',
    tags: ['aceites', 'productos', 'full-spectrum', 'guia-compra'],
    readTime: 7,
    publishedAt: '2024-01-10',
    featuredImage: '/images/blog/aceites-cbd.jpg',
  },
  {
    id: 'post-4',
    slug: 'cbd-deporte-recuperacion',
    title: 'CBD y Deporte: Acelerando la Recuperacion Muscular',
    excerpt: 'Atletas profesionales y aficionados estan incorporando el CBD en sus rutinas de recuperacion. Conoce la ciencia detras de esta tendencia.',
    content: `El uso del CBD en el ambito deportivo ha experimentado un crecimiento exponencial desde que la Agencia Mundial Antidopaje (WADA) retiro el cannabidiol de su lista de sustancias prohibidas en 2018. Desde entonces, atletas de elite y deportistas recreativos han integrado el CBD como parte fundamental de sus protocolos de recuperacion.

Las propiedades antiinflamatorias del CBD lo convierten en un aliado natural para el manejo del dolor muscular post-ejercicio (DOMS). Estudios preliminares sugieren que el CBD puede reducir los marcadores inflamatorios y acelerar la regeneracion del tejido muscular danado durante el entrenamiento intenso. Los formatos topicos como balsamos y cremas son especialmente populares para aplicacion localizada.

Ademas de la recuperacion fisica, muchos deportistas reportan mejoras en la calidad del sueno al utilizar CBD, un factor crucial para la regeneracion muscular y el rendimiento atletico. La reduccion del estres competitivo y la ansiedad pre-competicion son otros beneficios frecuentemente citados por atletas que incorporan CBD en su rutina diaria.`,
    author: BLOG_AUTHORS[0],
    category: 'Estilo de Vida',
    tags: ['deporte', 'recuperacion', 'fitness', 'atletas'],
    readTime: 6,
    publishedAt: '2024-01-08',
    featuredImage: '/images/blog/cbd-deporte.jpg',
  },
  {
    id: 'post-5',
    slug: 'sistema-endocannabinoide-explicado',
    title: 'El Sistema Endocannabinoide: La Ciencia Detras del CBD',
    excerpt: 'Entiende como funciona el sistema endocannabinoide y por que el CBD puede influir en tantos procesos biologicos del cuerpo humano.',
    content: `El sistema endocannabinoide (SEC) es uno de los sistemas reguladores mas importantes del cuerpo humano, aunque fue descubierto relativamente hace poco, en la decada de 1990. Esta compuesto por receptores (CB1 y CB2), endocannabinoides producidos naturalmente por el cuerpo (como la anandamida y el 2-AG) y enzimas que sintetizan y degradan estos compuestos.

Los receptores CB1 se encuentran predominantemente en el sistema nervioso central, mientras que los CB2 estan mas presentes en celulas del sistema inmune y tejidos perifericos. El CBD no se une directamente a estos receptores como lo hace el THC, sino que modula su actividad de forma indirecta, influyendo en la senalizacion de otros neurotransmisores como la serotonina y la adenosina.

Esta modulacion indirecta explica el perfil de seguridad favorable del CBD y su amplio rango de aplicaciones potenciales. Al influir en el SEC, el CBD puede ayudar a mantener la homeostasis corporal, ese equilibrio interno que el cuerpo constantemente busca mantener frente a factores de estres externos e internos.`,
    author: BLOG_AUTHORS[0],
    category: 'Ciencia',
    tags: ['ciencia', 'endocannabinoide', 'receptores', 'investigacion'],
    readTime: 9,
    publishedAt: '2024-01-05',
    featuredImage: '/images/blog/sistema-endocannabinoide.jpg',
  },
  {
    id: 'post-6',
    slug: 'cosmetica-cbd-tendencias',
    title: 'Cosmetica con CBD: Las Tendencias que Dominaran el Mercado',
    excerpt: 'El CBD se posiciona como el ingrediente estrella en cosmetica natural. Descubre los productos y formulaciones mas innovadoras del sector.',
    content: `La cosmetica con CBD ha dejado de ser una novedad para convertirse en un segmento consolidado dentro del mercado de belleza y cuidado personal. Las propiedades antioxidantes, antiinflamatorias y seborreguladoras del cannabidiol lo hacen especialmente atractivo para formulaciones destinadas al cuidado facial y corporal.

Los serums faciales con CBD lideran las ventas en el segmento premium, seguidos de cremas hidratantes y contornos de ojos. La combinacion de CBD con otros activos como el acido hialuronico, la vitamina C o el retinol esta generando productos de alta eficacia que compiten directamente con marcas de lujo establecidas. El CBD aporta un efecto calmante que complementa la accion de ingredientes mas potentes.

Las tendencias para 2024 apuntan hacia formulaciones personalizadas, productos multifuncionales y una mayor transparencia en la cadena de suministro. Los consumidores demandan certificados de analisis accesibles, trazabilidad del cannabidiol desde el cultivo hasta el producto final, y concentraciones claramente indicadas en el etiquetado.`,
    author: BLOG_AUTHORS[2],
    category: 'Productos',
    tags: ['cosmetica', 'belleza', 'tendencias', 'skincare'],
    readTime: 5,
    publishedAt: '2024-01-03',
    featuredImage: '/images/blog/cosmetica-cbd.jpg',
  },
  {
    id: 'post-7',
    slug: 'cbd-sueno-insomnio',
    title: 'CBD para el Sueno: Una Alternativa Natural al Insomnio',
    excerpt: 'Millones de personas buscan soluciones naturales para mejorar su descanso. El CBD emerge como una opcion prometedora respaldada por la ciencia.',
    content: `Los trastornos del sueno afectan a aproximadamente un 30% de la poblacion espanola, y la busqueda de alternativas naturales a los farmacos hipnoticos tradicionales ha impulsado el interes en el CBD como coadyuvante para mejorar la calidad del descanso nocturno.

El mecanismo por el cual el CBD favorece el sueno es multifactorial. Por un lado, su efecto ansiolitico ayuda a reducir la activacion mental que frecuentemente impide conciliar el sueno. Por otro, su interaccion con receptores de adenosina puede influir en el ciclo natural de vigilia-sueno. Algunos estudios sugieren que dosis mas altas de CBD (160mg+) tienen un efecto sedante directo, mientras que dosis bajas pueden promover la alerta.

Para optimizar los resultados, los expertos recomiendan tomar el CBD entre 30 y 60 minutos antes de acostarse, mantener una rutina consistente y combinar su uso con buenas practicas de higiene del sueno. Los formatos sublinguales ofrecen una absorcion mas rapida, mientras que las capsulas proporcionan una liberacion mas sostenida durante la noche.`,
    author: BLOG_AUTHORS[0],
    category: 'Educacion',
    tags: ['sueno', 'insomnio', 'descanso', 'bienestar'],
    readTime: 7,
    publishedAt: '2024-01-01',
    featuredImage: '/images/blog/cbd-sueno.jpg',
  },
  {
    id: 'post-8',
    slug: 'mercado-cbd-europa-crecimiento',
    title: 'El Mercado del CBD en Europa: Crecimiento y Oportunidades',
    excerpt: 'Europa se consolida como el segundo mercado mundial de CBD. Analizamos las cifras, tendencias y oportunidades para emprendedores del sector.',
    content: `El mercado europeo del CBD ha alcanzado un valor estimado de 3.200 millones de euros en 2023, con proyecciones que indican un crecimiento anual compuesto del 21% hasta 2028. Espana, junto con Alemania y Reino Unido, se posiciona como uno de los mercados lideres en facturacion y numero de puntos de venta especializados.

Los factores que impulsan este crecimiento incluyen una mayor aceptacion social del cannabis no psicoactivo, el avance en marcos regulatorios claros, y la diversificacion de productos que van mas alla de los aceites tradicionales. El segmento de alimentacion y bebidas con CBD, aunque aun pendiente de regulacion completa como Novel Food, representa una oportunidad enorme una vez se consoliden las autorizaciones.

Para los emprendedores del sector, las oportunidades mas prometedoras se encuentran en la diferenciacion a traves de calidad y trazabilidad, la especializacion en nichos (deporte, cosmetica, mascotas) y la construccion de marcas que transmitan confianza y transparencia. La tecnologia juega un papel crucial: plataformas de gestion como CBD SaaS permiten escalar operaciones manteniendo el control sobre inventario, cumplimiento normativo y experiencia del cliente.`,
    author: BLOG_AUTHORS[3],
    category: 'Noticias',
    tags: ['mercado', 'europa', 'negocio', 'crecimiento'],
    readTime: 8,
    publishedAt: '2023-12-28',
    featuredImage: '/images/blog/mercado-europa.jpg',
  },
  {
    id: 'post-9',
    slug: 'cbd-mascotas-guia-veterinaria',
    title: 'CBD para Mascotas: Guia Veterinaria Completa',
    excerpt: 'El CBD veterinario gana popularidad como complemento para el bienestar animal. Conoce las dosis, indicaciones y precauciones para tu mascota.',
    content: `El mercado de CBD para mascotas es uno de los segmentos de mayor crecimiento en la industria del cannabidiol. Perros y gatos tambien poseen un sistema endocannabinoide, lo que hace que el CBD pueda ofrecer beneficios similares a los observados en humanos, adaptados a las necesidades especificas de cada especie.

Las aplicaciones mas comunes del CBD veterinario incluyen el manejo de la ansiedad por separacion, el apoyo en problemas articulares en animales senior, la reduccion del estres durante tormentas o fuegos artificiales, y el complemento en tratamientos oncologicos. Es fundamental utilizar productos especificamente formulados para animales, con concentraciones adecuadas y sin terpenos que puedan ser toxicos para ciertas especies.

La dosificacion varia significativamente segun el peso del animal, su condicion y el formato del producto. Como regla general, se recomienda iniciar con 1-2mg de CBD por cada 5kg de peso corporal y ajustar gradualmente. Siempre es imprescindible consultar con un veterinario antes de iniciar cualquier suplementacion con CBD, especialmente si el animal esta recibiendo otra medicacion.`,
    author: BLOG_AUTHORS[2],
    category: 'Educacion',
    tags: ['mascotas', 'veterinaria', 'animales', 'dosificacion'],
    readTime: 6,
    publishedAt: '2023-12-25',
    featuredImage: '/images/blog/cbd-mascotas.jpg',
  },
  {
    id: 'post-10',
    slug: 'terpenos-cbd-efecto-sequito',
    title: 'Terpenos y CBD: Entendiendo el Efecto Sequito',
    excerpt: 'Los terpenos son compuestos aromaticos que potencian los efectos del CBD. Aprende a identificarlos y elegir productos segun su perfil terpenico.',
    content: `Los terpenos son moleculas aromaticas presentes en innumerables plantas, incluyendo el cannabis. Estos compuestos no solo determinan el aroma y sabor de cada variedad, sino que tambien poseen propiedades terapeuticas propias que, combinadas con cannabinoides como el CBD, generan lo que se conoce como el "efecto sequito".

Entre los terpenos mas relevantes encontramos el mirceno (con propiedades relajantes y antiinflamatorias), el limoneno (energizante y ansiolhtico), el linalool (calmante, presente tambien en la lavanda) y el beta-cariofileno (antiinflamatorio, con afinidad directa por receptores CB2). Un aceite de CBD Full Spectrum rico en mirceno tendra un perfil mas sedante, mientras que uno rico en limoneno resultara mas estimulante.

Comprender los perfiles terpenicos permite a los profesionales del sector CBD asesorar mejor a sus clientes, recomendando productos especificos segun las necesidades individuales. Las tiendas especializadas que ofrecen informacion detallada sobre la composicion terpenica de sus productos logran una diferenciacion significativa y una mayor fidelizacion de clientes conocedores.`,
    author: BLOG_AUTHORS[0],
    category: 'Ciencia',
    tags: ['terpenos', 'efecto-sequito', 'cannabinoides', 'full-spectrum'],
    readTime: 8,
    publishedAt: '2023-12-22',
    featuredImage: '/images/blog/terpenos-cbd.jpg',
  },
]

export const BLOG_TAGS = [
  'cbd',
  'bienestar',
  'salud',
  'regulacion',
  'legal',
  'aceites',
  'productos',
  'deporte',
  'ciencia',
  'cosmetica',
  'sueno',
  'mercado',
  'mascotas',
  'terpenos',
  'guia',
  'europa',
  'tendencias',
  'investigacion',
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.category === category)
}

export function getRelatedPosts(postId: string, limit: number = 3): BlogPost[] {
  const post = BLOG_POSTS.find((p) => p.id === postId)
  if (!post) return []
  return BLOG_POSTS.filter(
    (p) => p.id !== postId && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, limit)
}

export function searchBlogPosts(query: string): BlogPost[] {
  const lower = query.toLowerCase()
  return BLOG_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(lower) ||
      post.excerpt.toLowerCase().includes(lower) ||
      post.tags.some((tag) => tag.includes(lower))
  )
}
