import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

// Fixed reference date for consistent data
const REFERENCE_DATE = new Date('2024-09-15T12:00:00Z');

function daysAgo(days: number): Date {
  const d = new Date(REFERENCE_DATE);
  d.setDate(d.getDate() - days);
  return d;
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await prisma.consentRecord.deleteMany();
  await prisma.customerSegment.deleteMany();
  await prisma.loyaltyTransaction.deleteMany();
  await prisma.inventoryMovement.deleteMany();
  await prisma.stockTransferItem.deleteMany();
  await prisma.stockTransfer.deleteMany();
  await prisma.saleItem.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.supplierProduct.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.employeePerformance.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.store.deleteMany();
  await prisma.organizationSettings.deleteMany();
  await prisma.organization.deleteMany();

  const hashedPassword = await hash('password123', 12);

  // ============================================
  // ORGANIZATION
  // ============================================
  const org = await prisma.organization.create({
    data: {
      id: 'org_greenleaf_001',
      name: 'GreenLeaf CBD España',
      slug: 'greenleaf-cbd',
      description: 'Red de tiendas especializadas en productos de CBD de alta calidad en España',
      website: 'https://greenleafcbd.es',
      email: 'info@greenleafcbd.es',
      phone: '+34 910 123 456',
      taxId: 'B12345678',
      subscriptionPlan: 'BUSINESS',
      subscriptionEndsAt: new Date('2025-09-15T00:00:00Z'),
      isActive: true,
    },
  });

  await prisma.organizationSettings.create({
    data: {
      organizationId: org.id,
      currency: 'EUR',
      locale: 'es-ES',
      timezone: 'Europe/Madrid',
      taxRate: 21.0,
      pointsPerEuro: 1,
    },
  });

  console.log('Organization created');

  // ============================================
  // STORES
  // ============================================
  const storesData = [
    {
      id: 'store_madrid_001',
      name: 'GreenLeaf Madrid Centro',
      slug: 'madrid-centro',
      address: 'Calle Gran Via 42, Local 3',
      city: 'Madrid',
      state: 'Comunidad de Madrid',
      postalCode: '28013',
      phone: '+34 910 234 567',
      email: 'madrid@greenleafcbd.es',
      latitude: 40.4200,
      longitude: -3.7025,
    },
    {
      id: 'store_barcelona_001',
      name: 'GreenLeaf Barcelona Eixample',
      slug: 'barcelona-eixample',
      address: 'Carrer de Pau Claris 156',
      city: 'Barcelona',
      state: 'Cataluña',
      postalCode: '08009',
      phone: '+34 932 345 678',
      email: 'barcelona@greenleafcbd.es',
      latitude: 41.3925,
      longitude: 2.1680,
    },
    {
      id: 'store_valencia_001',
      name: 'GreenLeaf Valencia Ruzafa',
      slug: 'valencia-ruzafa',
      address: 'Calle de Cadiz 54',
      city: 'Valencia',
      state: 'Comunitat Valenciana',
      postalCode: '46006',
      phone: '+34 960 456 789',
      email: 'valencia@greenleafcbd.es',
      latitude: 39.4610,
      longitude: -0.3748,
    },
    {
      id: 'store_sevilla_001',
      name: 'GreenLeaf Sevilla Triana',
      slug: 'sevilla-triana',
      address: 'Calle San Jacinto 28',
      city: 'Sevilla',
      state: 'Andalucia',
      postalCode: '41010',
      phone: '+34 954 567 890',
      email: 'sevilla@greenleafcbd.es',
      latitude: 37.3826,
      longitude: -6.0035,
    },
    {
      id: 'store_bilbao_001',
      name: 'GreenLeaf Bilbao Casco Viejo',
      slug: 'bilbao-casco-viejo',
      address: 'Calle Bidebarrieta 14',
      city: 'Bilbao',
      state: 'Pais Vasco',
      postalCode: '48005',
      phone: '+34 944 678 901',
      email: 'bilbao@greenleafcbd.es',
      latitude: 43.2569,
      longitude: -2.9236,
    },
  ];

  const stores = [];
  for (const sd of storesData) {
    const store = await prisma.store.create({
      data: {
        ...sd,
        organizationId: org.id,
        country: 'España',
        isActive: true,
        openingHours: {
          monday: '10:00-20:00',
          tuesday: '10:00-20:00',
          wednesday: '10:00-20:00',
          thursday: '10:00-20:00',
          friday: '10:00-21:00',
          saturday: '10:00-21:00',
          sunday: '11:00-14:00',
        },
      },
    });
    stores.push(store);
  }
  console.log('Stores created');

  // ============================================
  // USERS
  // ============================================
  const superAdmin = await prisma.user.create({
    data: {
      id: 'user_superadmin_001',
      email: 'superadmin@greenleafcbd.es',
      password: hashedPassword,
      name: 'Carlos Administrador',
      role: 'SUPER_ADMIN',
      isActive: true,
      lastLoginAt: daysAgo(0),
    },
  });

  const admin = await prisma.user.create({
    data: {
      id: 'user_admin_001',
      email: 'admin@greenleafcbd.es',
      password: hashedPassword,
      name: 'Maria Garcia Lopez',
      role: 'ADMIN',
      isActive: true,
      lastLoginAt: daysAgo(1),
    },
  });

  const managersData = [
    { id: 'user_manager_001', email: 'madrid.manager@greenleafcbd.es', name: 'Pedro Martinez Ruiz', storeId: stores[0].id },
    { id: 'user_manager_002', email: 'barcelona.manager@greenleafcbd.es', name: 'Ana Fernandez Vila', storeId: stores[1].id },
    { id: 'user_manager_003', email: 'valencia.manager@greenleafcbd.es', name: 'Jorge Navarro Blasco', storeId: stores[2].id },
    { id: 'user_manager_004', email: 'sevilla.manager@greenleafcbd.es', name: 'Carmen Moreno Diaz', storeId: stores[3].id },
    { id: 'user_manager_005', email: 'bilbao.manager@greenleafcbd.es', name: 'Iker Etxebarria Zubieta', storeId: stores[4].id },
  ];

  const managers = [];
  for (const md of managersData) {
    const manager = await prisma.user.create({
      data: {
        ...md,
        password: hashedPassword,
        role: 'MANAGER',
        isActive: true,
        lastLoginAt: daysAgo(randomBetween(0, 3)),
      },
    });
    managers.push(manager);
    // Assign as store manager
    await prisma.store.update({
      where: { id: md.storeId },
      data: { managerId: manager.id },
    });
  }

  const employeesData = [
    { id: 'user_emp_001', email: 'laura.madrid@greenleafcbd.es', name: 'Laura Sanchez Perez', storeId: stores[0].id },
    { id: 'user_emp_002', email: 'david.madrid@greenleafcbd.es', name: 'David Lopez Torres', storeId: stores[0].id },
    { id: 'user_emp_003', email: 'elena.madrid@greenleafcbd.es', name: 'Elena Ruiz Gomez', storeId: stores[0].id },
    { id: 'user_emp_004', email: 'marc.barcelona@greenleafcbd.es', name: 'Marc Puig Soler', storeId: stores[1].id },
    { id: 'user_emp_005', email: 'laia.barcelona@greenleafcbd.es', name: 'Laia Costa Ferrer', storeId: stores[1].id },
    { id: 'user_emp_006', email: 'pau.barcelona@greenleafcbd.es', name: 'Pau Roca Marti', storeId: stores[1].id },
    { id: 'user_emp_007', email: 'amparo.valencia@greenleafcbd.es', name: 'Amparo Vidal Sanchis', storeId: stores[2].id },
    { id: 'user_emp_008', email: 'vicent.valencia@greenleafcbd.es', name: 'Vicent Sala Ortiz', storeId: stores[2].id },
    { id: 'user_emp_009', email: 'rocio.sevilla@greenleafcbd.es', name: 'Rocio Delgado Vega', storeId: stores[3].id },
    { id: 'user_emp_010', email: 'antonio.sevilla@greenleafcbd.es', name: 'Antonio Romero Cruz', storeId: stores[3].id },
    { id: 'user_emp_011', email: 'ainhoa.bilbao@greenleafcbd.es', name: 'Ainhoa Arrieta Goikoetxea', storeId: stores[4].id },
    { id: 'user_emp_012', email: 'mikel.bilbao@greenleafcbd.es', name: 'Mikel Uriarte Aguirre', storeId: stores[4].id },
    { id: 'user_emp_013', email: 'sofia.madrid@greenleafcbd.es', name: 'Sofia Hernandez Gil', storeId: stores[0].id },
    { id: 'user_emp_014', email: 'nuria.barcelona@greenleafcbd.es', name: 'Nuria Valls Bosch', storeId: stores[1].id },
    { id: 'user_emp_015', email: 'javier.valencia@greenleafcbd.es', name: 'Javier Pascual Reig', storeId: stores[2].id },
  ];

  const employees = [];
  for (const ed of employeesData) {
    const emp = await prisma.user.create({
      data: {
        ...ed,
        password: hashedPassword,
        role: 'EMPLOYEE',
        isActive: true,
        lastLoginAt: daysAgo(randomBetween(0, 7)),
      },
    });
    employees.push(emp);
  }

  const allStaff = [...managers, ...employees];
  console.log('Users created');

  // ============================================
  // CATEGORIES
  // ============================================
  const categoriesData = [
    { id: 'cat_aceites', name: 'Aceites CBD', slug: 'aceites-cbd', description: 'Aceites sublinguales de CBD en diferentes concentraciones', sortOrder: 1 },
    { id: 'cat_flores', name: 'Flores CBD', slug: 'flores-cbd', description: 'Flores de canamo con alto contenido en CBD', sortOrder: 2 },
    { id: 'cat_cosmetica', name: 'Cosmetica CBD', slug: 'cosmetica-cbd', description: 'Productos de belleza y cuidado personal con CBD', sortOrder: 3 },
    { id: 'cat_comestibles', name: 'Comestibles CBD', slug: 'comestibles-cbd', description: 'Alimentos y bebidas infusionados con CBD', sortOrder: 4 },
    { id: 'cat_capsulas', name: 'Capsulas y Suplementos', slug: 'capsulas-suplementos', description: 'Capsulas, comprimidos y suplementos de CBD', sortOrder: 5 },
    { id: 'cat_cremas', name: 'Cremas y Balsamos', slug: 'cremas-balsamos', description: 'Cremas topicas, balsamos y geles con CBD', sortOrder: 6 },
    { id: 'cat_bienestar', name: 'Bienestar', slug: 'bienestar', description: 'Productos de bienestar general y relajacion con CBD', sortOrder: 7 },
    { id: 'cat_accesorios', name: 'Accesorios', slug: 'accesorios', description: 'Vaporizadores, pipas y accesorios para consumo de CBD', sortOrder: 8 },
  ];

  const categories = [];
  for (const cd of categoriesData) {
    const cat = await prisma.category.create({
      data: { ...cd, isActive: true },
    });
    categories.push(cat);
  }
  console.log('Categories created');

  // ============================================
  // PRODUCTS
  // ============================================
  const productsData = [
    // Aceites CBD
    { sku: 'ACE-001-5', name: 'Aceite CBD Full Spectrum 5%', categoryId: 'cat_aceites', price: 29.90, cost: 12.50, concentration: '5% CBD (500mg)', composition: 'Full Spectrum', brand: 'GreenLeaf Premium' },
    { sku: 'ACE-002-10', name: 'Aceite CBD Full Spectrum 10%', categoryId: 'cat_aceites', price: 49.90, cost: 20.00, concentration: '10% CBD (1000mg)', composition: 'Full Spectrum', brand: 'GreenLeaf Premium' },
    { sku: 'ACE-003-15', name: 'Aceite CBD Full Spectrum 15%', categoryId: 'cat_aceites', price: 69.90, cost: 28.00, concentration: '15% CBD (1500mg)', composition: 'Full Spectrum', brand: 'GreenLeaf Premium' },
    { sku: 'ACE-004-20', name: 'Aceite CBD Full Spectrum 20%', categoryId: 'cat_aceites', price: 89.90, cost: 36.00, concentration: '20% CBD (2000mg)', composition: 'Full Spectrum', brand: 'GreenLeaf Premium' },
    { sku: 'ACE-005-ISO', name: 'Aceite CBD Isolate 10%', categoryId: 'cat_aceites', price: 39.90, cost: 16.00, concentration: '10% CBD Aislado', composition: 'Isolate', brand: 'PureCBD' },
    { sku: 'ACE-006-PET', name: 'Aceite CBD para Mascotas 3%', categoryId: 'cat_aceites', price: 24.90, cost: 10.00, concentration: '3% CBD (300mg)', composition: 'Broad Spectrum', brand: 'PetCBD' },
    // Flores CBD
    { sku: 'FLO-001-AM', name: 'Flores CBD Amnesia Haze', categoryId: 'cat_flores', price: 8.50, cost: 3.20, concentration: '18% CBD, <0.2% THC', composition: 'Flor seca', brand: 'HempGarden' },
    { sku: 'FLO-002-OG', name: 'Flores CBD OG Kush', categoryId: 'cat_flores', price: 9.00, cost: 3.50, concentration: '20% CBD, <0.2% THC', composition: 'Flor seca', brand: 'HempGarden' },
    { sku: 'FLO-003-GG', name: 'Flores CBD Gorilla Glue', categoryId: 'cat_flores', price: 9.50, cost: 3.80, concentration: '22% CBD, <0.2% THC', composition: 'Flor seca', brand: 'HempGarden' },
    { sku: 'FLO-004-WW', name: 'Flores CBD White Widow', categoryId: 'cat_flores', price: 8.90, cost: 3.40, concentration: '19% CBD, <0.2% THC', composition: 'Flor seca', brand: 'HempGarden' },
    { sku: 'FLO-005-SK', name: 'Flores CBD Strawberry Kush', categoryId: 'cat_flores', price: 9.20, cost: 3.60, concentration: '21% CBD, <0.2% THC', composition: 'Flor seca', brand: 'HempGarden' },
    // Cosmetica CBD
    { sku: 'COS-001-CR', name: 'Crema Facial CBD Antiarrugas', categoryId: 'cat_cosmetica', price: 34.90, cost: 14.00, concentration: '100mg CBD', composition: 'Broad Spectrum', brand: 'CBDBeauty' },
    { sku: 'COS-002-SR', name: 'Serum CBD Reparador', categoryId: 'cat_cosmetica', price: 42.90, cost: 17.00, concentration: '200mg CBD', composition: 'Full Spectrum', brand: 'CBDBeauty' },
    { sku: 'COS-003-LB', name: 'Labial CBD Hidratante', categoryId: 'cat_cosmetica', price: 12.90, cost: 5.00, concentration: '50mg CBD', composition: 'Isolate', brand: 'CBDBeauty' },
    { sku: 'COS-004-SH', name: 'Champu CBD Fortificante', categoryId: 'cat_cosmetica', price: 18.90, cost: 7.50, concentration: '150mg CBD', composition: 'Broad Spectrum', brand: 'CBDBeauty' },
    // Comestibles CBD
    { sku: 'COM-001-GU', name: 'Gummies CBD 10mg x30', categoryId: 'cat_comestibles', price: 29.90, cost: 11.00, concentration: '10mg CBD/unidad', composition: 'Broad Spectrum', brand: 'CBDSweets' },
    { sku: 'COM-002-CH', name: 'Chocolate Negro CBD 50mg', categoryId: 'cat_comestibles', price: 9.90, cost: 4.00, concentration: '50mg CBD', composition: 'Isolate', brand: 'CBDSweets' },
    { sku: 'COM-003-TE', name: 'Infusion Relajante CBD', categoryId: 'cat_comestibles', price: 14.90, cost: 5.50, concentration: '25mg CBD/sobre', composition: 'Full Spectrum', brand: 'HerbCBD' },
    { sku: 'COM-004-MI', name: 'Miel con CBD 250g', categoryId: 'cat_comestibles', price: 22.90, cost: 9.00, concentration: '500mg CBD', composition: 'Full Spectrum', brand: 'HerbCBD' },
    // Capsulas y Suplementos
    { sku: 'CAP-001-10', name: 'Capsulas CBD 10mg x60', categoryId: 'cat_capsulas', price: 34.90, cost: 14.00, concentration: '10mg CBD/capsula', composition: 'Full Spectrum', brand: 'VitaCBD' },
    { sku: 'CAP-002-25', name: 'Capsulas CBD 25mg x30', categoryId: 'cat_capsulas', price: 39.90, cost: 16.00, concentration: '25mg CBD/capsula', composition: 'Full Spectrum', brand: 'VitaCBD' },
    { sku: 'CAP-003-MEL', name: 'Capsulas CBD + Melatonina', categoryId: 'cat_capsulas', price: 29.90, cost: 12.00, concentration: '15mg CBD + 1mg Melatonina', composition: 'Broad Spectrum', brand: 'VitaCBD' },
    // Cremas y Balsamos
    { sku: 'CRE-001-MU', name: 'Balsamo Muscular CBD', categoryId: 'cat_cremas', price: 27.90, cost: 11.00, concentration: '500mg CBD', composition: 'Full Spectrum', brand: 'SportCBD' },
    { sku: 'CRE-002-AR', name: 'Crema Articular CBD', categoryId: 'cat_cremas', price: 32.90, cost: 13.00, concentration: '750mg CBD', composition: 'Full Spectrum', brand: 'SportCBD' },
    { sku: 'CRE-003-RF', name: 'Gel Frio CBD Deportivo', categoryId: 'cat_cremas', price: 24.90, cost: 10.00, concentration: '300mg CBD', composition: 'Broad Spectrum', brand: 'SportCBD' },
    { sku: 'CRE-004-CA', name: 'Crema Caliente CBD', categoryId: 'cat_cremas', price: 26.90, cost: 10.50, concentration: '400mg CBD', composition: 'Full Spectrum', brand: 'SportCBD' },
    // Bienestar
    { sku: 'BIE-001-RL', name: 'Roll-on CBD Relajante', categoryId: 'cat_bienestar', price: 19.90, cost: 8.00, concentration: '200mg CBD', composition: 'Broad Spectrum', brand: 'ZenCBD' },
    { sku: 'BIE-002-BA', name: 'Bomba de Bano CBD', categoryId: 'cat_bienestar', price: 8.90, cost: 3.50, concentration: '100mg CBD', composition: 'Isolate', brand: 'ZenCBD' },
    { sku: 'BIE-003-VE', name: 'Vela Aromatica CBD', categoryId: 'cat_bienestar', price: 16.90, cost: 6.50, concentration: '50mg CBD', composition: 'Isolate', brand: 'ZenCBD' },
    { sku: 'BIE-004-SP', name: 'Spray Bucal CBD 10%', categoryId: 'cat_bienestar', price: 34.90, cost: 14.00, concentration: '10% CBD', composition: 'Full Spectrum', brand: 'GreenLeaf Premium' },
    // Accesorios
    { sku: 'ACC-001-VP', name: 'Vaporizador Portatil CBD', categoryId: 'cat_accesorios', price: 49.90, cost: 22.00, concentration: null, composition: null, brand: 'VapeCBD' },
    { sku: 'ACC-002-GR', name: 'Grinder Premium 4 Piezas', categoryId: 'cat_accesorios', price: 24.90, cost: 10.00, concentration: null, composition: null, brand: 'GreenLeaf' },
    { sku: 'ACC-003-PA', name: 'Papel de Liar Organico', categoryId: 'cat_accesorios', price: 2.90, cost: 1.00, concentration: null, composition: null, brand: 'NaturRoll' },
    { sku: 'ACC-004-BA', name: 'Bascula de Precision 0.01g', categoryId: 'cat_accesorios', price: 19.90, cost: 8.00, concentration: null, composition: null, brand: 'GreenLeaf' },
    { sku: 'ACC-005-TA', name: 'Tarro Hermetico UV', categoryId: 'cat_accesorios', price: 14.90, cost: 6.00, concentration: null, composition: null, brand: 'GreenLeaf' },
    { sku: 'ACC-006-KIT', name: 'Kit Iniciacion CBD', categoryId: 'cat_accesorios', price: 39.90, cost: 18.00, concentration: null, composition: null, brand: 'GreenLeaf' },
  ];

  const products = [];
  for (const pd of productsData) {
    const margin = ((pd.price - pd.cost) / pd.price) * 100;
    const product = await prisma.product.create({
      data: {
        sku: pd.sku,
        name: pd.name,
        description: `${pd.name} - Producto de alta calidad para uso diario.`,
        categoryId: pd.categoryId,
        brand: pd.brand,
        price: pd.price,
        cost: pd.cost,
        margin: parseFloat(margin.toFixed(2)),
        images: [],
        isActive: true,
        concentration: pd.concentration,
        composition: pd.composition,
        batchNumber: `BATCH-2024-${pd.sku}`,
        certifications: ['GMP', 'Organic EU'],
        laboratoryTests: 'https://lab.greenleafcbd.es/tests/' + pd.sku.toLowerCase(),
        regulatoryStatus: 'Legal para venta en UE (THC < 0.2%)',
        territorialRestrictions: [],
        requiresAgeVerification: true,
        tags: [pd.brand || 'GreenLeaf', pd.composition || 'CBD'].filter(Boolean),
      },
    });
    products.push(product);
  }
  console.log('Products created:', products.length);

  // ============================================
  // INVENTORY
  // ============================================
  const inventoryItems = [];
  for (const product of products) {
    for (const store of stores) {
      const quantity = randomBetween(5, 80);
      const minStock = 10;
      let status: 'NORMAL' | 'LOW' | 'CRITICAL' | 'OUT_OF_STOCK' = 'NORMAL';
      if (quantity <= 3) status = 'OUT_OF_STOCK';
      else if (quantity <= 7) status = 'CRITICAL';
      else if (quantity <= 15) status = 'LOW';

      const inv = await prisma.inventoryItem.create({
        data: {
          productId: product.id,
          storeId: store.id,
          quantity,
          minStock,
          maxStock: 100,
          status,
          lastRestocked: daysAgo(randomBetween(1, 30)),
          location: `Estante ${String.fromCharCode(65 + randomBetween(0, 5))}-${randomBetween(1, 10)}`,
        },
      });
      inventoryItems.push(inv);
    }
  }
  console.log('Inventory created:', inventoryItems.length);

  // ============================================
  // CUSTOMERS
  // ============================================
  const customerNames = [
    'Miguel Angel Torres', 'Isabel Fernandez', 'Jose Luis Garcia', 'Ana Maria Rodriguez',
    'Francisco Javier Lopez', 'Maria Carmen Martinez', 'Antonio Hernandez', 'Laura Jimenez',
    'Roberto Diaz', 'Patricia Morales', 'Alberto Ruiz', 'Cristina Alvarez',
    'Fernando Munoz', 'Marta Romero', 'Ricardo Navarro', 'Elena Dominguez',
    'Pablo Vargas', 'Lucia Castillo', 'Diego Ortiz', 'Sara Gutierrez',
    'Andres Molina', 'Rosa Serrano', 'Hugo Medina', 'Natalia Suarez',
    'Sergio Ramos', 'Alicia Gil', 'Victor Sanchez', 'Claudia Perez',
    'Adrian Castro', 'Daniela Ortega', 'Manuel Blanco', 'Julia Iglesias',
    'Guillermo Aguilar', 'Beatriz Rubio', 'Oscar Guerrero', 'Ines Cortes',
    'Carlos Prieto', 'Monica Crespo', 'Alvaro Herrera', 'Raquel Nunez',
    'Alejandro Flores', 'Carmen Vega', 'Ivan Campos', 'Silvia Reyes',
    'Marcos Fuentes', 'Teresa Cabrera', 'Nicolas Marquez', 'Eva Gallego',
    'Rafael Leon', 'Lorena Diez', 'Enrique Pastor', 'Susana Caballero',
    'Joaquin Santiago', 'Pilar Carrasco', 'Ignacio Herrero', 'Angela Santos',
    'Emilio Nieto', 'Clara Mora', 'Mario Gimenez', 'Irene Ferrer',
    'Juan Carlos Arias', 'Paula Montero', 'Daniel Lozano', 'Lidia Hidalgo',
    'Ramon Cano', 'Noelia Nunez', 'Tomas Ibarra', 'Esther Bravo',
    'Luis Miguel Saez', 'Virginia Pardo', 'Santiago Duran', 'Gloria Soto',
    'Javier Otero', 'Nerea Velasco', 'Eduardo Mora', 'Rebeca Millan',
    'Felipe Rey', 'Paloma Cruz', 'Pedro Pablo Navarro', 'Miriam Lorenzo',
    'Cesar Cuesta', 'Olga Delgado', 'Gonzalo Exposito', 'Andrea Marin',
    'Lorenzo Pascual', 'Veronica Rivera', 'Martin Soler', 'Diana Mendez',
    'Ruben Duarte', 'Alma Garcia', 'Dario Mejia', 'Valentina Torres',
    'Jesus Reyes', 'Mireya Ochoa', 'Samuel Varela', 'Camila Aranda',
    'Bruno Valle', 'Adriana Pena', 'Maximo Sierra', 'Jimena Robles',
    'Julio Pereira', 'Rocio Salazar', 'Ivan Roman', 'Amelia Costa',
    'Arturo Montoya', 'Violeta Luna', 'Esteban Rivas', 'Lara Galvan',
    'Hector Figueroa', 'Gabriela Cortez', 'Alexander Vidal', 'Fernanda Ponce',
    'Leonardo Soria', 'Catalina Paz', 'Orlando Vera', 'Marisol Benitez',
    'Mateo Acosta', 'Regina Salinas', 'Ismael Avila', 'Alejandra Paredes',
    'Benjamin Espinosa', 'Valeria Cardenas', 'Cristobal Rangel', 'Renata Medrano',
    'Gaspar Ayala', 'Leticia Padilla', 'Bautista Montes', 'Abril Contreras',
    'Ian Salgado', 'Julieta Velazquez', 'Tobias Franco', 'Celeste Arenas',
    'Nicolas Bustos', 'Marina Valencia', 'Emiliano Ochoa', 'Florencia Rios',
    'Damian Lara', 'Isabella Cardoso', 'Leonel Mora', 'Agustina Paez',
    'Franco Leiva', 'Martina Pereyra', 'Dylan Godoy', 'Alma Bello',
    'Luciano Pinto', 'Milagros Baez', 'Thiago Serrano', 'Sol Quintero',
    'Lisandro Coria', 'Josefina Rocha', 'Santino Suarez', 'Catalina Orozco',
    'Benicio Lagos', 'Antonella Sosa', 'Gael Mendoza', 'Lina Galindo',
    'Maximiliano Duarte', 'Bianca Trujillo', 'Facundo Valenzuela', 'Delfina Navas',
    'Bautista Escobar', 'Emilia Romero', 'Elias Cabello', 'Francisca Tapia',
    'Segundo Quiroz', 'Constanza Vergara', 'Nahuel Zapata', 'Valentina Lagos',
    'Ciro Acevedo', 'Catalina Meza', 'Lautaro Villanueva', 'Renata Arce',
    'Santino Barrera', 'Delfina Cardoso', 'Vicente Correa', 'Luz Estrada',
    'Juan Pablo Otero', 'Aurora Rosales', 'Simon Portillo', 'Maite Vergara',
    'Pedro Tomas Gil', 'Sofia Maria Lopez', 'Carlos Daniel Ruiz', 'Ana Belen Martinez',
    'Luis Fernando Diaz', 'Maria Jose Perez', 'Andres Felipe Torres', 'Laura Isabel Garcia',
  ];

  const loyaltyTiers: Array<'STARTER' | 'PREMIUM' | 'VIP' | 'BLACK'> = ['STARTER', 'PREMIUM', 'VIP', 'BLACK'];
  const customers = [];

  for (let i = 0; i < 200; i++) {
    const name = customerNames[i % customerNames.length];
    const emailBase = name.toLowerCase().replace(/\s+/g, '.').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const totalPurchases = randomBetween(1, 50);
    const avgTicket = randomFloat(15, 85);
    const totalSpent = parseFloat((totalPurchases * avgTicket).toFixed(2));
    let tier: 'STARTER' | 'PREMIUM' | 'VIP' | 'BLACK' = 'STARTER';
    if (totalSpent > 5000) tier = 'BLACK';
    else if (totalSpent > 2000) tier = 'VIP';
    else if (totalSpent > 800) tier = 'PREMIUM';

    const customer = await prisma.customer.create({
      data: {
        email: `${emailBase}${i > 0 ? i : ''}@email.com`,
        name,
        phone: `+34 6${randomBetween(10, 99)} ${randomBetween(100, 999)} ${randomBetween(100, 999)}`,
        birthDate: new Date(randomBetween(1960, 2000), randomBetween(0, 11), randomBetween(1, 28)),
        totalPurchases,
        totalSpent,
        averageTicket: avgTicket,
        lastPurchase: daysAgo(randomBetween(0, 60)),
        loyaltyPoints: randomBetween(0, 2000),
        loyaltyTier: tier,
        marketingConsent: Math.random() > 0.3,
        gdprConsentDate: daysAgo(randomBetween(30, 365)),
        isActive: true,
      },
    });
    customers.push(customer);
  }
  console.log('Customers created:', customers.length);

  // ============================================
  // SALES (6 months of history)
  // ============================================
  const paymentMethods = ['CASH', 'CARD', 'CARD', 'CARD', 'TRANSFER'];
  let saleCounter = 0;

  for (let day = 180; day >= 0; day--) {
    const date = daysAgo(day);
    const dayOfWeek = date.getDay();
    // More sales on weekends, less on Monday
    let salesPerDay = randomBetween(5, 12);
    if (dayOfWeek === 0) salesPerDay = randomBetween(3, 7); // Sunday
    if (dayOfWeek === 6) salesPerDay = randomBetween(8, 15); // Saturday
    if (dayOfWeek === 5) salesPerDay = randomBetween(7, 14); // Friday
    if (dayOfWeek === 1) salesPerDay = randomBetween(4, 8); // Monday

    // Seasonal boost in summer and December
    const month = date.getMonth();
    if (month >= 5 && month <= 8) salesPerDay = Math.round(salesPerDay * 1.3);
    if (month === 11) salesPerDay = Math.round(salesPerDay * 1.4);

    for (let s = 0; s < salesPerDay; s++) {
      saleCounter++;
      const store = pickRandom(stores);
      const storeEmployees = allStaff.filter(e => e.storeId === store.id);
      const employee = storeEmployees.length > 0 ? pickRandom(storeEmployees) : pickRandom(allStaff);
      const customer = Math.random() > 0.3 ? pickRandom(customers) : null;

      const numItems = randomBetween(1, 4);
      const saleProducts = [];
      for (let i = 0; i < numItems; i++) {
        const product = pickRandom(products);
        const qty = randomBetween(1, 3);
        saleProducts.push({ product, quantity: qty });
      }

      const subtotal = saleProducts.reduce((sum, sp) => sum + sp.product.price * sp.quantity, 0);
      const discount = Math.random() > 0.85 ? parseFloat((subtotal * randomFloat(0.05, 0.15)).toFixed(2)) : 0;
      const taxableAmount = subtotal - discount;
      const tax = parseFloat((taxableAmount * 0.21).toFixed(2));
      const total = parseFloat((taxableAmount + tax).toFixed(2));

      const saleHour = randomBetween(10, 20);
      const saleMinute = randomBetween(0, 59);
      const saleDate = new Date(date);
      saleDate.setHours(saleHour, saleMinute, randomBetween(0, 59));

      await prisma.sale.create({
        data: {
          saleNumber: `VTA-${String(saleCounter).padStart(6, '0')}`,
          storeId: store.id,
          employeeId: employee.id,
          customerId: customer?.id || null,
          subtotal: parseFloat(subtotal.toFixed(2)),
          tax,
          discount,
          total,
          paymentMethod: pickRandom(paymentMethods),
          paymentStatus: 'COMPLETED',
          createdAt: saleDate,
          updatedAt: saleDate,
          items: {
            create: saleProducts.map(sp => ({
              productId: sp.product.id,
              productName: sp.product.name,
              quantity: sp.quantity,
              price: sp.product.price,
              discount: 0,
              total: parseFloat((sp.product.price * sp.quantity).toFixed(2)),
            })),
          },
        },
      });
    }
  }
  console.log('Sales created:', saleCounter);

  // ============================================
  // SUPPLIERS & ORDERS
  // ============================================
  const suppliersData = [
    { name: 'HempCorp Europe', email: 'orders@hempcorp.eu', phone: '+31 20 123 4567', city: 'Amsterdam', country: 'Paises Bajos' },
    { name: 'Swiss CBD Labs', email: 'sales@swisscbdlabs.ch', phone: '+41 44 567 8901', city: 'Zurich', country: 'Suiza' },
    { name: 'Cannaverde Italia', email: 'info@cannaverde.it', phone: '+39 02 345 6789', city: 'Milan', country: 'Italia' },
    { name: 'BioHemp Portugal', email: 'comercial@biohemp.pt', phone: '+351 21 234 5678', city: 'Lisboa', country: 'Portugal' },
    { name: 'NordicCBD Supply', email: 'supply@nordiccbd.dk', phone: '+45 32 45 67 89', city: 'Copenhagen', country: 'Dinamarca' },
  ];

  const suppliers = [];
  for (const sd of suppliersData) {
    const supplier = await prisma.supplier.create({
      data: { ...sd, isActive: true, address: `Calle Principal 1, ${sd.city}` },
    });
    suppliers.push(supplier);
  }

  // Supplier products
  for (const product of products.slice(0, 20)) {
    const supplier = pickRandom(suppliers);
    await prisma.supplierProduct.create({
      data: {
        supplierId: supplier.id,
        productId: product.id,
        supplierSku: `SUP-${product.sku}`,
        supplierPrice: product.cost * 0.8,
        minOrderQuantity: randomBetween(10, 50),
        leadTimeDays: randomBetween(3, 14),
      },
    });
  }

  // Orders
  const orderStatuses: Array<'PENDING' | 'CONFIRMED' | 'PREPARING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'> = [
    'PENDING', 'CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED', 'DELIVERED', 'DELIVERED', 'CANCELLED',
  ];

  for (let i = 0; i < 50; i++) {
    const store = pickRandom(stores);
    const customer = pickRandom(customers);
    const status = pickRandom(orderStatuses);
    const numItems = randomBetween(1, 5);
    const orderProducts = Array.from({ length: numItems }, () => ({
      product: pickRandom(products),
      quantity: randomBetween(1, 3),
    }));

    const subtotal = orderProducts.reduce((sum, op) => sum + op.product.price * op.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 4.95;
    const tax = parseFloat((subtotal * 0.21).toFixed(2));
    const total = parseFloat((subtotal + shipping + tax).toFixed(2));

    await prisma.order.create({
      data: {
        orderNumber: `ORD-${String(i + 1).padStart(5, '0')}`,
        storeId: store.id,
        customerId: customer.id,
        createdBy: pickRandom(allStaff).id,
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax,
        shipping,
        discount: 0,
        total,
        status,
        shippingAddress: { street: 'Calle Ejemplo 1', city: store.city, postalCode: '28001', country: 'Espana' },
        billingAddress: { street: 'Calle Ejemplo 1', city: store.city, postalCode: '28001', country: 'Espana' },
        trackingNumber: status === 'SHIPPED' || status === 'DELIVERED' ? `TR${randomBetween(100000, 999999)}ES` : null,
        createdAt: daysAgo(randomBetween(0, 90)),
        items: {
          create: orderProducts.map(op => ({
            productId: op.product.id,
            productName: op.product.name,
            quantity: op.quantity,
            price: op.product.price,
            total: parseFloat((op.product.price * op.quantity).toFixed(2)),
          })),
        },
      },
    });
  }
  console.log('Orders created: 50');

  // ============================================
  // STOCK TRANSFERS
  // ============================================
  const transferStatuses: Array<'REQUESTED' | 'APPROVED' | 'PREPARING' | 'IN_TRANSIT' | 'RECEIVED' | 'CANCELLED'> = [
    'REQUESTED', 'APPROVED', 'PREPARING', 'IN_TRANSIT', 'RECEIVED', 'RECEIVED', 'RECEIVED', 'CANCELLED',
  ];

  for (let i = 0; i < 25; i++) {
    const fromStore = pickRandom(stores);
    let toStore = pickRandom(stores);
    while (toStore.id === fromStore.id) {
      toStore = pickRandom(stores);
    }
    const requester = pickRandom(managers);
    const status = pickRandom(transferStatuses);
    const numItems = randomBetween(1, 4);
    const transferProducts = Array.from({ length: numItems }, () => ({
      product: pickRandom(products),
      quantity: randomBetween(5, 20),
    }));

    await prisma.stockTransfer.create({
      data: {
        transferNumber: `TRF-${String(i + 1).padStart(4, '0')}`,
        fromStoreId: fromStore.id,
        toStoreId: toStore.id,
        requestedBy: requester.id,
        approvedBy: status !== 'REQUESTED' && status !== 'CANCELLED' ? pickRandom(managers).id : null,
        status,
        notes: Math.random() > 0.5 ? 'Transferencia urgente por stock bajo' : null,
        createdAt: daysAgo(randomBetween(0, 60)),
        items: {
          create: transferProducts.map(tp => ({
            productId: tp.product.id,
            quantity: tp.quantity,
          })),
        },
      },
    });
  }
  console.log('Stock transfers created: 25');

  // ============================================
  // EMPLOYEE PERFORMANCE (6 months)
  // ============================================
  for (const emp of allStaff) {
    for (let month = 5; month >= 0; month--) {
      const date = new Date(REFERENCE_DATE);
      date.setMonth(date.getMonth() - month);
      date.setDate(1);

      await prisma.employeePerformance.create({
        data: {
          employeeId: emp.id,
          storeId: emp.storeId || stores[0].id,
          date,
          totalSales: randomFloat(3000, 15000),
          salesCount: randomBetween(40, 200),
          averageTicket: randomFloat(25, 75),
          customersServed: randomBetween(30, 150),
        },
      });
    }
  }
  console.log('Employee performance records created');

  // ============================================
  // INVENTORY MOVEMENTS
  // ============================================
  const movementTypes: Array<'IN' | 'OUT' | 'ADJUSTMENT' | 'TRANSFER_IN' | 'TRANSFER_OUT'> = ['IN', 'OUT', 'ADJUSTMENT', 'TRANSFER_IN', 'TRANSFER_OUT'];

  for (let i = 0; i < 120; i++) {
    const inv = pickRandom(inventoryItems);
    const type = pickRandom(movementTypes);
    const qty = type === 'IN' || type === 'TRANSFER_IN' ? randomBetween(10, 50) : randomBetween(1, 10);
    const prevStock = randomBetween(20, 80);
    const newStock = type === 'IN' || type === 'TRANSFER_IN' ? prevStock + qty : Math.max(0, prevStock - qty);

    await prisma.inventoryMovement.create({
      data: {
        inventoryId: inv.id,
        type,
        quantity: qty,
        previousStock: prevStock,
        newStock,
        reason: type === 'ADJUSTMENT' ? 'Ajuste manual por inventario' : type === 'IN' ? 'Reposicion de stock' : 'Venta',
        referenceType: type === 'OUT' ? 'SALE' : type === 'IN' ? 'ORDER' : type.includes('TRANSFER') ? 'TRANSFER' : 'ADJUSTMENT',
        createdAt: daysAgo(randomBetween(0, 90)),
      },
    });
  }
  console.log('Inventory movements created: 120');

  // ============================================
  // AUDIT LOGS
  // ============================================
  const auditActions: Array<'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'EXPORT'> = [
    'CREATE', 'READ', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'EXPORT',
  ];
  const auditResources = ['product', 'sale', 'customer', 'order', 'inventory', 'user', 'store', 'transfer'];

  for (let i = 0; i < 50; i++) {
    const user = pickRandom([superAdmin, admin, ...managers, ...employees]);
    const action = pickRandom(auditActions);
    const resource = action === 'LOGIN' || action === 'LOGOUT' ? 'session' : pickRandom(auditResources);

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action,
        resource,
        resourceId: `resource_${randomBetween(1, 1000)}`,
        details: { description: `${action} on ${resource}` },
        ipAddress: `192.168.${randomBetween(1, 10)}.${randomBetween(1, 254)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        storeId: user.storeId || stores[0].id,
        createdAt: daysAgo(randomBetween(0, 30)),
      },
    });
  }
  console.log('Audit logs created: 50');

  // ============================================
  // NOTIFICATIONS
  // ============================================
  const notificationTypes: Array<'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'STOCK_ALERT' | 'ORDER_UPDATE' | 'TRANSFER_UPDATE' | 'SECURITY_ALERT'> = [
    'INFO', 'SUCCESS', 'WARNING', 'STOCK_ALERT', 'ORDER_UPDATE', 'TRANSFER_UPDATE',
  ];
  const notificationMessages = [
    { title: 'Stock bajo detectado', message: 'El producto Aceite CBD 10% tiene stock bajo en Madrid Centro.' },
    { title: 'Nuevo pedido recibido', message: 'Pedido ORD-00023 confirmado y en preparacion.' },
    { title: 'Transferencia completada', message: 'La transferencia TRF-0012 ha sido recibida en Barcelona.' },
    { title: 'Meta de ventas alcanzada', message: 'La tienda de Valencia ha superado su objetivo mensual.' },
    { title: 'Actualizacion del sistema', message: 'Se ha actualizado el modulo de inventario a la version 2.1.' },
    { title: 'Nuevo cliente registrado', message: 'Un nuevo cliente se ha registrado en la tienda online.' },
    { title: 'Producto agotado', message: 'Flores CBD OG Kush agotado en Sevilla Triana.' },
    { title: 'Revision de caducidad', message: 'Hay 5 productos proximos a su fecha de caducidad.' },
    { title: 'Campana activada', message: 'La campana de verano CBD se ha activado automaticamente.' },
    { title: 'Alerta de seguridad', message: 'Se han detectado 3 intentos de login fallidos en la cuenta admin.' },
    { title: 'Informe mensual disponible', message: 'El informe de ventas de agosto ya esta disponible.' },
    { title: 'Precio actualizado', message: 'Se ha actualizado el precio de 3 productos de la categoria Aceites.' },
  ];

  for (let i = 0; i < 15; i++) {
    const user = pickRandom([admin, ...managers]);
    const notif = pickRandom(notificationMessages);
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: pickRandom(notificationTypes),
        title: notif.title,
        message: notif.message,
        read: Math.random() > 0.5,
        createdAt: daysAgo(randomBetween(0, 14)),
      },
    });
  }
  console.log('Notifications created: 15');

  // ============================================
  // CAMPAIGNS & COUPONS
  // ============================================
  const campaignsData = [
    {
      name: 'Campana Verano CBD 2024',
      description: 'Promocion especial de verano con descuentos en aceites y cremas',
      type: 'EMAIL',
      status: 'COMPLETED',
      startDate: daysAgo(90),
      endDate: daysAgo(30),
      content: { subject: 'Verano CBD - Hasta 20% de descuento', body: 'Disfruta del verano con nuestros productos CBD.' },
    },
    {
      name: 'Black Friday CBD',
      description: 'Descuentos exclusivos para Black Friday',
      type: 'EMAIL',
      status: 'ACTIVE',
      startDate: daysAgo(5),
      endDate: daysAgo(-25),
      content: { subject: 'Black Friday - 30% en toda la tienda', body: 'No te pierdas las mejores ofertas del ano.' },
    },
    {
      name: 'Lanzamiento Nueva Linea Premium',
      description: 'Campana para el lanzamiento de productos premium',
      type: 'NOTIFICATION',
      status: 'DRAFT',
      startDate: null,
      endDate: null,
      content: { subject: 'Nueva Linea Premium', body: 'Descubre nuestra nueva linea de productos CBD premium.' },
    },
  ];

  for (const cd of campaignsData) {
    await prisma.campaign.create({
      data: {
        ...cd,
        targetSegment: 'ALL',
        createdBy: admin.id,
        coupons: {
          create: cd.status !== 'DRAFT' ? [{
            code: `${cd.name.replace(/\s+/g, '').substring(0, 6).toUpperCase()}${randomBetween(10, 99)}`,
            description: `Descuento ${cd.name}`,
            discountType: 'PERCENTAGE',
            discountValue: cd.status === 'ACTIVE' ? 30 : 20,
            minPurchase: 25,
            maxDiscount: 50,
            usageLimit: 500,
            usageCount: randomBetween(10, 200),
            validFrom: cd.startDate || new Date(),
            validUntil: cd.endDate || daysAgo(-30),
            isActive: cd.status === 'ACTIVE',
          }] : [],
        },
      },
    });
  }
  console.log('Campaigns created: 3');

  // ============================================
  // BLOG POSTS
  // ============================================
  const blogPostsData = [
    {
      title: 'Guia Completa del CBD: Todo lo que Necesitas Saber',
      slug: 'guia-completa-cbd',
      excerpt: 'Descubre todo sobre el CBD, sus beneficios, usos y como elegir el producto adecuado.',
      content: 'El cannabidiol (CBD) es uno de los mas de 100 cannabinoides presentes en la planta de cannabis. A diferencia del THC, el CBD no produce efectos psicoactivos. En esta guia completa te explicamos todo lo que necesitas saber sobre el CBD, desde su origen hasta como integrarlo en tu rutina diaria de bienestar. El CBD interactua con el sistema endocannabinoide del cuerpo, que regula funciones como el sueno, el dolor, la inflamacion y el estado de animo.',
      tags: ['CBD', 'guia', 'bienestar', 'salud'],
      status: 'PUBLISHED',
    },
    {
      title: 'CBD y Deporte: Recuperacion Muscular Natural',
      slug: 'cbd-deporte-recuperacion',
      excerpt: 'Como el CBD puede ayudar en la recuperacion deportiva y el rendimiento fisico.',
      content: 'Cada vez mas deportistas estan incorporando el CBD en sus rutinas de recuperacion. Los estudios sugieren que el CBD puede ayudar a reducir la inflamacion muscular, aliviar el dolor post-ejercicio y mejorar la calidad del sueno. En GreenLeaf ofrecemos una linea especifica para deportistas con balsamos, geles y aceites formulados para la recuperacion activa.',
      tags: ['CBD', 'deporte', 'recuperacion', 'muscular'],
      status: 'PUBLISHED',
    },
    {
      title: 'Legalidad del CBD en Espana y Europa 2024',
      slug: 'legalidad-cbd-espana-europa-2024',
      excerpt: 'Estado actual de la regulacion del CBD en Espana y el marco legal europeo.',
      content: 'La regulacion del CBD en Europa ha experimentado cambios significativos en los ultimos anos. En Espana, los productos de CBD son legales siempre que contengan menos del 0.2% de THC. El Tribunal de Justicia de la UE ha sentenciado que el CBD no es un estupefaciente, lo que ha abierto las puertas a su comercializacion como producto de consumo en toda la Union Europea.',
      tags: ['CBD', 'legal', 'regulacion', 'Espana', 'Europa'],
      status: 'PUBLISHED',
    },
    {
      title: 'Como Elegir tu Aceite de CBD: Concentraciones y Tipos',
      slug: 'como-elegir-aceite-cbd',
      excerpt: 'Aprende a elegir el aceite de CBD adecuado segun tus necesidades y preferencias.',
      content: 'Elegir el aceite de CBD correcto puede ser confuso con tantas opciones disponibles. Los factores clave a considerar son: la concentracion (5%, 10%, 15%, 20%), el tipo de extracto (Full Spectrum, Broad Spectrum, Isolate), el metodo de extraccion y la calidad de los ingredientes. Te ayudamos a entender las diferencias para que puedas tomar la mejor decision.',
      tags: ['CBD', 'aceite', 'concentracion', 'guia-compra'],
      status: 'PUBLISHED',
    },
    {
      title: 'CBD para el Sueno: Guia para Dormir Mejor',
      slug: 'cbd-sueno-dormir-mejor',
      excerpt: 'Descubre como el CBD puede mejorar la calidad de tu sueno de forma natural.',
      content: 'Los problemas de sueno afectan a millones de personas. El CBD ha demostrado potencial para mejorar la calidad del sueno al interactuar con receptores del sistema endocannabinoide relacionados con el ciclo vigilia-sueno. Nuestra formula de CBD + Melatonina combina los beneficios de ambos compuestos para un descanso optimo.',
      tags: ['CBD', 'sueno', 'descanso', 'melatonina'],
      status: 'PUBLISHED',
    },
  ];

  for (const bp of blogPostsData) {
    await prisma.blogPost.create({
      data: {
        ...bp,
        coverImage: `/images/blog/${bp.slug}.jpg`,
        authorId: admin.id,
        seoTitle: bp.title,
        seoDescription: bp.excerpt,
        publishedAt: daysAgo(randomBetween(5, 90)),
      },
    });
  }
  console.log('Blog posts created: 5');

  // ============================================
  // FAQs
  // ============================================
  const faqsData = [
    { question: 'Es legal el CBD en Espana?', answer: 'Si, el CBD es legal en Espana siempre que el contenido de THC sea inferior al 0.2%. Todos nuestros productos cumplen con la normativa vigente y cuentan con analisis de laboratorio que lo certifican.', category: 'Legal' },
    { question: 'Que diferencia hay entre Full Spectrum y Isolate?', answer: 'El Full Spectrum contiene todos los cannabinoides, terpenos y flavonoides de la planta (incluido hasta 0.2% THC), aprovechando el efecto sequito. El Isolate es CBD puro al 99%, sin otros cannabinoides ni THC.', category: 'Productos' },
    { question: 'Como debo tomar el aceite de CBD?', answer: 'Se recomienda aplicar las gotas bajo la lengua y mantener 60-90 segundos antes de tragar. Empezar con dosis bajas (5-10mg) e ir aumentando gradualmente hasta encontrar la dosis optima.', category: 'Uso' },
    { question: 'El CBD tiene efectos secundarios?', answer: 'El CBD es generalmente bien tolerado. En algunos casos puede causar sequedad bucal, somnolencia leve o cambios en el apetito. Se recomienda consultar con un medico si se toman otros medicamentos.', category: 'Salud' },
    { question: 'Cuanto tarda en hacer efecto el CBD?', answer: 'El aceite sublingual suele hacer efecto en 15-30 minutos. Las cremas topicas en 15-45 minutos. Las capsulas pueden tardar 1-2 horas al pasar por el sistema digestivo.', category: 'Uso' },
    { question: 'Puedo dar CBD a mi mascota?', answer: 'Si, tenemos productos especificamente formulados para mascotas con concentraciones adecuadas. Nunca usar productos destinados a humanos en animales sin consultar con un veterinario.', category: 'Mascotas' },
    { question: 'Como se almacenan los productos CBD?', answer: 'Guardar en lugar fresco y seco, protegido de la luz solar directa. Los aceites se conservan mejor en la nevera una vez abiertos. Respetar siempre la fecha de caducidad.', category: 'Almacenamiento' },
    { question: 'Hacen envios a toda Espana?', answer: 'Si, realizamos envios a toda la peninsula e islas. Envio gratuito en pedidos superiores a 50EUR. Entrega en 24-48 horas laborables.', category: 'Envios' },
    { question: 'Que metodos de pago aceptan?', answer: 'Aceptamos tarjeta de credito/debito (Visa, Mastercard), transferencia bancaria y pago en efectivo en nuestras tiendas fisicas.', category: 'Pagos' },
    { question: 'Tienen programa de fidelidad?', answer: 'Si, nuestro programa GreenLeaf Rewards te permite acumular puntos con cada compra. Por cada euro gastado acumulas 1 punto. Los puntos se pueden canjear por descuentos en futuras compras.', category: 'Fidelidad' },
  ];

  for (let i = 0; i < faqsData.length; i++) {
    await prisma.fAQ.create({
      data: { ...faqsData[i], sortOrder: i + 1, isPublished: true },
    });
  }
  console.log('FAQs created:', faqsData.length);

  // ============================================
  // CONSENT RECORDS (GDPR)
  // ============================================
  const consentTypes = ['MARKETING', 'ANALYTICS', 'COOKIES'];
  for (let i = 0; i < 50; i++) {
    const customer = pickRandom(customers);
    await prisma.consentRecord.create({
      data: {
        customerId: customer.id,
        consentType: pickRandom(consentTypes),
        granted: Math.random() > 0.2,
        source: pickRandom(['web_form', 'checkout', 'account_settings', 'cookie_banner']),
        ipAddress: `83.${randomBetween(30, 60)}.${randomBetween(1, 254)}.${randomBetween(1, 254)}`,
        userAgent: 'Mozilla/5.0 (compatible; consent-collector)',
        createdAt: daysAgo(randomBetween(0, 180)),
      },
    });
  }
  console.log('Consent records created: 50');

  // ============================================
  // LOYALTY TRANSACTIONS
  // ============================================
  const loyaltyTypes = ['EARNED', 'EARNED', 'EARNED', 'REDEEMED', 'ADJUSTED'];
  for (let i = 0; i < 100; i++) {
    const customer = pickRandom(customers);
    const type = pickRandom(loyaltyTypes);
    const points = type === 'EARNED' ? randomBetween(5, 80) : type === 'REDEEMED' ? -randomBetween(50, 200) : randomBetween(-20, 20);

    await prisma.loyaltyTransaction.create({
      data: {
        customerId: customer.id,
        points,
        type,
        description: type === 'EARNED' ? 'Puntos por compra' : type === 'REDEEMED' ? 'Canje de puntos' : 'Ajuste manual',
        createdAt: daysAgo(randomBetween(0, 120)),
      },
    });
  }
  console.log('Loyalty transactions created: 100');

  // ============================================
  // CUSTOMER SEGMENTS
  // ============================================
  const segmentNames = ['VIP_Compradores', 'Nuevos_30dias', 'Inactivos_90dias', 'Amantes_Aceites', 'Deportistas', 'Premium_Gasto_Alto'];
  for (let i = 0; i < 80; i++) {
    const customer = pickRandom(customers);
    await prisma.customerSegment.create({
      data: {
        customerId: customer.id,
        segmentName: pickRandom(segmentNames),
      },
    });
  }
  console.log('Customer segments created: 80');

  console.log('\\nSeed completed successfully!');
  console.log('\\nLogin credentials:');
  console.log('  Super Admin: superadmin@greenleafcbd.es / password123');
  console.log('  Admin: admin@greenleafcbd.es / password123');
  console.log('  Manager (Madrid): madrid.manager@greenleafcbd.es / password123');
  console.log('  Employee: laura.madrid@greenleafcbd.es / password123');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
