import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, we technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getClients() {
  return [
    {
      id: '9f40390a-84f0-4798-95c1-0ea90c127a36',
      name: 'John Doe',
      address: '123 Main Street, London',
    },
    {
      id: 'd29a3e0d-a0c3-48a8-846d-479216dac94a',
      name: 'Jane Doe',
      address: '123 Main Street, London',
    },
    {
      id: 'd96f7963-502e-4b5c-8f7d-36dedb880035',
      name: 'Thomas Jefferson',
      address: 'Baker Street 12B, New York',
    },
  ];
}

function getOrders() {
  return [
    {
      id: '41eb0bf4-aa1a-4668-a14c-1c298a1750c8',
      clientId: '9f40390a-84f0-4798-95c1-0ea90c127a36',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: '4139cd79-7bd7-4fa4-a1f0-7cf7e4c57818',
      clientId: '9f40390a-84f0-4798-95c1-0ea90c127a36',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'f1d3f662-9aa4-48a4-851a-56a338eb0871',
      clientId: '9f40390a-84f0-4798-95c1-0ea90c127a36',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
  ];
}

async function seed() {
  await Promise.all(
    getClients().map((client) => {
      return db.client.create({ data: client });
    }),
  );

  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getOrders().map(({ productId, clientId, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
    }),
  );
}

seed();
