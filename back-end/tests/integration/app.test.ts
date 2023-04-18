import supertest from "supertest";
import prisma from "../../src/database";
import httpStatus from "http-status";
import app from "../../src/app";

const agent = supertest(app);

describe("integration test", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

/*   afterAll(async () => {
    await prisma.$disconnect(); // Encerra a conexão com o banco de dados
  });
 */
  it("should register a user", async () => {
    const { status } = await agent.get("/add");
    expect(status).toBe(httpStatus.CREATED);

    const users = await prisma.user.findMany();
    expect(users).toHaveLength(1);
  });

  it("should return all users", async () => {
    await prisma.user.createMany({
      data: [
        { name: "test1", email: "test1@gmail.com" },
        { name: "test2", email: "test2@gmail.com" },
      ],
    });

    const response = await agent.get("/all");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveLength(2);
  });
});
