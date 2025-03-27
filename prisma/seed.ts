import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// async function main() {
//   // Cliente 1
//   await prisma.client.create({
//     data: {
//       name: "John Doe",
//       phone: "123-456-7890",
//       email: "john.doe@example.com",
//       repairs: {
//         create: [
//           {
//             type: "Screen Replacement",
//             status: "Pendiente",
//             budget: "150 USD",
//             description: "Cracked screen needs replacement.",
//           },
//           {
//             type: "Battery Replacement",
//             status: "Completado",
//             budget: "80 USD",
//             description: "Battery is not holding charge.",
//           },
//         ],
//       },
//     },
//   });

//   // Cliente 2
//   await prisma.client.create({
//     data: {
//       name: "Jane Smith",
//       phone: "987-654-3210",
//       email: "jane.smith@example.com",
//       repairs: {
//         create: [
//           {
//             type: "Software Update",
//             status: "En Progreso",
//             budget: "50 USD",
//             description: "Updating to the latest OS version.",
//           },
//           {
//             type: "Charging Port Repair",
//             status: "Completado",
//             budget: "100 USD",
//             description: "Charging port is loose.",
//           },
//           {
//             type: "Camera Replacement",
//             status: "Pendiente",
//             budget: "120 USD",
//             description: "Camera is blurry.",
//           },
//         ],
//       },
//     },
//   });

//   // Cliente 3
//   await prisma.client.create({
//     data: {
//       name: "Robert Johnson",
//       phone: "555-123-4567",
//       email: "robert.johnson@example.com",
//       repairs: {
//         create: [
//           {
//             type: "Water Damage Repair",
//             status: "Completado",
//             budget: "200 USD",
//             description: "Device was exposed to water.",
//           },
//         ],
//       },
//     },
//   });

//   // Cliente 4
//   await prisma.client.create({
//     data: {
//       name: "Emily Davis",
//       phone: "111-222-3333",
//       email: "emily.davis@example.com",
//       repairs: {
//         create: [
//           {
//             type: "Speaker Repair",
//             status: "En Progreso",
//             budget: "70 USD",
//             description: "Speaker is not working properly.",
//           },
//           {
//             type: "Button Repair",
//             status: "Completado",
//             budget: "60 USD",
//             description: "Power button is stuck.",
//           },
//         ],
//       },
//     },
//   });

//   // Cliente 5
//   await prisma.client.create({
//     data: {
//       name: "Michael Brown",
//       phone: "444-555-6666",
//       email: "michael.brown@example.com",
//       repairs: {
//         create: [
//           {
//             type: "Data Recovery",
//             status: "Pendiente",
//             budget: "250 USD",
//             description: "Attempting to recover lost data.",
//           },
//           {
//             type: "Motherboard Repair",
//             status: "En Progreso",
//             budget: "300 USD",
//             description: "Diagnosing motherboard issue.",
//           },
//           {
//             type: "Antenna Repair",
//             status: "Completado",
//             budget: "90 USD",
//             description: "Weak Signal strenght.",
//           },
//         ],
//       },
//     },
//   });

//   console.log("Seeding Completado!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

//   Nombre	Teléfono	Arreglos	Email	Acciones
// celestino ramayo	2945-418747	2	21/04/25

// Tipo de Arreglo	Estado	Presupuesto	Descripción	Fecha Revision
// 40

// revision (no arranca)

// Pendiente

// 0
// motosierra motomel 52 cc   c/protecor barra 
//21/04/2025


// vallejos Nestor	2945411946	1	22/04/25

// D	Tipo de Arreglo	Estado	Presupuesto	Descripción	Fecha Revision
// 46

// revision (no arranca)

// Pendiente

// 0
// motosierra motomel 52 cc   c/protecor barra 
// 21/04/2025


