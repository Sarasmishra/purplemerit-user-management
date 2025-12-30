import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

beforeAll(async () => {
  const testUri = process.env.MONGO_URI + "_test";
  await mongoose.connect(testUri);
});

afterEach(async () => {
  // Clean all collections after each test
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
