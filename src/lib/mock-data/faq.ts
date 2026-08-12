export interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

export interface FAQCategory {
  id: string
  name: string
  icon: string
  description: string
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'pedidos',
    name: 'Pedidos',
    icon: 'ShoppingCart',
    description: 'Informacion sobre como realizar y gestionar tus pedidos',
  },
  {
    id: 'productos',
    name: 'Productos',
    icon: 'Package',
    description: 'Detalles sobre nuestros productos de CBD',
  },
  {
    id: 'envios',
    name: 'Envios',
    icon: 'Truck',
    description: 'Plazos de entrega, costes y seguimiento',
  },
  {
    id: 'devoluciones',
    name: 'Devoluciones',
    icon: 'RotateCcw',
    description: 'Politica de devolucion y cambios',
  },
  {
    id: 'cuenta',
    name: 'Cuenta',
    icon: 'User',
    description: 'Gestion de tu cuenta y datos personales',
  },
  {
    id: 'info-cbd',
    name: 'Info CBD',
    icon: 'Leaf',
    description: 'Informacion general sobre el CBD',
  },
]

export const FAQ_ITEMS: FAQItem[] = [
  // Pedidos
  {
    id: 'faq-1',
    question: 'Como puedo realizar un pedido?',
    answer: 'Puedes realizar un pedido a traves de nuestra tienda online seleccionando los productos deseados y completando el proceso de pago. Tambien puedes llamarnos al telefono de atencion al cliente o visitar cualquiera de nuestras tiendas fisicas.',
    category: 'pedidos',
  },
  {
    id: 'faq-2',
    question: 'Cuales son los metodos de pago aceptados?',
    answer: 'Aceptamos tarjetas de credito y debito (Visa, Mastercard, American Express), transferencia bancaria, Bizum y PayPal. Todos los pagos se procesan de forma segura con encriptacion SSL.',
    category: 'pedidos',
  },
  {
    id: 'faq-3',
    question: 'Puedo modificar un pedido una vez realizado?',
    answer: 'Si tu pedido aun no ha sido procesado para envio, puedes contactarnos para realizar modificaciones. Una vez que el pedido esta en preparacion o enviado, no es posible modificarlo, aunque si puedes solicitar una devolucion una vez recibido.',
    category: 'pedidos',
  },
  {
    id: 'faq-4',
    question: 'Como puedo ver el estado de mi pedido?',
    answer: 'Accede a tu cuenta en nuestra web y ve a la seccion "Mis Pedidos". Ahi podras ver el estado actualizado de cada pedido. Tambien recibiras notificaciones por email con cada cambio de estado.',
    category: 'pedidos',
  },
  {
    id: 'faq-5',
    question: 'Hay un importe minimo para realizar un pedido?',
    answer: 'No hay importe minimo para pedidos online. Sin embargo, para pedidos inferiores a 40 euros se aplican gastos de envio estandar. Los pedidos superiores a 40 euros disfrutan de envio gratuito en peninsula.',
    category: 'pedidos',
  },
  {
    id: 'faq-6',
    question: 'Puedo aplicar un codigo de descuento a mi pedido?',
    answer: 'Si, durante el proceso de compra encontraras un campo para introducir tu codigo de descuento. Los codigos se aplican antes del pago y no son acumulables con otras promociones salvo que se indique lo contrario.',
    category: 'pedidos',
  },
  // Productos
  {
    id: 'faq-7',
    question: 'Los productos de CBD son legales en Espana?',
    answer: 'Si, nuestros productos de CBD son completamente legales en Espana. Todos cumplen con la normativa vigente y contienen menos del 0.2% de THC. Contamos con certificados de analisis de laboratorios independientes para cada lote.',
    category: 'productos',
  },
  {
    id: 'faq-8',
    question: 'Cual es la diferencia entre CBD Full Spectrum y Aislado?',
    answer: 'El CBD Full Spectrum contiene todos los cannabinoides, terpenos y flavonoides de la planta (incluido THC < 0.2%), aprovechando el efecto sequito. El CBD Aislado es cannabidiol puro al 99%, sin otros compuestos. El Full Spectrum suele ser mas efectivo, mientras que el Aislado es ideal para quienes quieren evitar cualquier rastro de THC.',
    category: 'productos',
  },
  {
    id: 'faq-9',
    question: 'Que concentracion de CBD debo elegir?',
    answer: 'Recomendamos empezar con concentraciones bajas (5-10%) e ir aumentando gradualmente segun necesidad. Para uso general de bienestar, el 10% suele ser adecuado. Para necesidades mas especificas, concentraciones del 15-20% pueden ser mas apropiadas. Consulta siempre con un profesional sanitario.',
    category: 'productos',
  },
  {
    id: 'faq-10',
    question: 'Los productos tienen fecha de caducidad?',
    answer: 'Si, todos nuestros productos tienen una fecha de consumo preferente indicada en el envase. Los aceites de CBD suelen tener una vida util de 12-18 meses una vez abiertos, siempre que se conserven en lugar fresco y oscuro. Las cremas y cosmeticos indican el PAO (periodo despues de apertura).',
    category: 'productos',
  },
  {
    id: 'faq-11',
    question: 'De donde proviene el CBD de vuestros productos?',
    answer: 'Nuestro CBD proviene de cultivos organicos certificados en la Union Europea, principalmente en Suiza, Italia y Espana. Trabajamos solo con proveedores que garantizan trazabilidad completa desde la semilla hasta el producto final.',
    category: 'productos',
  },
  {
    id: 'faq-12',
    question: 'Puedo dar CBD a mi mascota?',
    answer: 'Si, disponemos de una linea especifica para mascotas con concentraciones y formulaciones adaptadas. Nunca uses productos de CBD para humanos en animales sin consultar a un veterinario, ya que algunos ingredientes como ciertos terpenos pueden no ser seguros para todas las especies.',
    category: 'productos',
  },
  {
    id: 'faq-13',
    question: 'Los productos contienen alerrgenos?',
    answer: 'Todos nuestros productos incluyen la lista completa de ingredientes en el etiquetado. Los aceites base suelen ser de semilla de canamo o MCT (coco). Si tienes alergias especificas, revisa siempre la composicion detallada o contactanos antes de comprar.',
    category: 'productos',
  },
  // Envios
  {
    id: 'faq-14',
    question: 'Cuanto tarda en llegar mi pedido?',
    answer: 'Los pedidos realizados antes de las 14:00h se envian el mismo dia laborable. El plazo de entrega es de 24-48 horas para peninsula, 3-5 dias para Baleares y Canarias, y 5-7 dias para envios internacionales dentro de la UE.',
    category: 'envios',
  },
  {
    id: 'faq-15',
    question: 'Cuanto cuestan los gastos de envio?',
    answer: 'Envio gratuito en peninsula para pedidos superiores a 40 euros. Para pedidos inferiores, el coste es de 4.95 euros. Baleares: 6.95 euros. Canarias: 9.95 euros (exento de IGIC). Envios internacionales UE: desde 8.95 euros segun destino.',
    category: 'envios',
  },
  {
    id: 'faq-16',
    question: 'Como puedo hacer seguimiento de mi envio?',
    answer: 'Una vez preparado tu pedido, recibiras un email con el numero de seguimiento y un enlace directo al tracking de la empresa de transporte. Tambien puedes consultar el estado en la seccion "Mis Pedidos" de tu cuenta.',
    category: 'envios',
  },
  {
    id: 'faq-17',
    question: 'Realizais envios internacionales?',
    answer: 'Si, enviamos a todos los paises de la Union Europea. Para envios fuera de la UE, contactanos para confirmar disponibilidad y costes. Ten en cuenta que la legislacion sobre CBD varia segun el pais de destino.',
    category: 'envios',
  },
  {
    id: 'faq-18',
    question: 'Que ocurre si no estoy en casa cuando llega el paquete?',
    answer: 'El transportista intentara la entrega hasta 2 veces. Si no hay nadie, dejara un aviso y el paquete quedara disponible en el punto de recogida mas cercano durante 7 dias. Tambien puedes indicar una direccion alternativa o punto de recogida al realizar el pedido.',
    category: 'envios',
  },
  {
    id: 'faq-19',
    question: 'El envio es discreto?',
    answer: 'Si, todos nuestros envios se realizan en embalaje neutro sin indicaciones del contenido. No aparece ninguna referencia a CBD ni a nuestra marca en el exterior del paquete, garantizando total privacidad.',
    category: 'envios',
  },
  // Devoluciones
  {
    id: 'faq-20',
    question: 'Cual es vuestra politica de devolucion?',
    answer: 'Dispones de 14 dias naturales desde la recepcion del pedido para solicitar una devolucion. Los productos deben estar sin abrir y en su embalaje original. Para productos defectuosos o erroneos, el plazo se extiende a 30 dias y cubrimos los gastos de devolucion.',
    category: 'devoluciones',
  },
  {
    id: 'faq-21',
    question: 'Como solicito una devolucion?',
    answer: 'Accede a tu cuenta, ve a "Mis Pedidos", selecciona el pedido y haz clic en "Solicitar devolucion". Indica el motivo y te enviaremos las instrucciones y la etiqueta de envio. Tambien puedes contactar a nuestro servicio de atencion al cliente.',
    category: 'devoluciones',
  },
  {
    id: 'faq-22',
    question: 'Cuanto tarda el reembolso?',
    answer: 'Una vez recibido y verificado el producto devuelto, procesamos el reembolso en un plazo maximo de 5 dias laborables. El tiempo que tarda en reflejarse en tu cuenta depende de tu entidad bancaria (normalmente 3-5 dias adicionales).',
    category: 'devoluciones',
  },
  {
    id: 'faq-23',
    question: 'Puedo cambiar un producto por otro?',
    answer: 'Si, puedes solicitar un cambio por un producto de igual o diferente valor. Si el nuevo producto es de mayor valor, te indicaremos la diferencia a abonar. Si es inferior, te reembolsaremos la diferencia.',
    category: 'devoluciones',
  },
  {
    id: 'faq-24',
    question: 'Que hago si recibo un producto danado?',
    answer: 'Contactanos inmediatamente con fotos del producto y el embalaje. Procederemos al envio de un reemplazo sin coste alguno o al reembolso completo, segun prefieras. No necesitas devolver el producto danado.',
    category: 'devoluciones',
  },
  // Cuenta
  {
    id: 'faq-25',
    question: 'Como creo una cuenta?',
    answer: 'Haz clic en "Registrarse" en la parte superior de la web. Introduce tu email, crea una contrasena y completa tus datos basicos. Tambien puedes registrarte durante el proceso de compra. Recibiras un email de confirmacion para activar tu cuenta.',
    category: 'cuenta',
  },
  {
    id: 'faq-26',
    question: 'He olvidado mi contrasena, que hago?',
    answer: 'Haz clic en "He olvidado mi contrasena" en la pagina de inicio de sesion. Introduce tu email y te enviaremos un enlace para restablecer tu contrasena. El enlace es valido durante 24 horas.',
    category: 'cuenta',
  },
  {
    id: 'faq-27',
    question: 'Como puedo modificar mis datos personales?',
    answer: 'Accede a tu cuenta y ve a "Mi Perfil" o "Ajustes de cuenta". Ahi podras actualizar tu nombre, direccion, telefono y preferencias de comunicacion. Para cambiar el email asociado, contacta a atencion al cliente por seguridad.',
    category: 'cuenta',
  },
  {
    id: 'faq-28',
    question: 'Como elimino mi cuenta?',
    answer: 'Puedes solicitar la eliminacion de tu cuenta contactando a nuestro servicio de atencion al cliente o desde la seccion de privacidad de tu perfil. Conforme al RGPD, eliminaremos todos tus datos personales en un plazo maximo de 30 dias.',
    category: 'cuenta',
  },
  {
    id: 'faq-29',
    question: 'Que beneficios tiene tener una cuenta?',
    answer: 'Con tu cuenta puedes hacer seguimiento de pedidos, guardar direcciones de envio, acceder al historial de compras, acumular puntos en el programa de fidelidad, recibir ofertas exclusivas y gestionar tus preferencias de comunicacion.',
    category: 'cuenta',
  },
  // Info CBD
  {
    id: 'faq-30',
    question: 'Que es el CBD?',
    answer: 'El CBD (cannabidiol) es un compuesto natural extraido de la planta de cannabis. A diferencia del THC, no produce efectos psicoactivos. Se utiliza como complemento de bienestar por sus propiedades antioxidantes y su interaccion con el sistema endocannabinoide del cuerpo.',
    category: 'info-cbd',
  },
  {
    id: 'faq-31',
    question: 'El CBD produce efectos psicoactivos o coloca?',
    answer: 'No, el CBD no produce ningun efecto psicoactivo ni sensacion de "colocon". Nuestros productos contienen menos del 0.2% de THC, muy por debajo del umbral necesario para producir cualquier efecto psicoactivo.',
    category: 'info-cbd',
  },
  {
    id: 'faq-32',
    question: 'El CBD puede dar positivo en un test de drogas?',
    answer: 'Los tests de drogas estandar detectan THC, no CBD. Sin embargo, productos Full Spectrum contienen trazas de THC (< 0.2%) que en uso intensivo podrian dar un falso positivo en tests muy sensibles. Si te preocupa, opta por productos con CBD Aislado o Broad Spectrum (0% THC).',
    category: 'info-cbd',
  },
  {
    id: 'faq-33',
    question: 'El CBD tiene efectos secundarios?',
    answer: 'El CBD es generalmente bien tolerado. En algunos casos pueden aparecer efectos leves como somnolencia, sequedad bucal o cambios en el apetito. Es importante consultar con un medico si tomas medicacion, ya que el CBD puede interactuar con ciertos farmacos.',
    category: 'info-cbd',
  },
  {
    id: 'faq-34',
    question: 'Cuanto CBD debo tomar?',
    answer: 'No existe una dosis universal. Recomendamos empezar con una dosis baja (10-20mg al dia) e ir aumentando gradualmente hasta encontrar la cantidad que funcione para ti. Factores como el peso corporal, el metabolismo y el objetivo de uso influyen en la dosis optima.',
    category: 'info-cbd',
  },
  {
    id: 'faq-35',
    question: 'Puedo tomar CBD con otros medicamentos?',
    answer: 'El CBD puede interactuar con algunos medicamentos al influir en las enzimas hepaticas que los metabolizan (citocromo P450). Consulta siempre con tu medico antes de combinar CBD con cualquier medicacion, especialmente anticoagulantes, anticonvulsivos y medicamentos para la presion arterial.',
    category: 'info-cbd',
  },
]

export function getFAQsByCategory(categoryId: string): FAQItem[] {
  return FAQ_ITEMS.filter((item) => item.category === categoryId)
}

export function searchFAQs(query: string): FAQItem[] {
  const lower = query.toLowerCase()
  return FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(lower) ||
      item.answer.toLowerCase().includes(lower)
  )
}

export function getCategoryQuestionCount(categoryId: string): number {
  return FAQ_ITEMS.filter((item) => item.category === categoryId).length
}
