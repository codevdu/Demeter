import { PrismaClient, Profile } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {

  await prisma.carProperty.deleteMany();
  await prisma.user.deleteMany();

  const users = await prisma.user.createMany({
    data: [
      {
        id: "2ffb2c73-afc1-4a52-a2d5-828715436b44",
        email: "produtor12@demeter.com",
        passwordHash:
          "$2b$10$0mTqMv3DJP.S9YDCOjsvOe4QxUaDhjXXn46RU7t3sZp9fp.TXUkaW",
        name: "João",
        profile: Profile.PRODUTOR,
        cpfCnpj: "65432198700",
        state: "CE",
        coordinates: null,
      },
      {
        id: "39435c4b-c072-4c93-8b00-98c0914f136b",
        email: "felipetech@gmail.com",
        passwordHash:
          "$2b$10$nWxsDWLxpUVP6Rti6egICeOnXxTW2FOT5yku17uwy4PsIXSIGhQu2",
        name: "Luiz Felipe",
        profile: Profile.PRODUTOR,
        cpfCnpj: "77889900000111",
        state: "CE",
        coordinates: null,
      },
      {
        id: "711746ca-ae17-471f-8082-1e3670cf0848",
        email: "produtor123@demeter.com",
        passwordHash:
          "$2b$10$/eEZyN8hTZIxrbMyt/nRieYipiLpTmH7ozrn.J0fFbJs1qr/ROOcG",
        name: "João da Silva",
        profile: Profile.PRODUTOR,
        cpfCnpj: "12345678000199",
        state: "CE",
        coordinates: null,
      },
      {
        id: "81f9826d-677d-41f8-8069-64c579bfa3e9",
        email: "eduardoteixeirapaulino777@gmail.com",
        passwordHash:
          "$2b$10$7GDgg5PQyRVjPFKDfnze1ePINDzItdQQ.KIVEKg1fisiyonH2/EZ6",
        name: "Eduardo Teixeira",
        profile: Profile.PRODUTOR,
        cpfCnpj: "55667788000144",
        state: "CE",
        coordinates: null,
      },
      {
        id: "a0a0be00-28fc-4ae8-9692-cf717bfa77ab",
        email: "produtor123423@demeter.com",
        passwordHash:
          "$2b$10$iCGYiBXoTWX1VCGRlRtc8.szEvVbZ/EjbwN7BhKCR3NFtRkKXN0Ja",
        name: "João",
        profile: Profile.PRODUTOR,
        cpfCnpj: "22334455000199",
        state: "CE",
        coordinates: null,
      },
      {
        id: "a121ba3c-782f-4fdf-9a5f-5d77e0695cb3",
        email: "prazerdu.dev@gmail.com",
        passwordHash:
          "$2b$10$ZURdCJ3lWG1V9hH58deBe.qmTJ1nFGMskF0YRoiW3cSXiHmFgXzz.",
        name: "Eduardo Teixeira",
        profile: Profile.PRODUTOR,
        cpfCnpj: "78912345600",
        state: "CE",
        coordinates: null,
      },
      {
        id: "f2cf9153-4f88-4fe1-b48d-34731e3ad542",
        email: "irisdev@gmail.com",
        passwordHash:
          "$2b$10$oL/YzWAwjliQ3lqfej1F/ecPdK/TN2oQtl2DTRCPCk68jmSm/s3vi",
        name: "Íris Costa",
        profile: Profile.GESTOR,
        cpfCnpj: "99001122000133",
        state: "CE",
        coordinates: null,
      },
    ],
  });

  const carProperties = await prisma.carProperty.createMany({
    data: [
      {
        id: "390d65d7-c462-496e-b519-75003e675db1",
        carReceipt: "CE-2312908-11223344556677889900AABBCCDDEEFF",
        municipality: "Sobral",
        municipalityId: 2312908,
        userId: "711746ca-ae17-471f-8082-1e3670cf0848",
      },
      {
        id: "3b07b568-14e2-4bdd-9fff-b63d734e848b",
        carReceipt: "CE-2311801-FFEEDDCCBBAA00998877665544332211",
        municipality: "Russas",
        municipalityId: 2311801,
        userId: "711746ca-ae17-471f-8082-1e3670cf0848",
      },
      {
        id: "6eff375b-ff7b-421a-a220-7d9b85093503",
        carReceipt: "CE-2313401-43214321432143214321432143214321",
        municipality: "Tianguá",
        municipalityId: 2313401,
        userId: "81f9826d-677d-41f8-8069-64c579bfa3e9",
      },
      {
        id: "822cb96a-51a7-45ed-9aa5-a515d619c69f",
        carReceipt: "CE-2302602-FFEEDDCCBBAA99887766554433221100",
        municipality: "Camocim",
        municipalityId: 2302602,
        userId: "a0a0be00-28fc-4ae8-9692-cf717bfa77ab",
      },
      {
        id: "90ac19d4-d8c6-4ee8-bdd5-0efee4997515",
        carReceipt: "CE-2304103-12341234123412341234123412341234",
        municipality: "Crateús",
        municipalityId: 2304103,
        userId: "81f9826d-677d-41f8-8069-64c579bfa3e9",
      },
      {
        id: "a7170824-1003-4346-a0dd-ea2d5d5b93fa",
        carReceipt: "CE-2308708-99001122334455667788AABBCCDDEEFF",
        municipality: "Morada Nova",
        municipalityId: 2308708,
        userId: "a121ba3c-782f-4fdf-9a5f-5d77e0695cb3",
      },
      {
        id: "a8b4b802-e90d-481b-92f7-82ddc71ea986",
        carReceipt: "CE-2313302-77889900112233445566AABBCCDDEEFF",
        municipality: "Tauá",
        municipalityId: 2313302,
        userId: "2ffb2c73-afc1-4a52-a2d5-828715436b44",
      },
      {
        id: "ad507757-2043-4dfe-a8c6-e940a48778b8",
        carReceipt: "CE-2312908-11223344556677889900AABBCCDD9999",
        municipality: "Sobral",
        municipalityId: 2312908,
        userId: "711746ca-ae17-471f-8082-1e3670cf0848",
      },
      {
        id: "db5d2977-c220-476b-abcd-bb820ed0a74b",
        carReceipt: "CE-2311801-11112222333344445555666677778888",
        municipality: "Russas",
        municipalityId: 2311801,
        userId: "f2cf9153-4f88-4fe1-b48d-34731e3ad542",
      },
      {
        id: "e6ffff46-c9dc-44bb-a57f-4d1dd3372231",
        carReceipt: "CE-2311801-22223333444455556666777788889999",
        municipality: "Russas",
        municipalityId: 2311801,
        userId: "f2cf9153-4f88-4fe1-b48d-34731e3ad542",
      },
      {
        id: "ec012d42-3d43-40e7-84ba-dfb314216b78",
        carReceipt: "CE-2312908-77889900112233445566AABBCCDDEEFF",
        municipality: "Sobral",
        municipalityId: 2312908,
        userId: "39435c4b-c072-4c93-8b00-98c0914f136b",
      },
    ],
  });

}

main()
  .catch((e) => {
    console.error("Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });