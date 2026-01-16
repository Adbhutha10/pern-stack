import express from "express";

const app = express();
const PORT = 3000;

const router = express.Router();

app.use(express.json());


app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from Car API!");
});

router.get("/cars", async (req, res) => {
  const allCars = await db.select().from(cars); // In a real app, you'd fetch this from the database
  res.json(allCars);
});

router.post("/cars", async (req, res) => {
  const addedCar = req.body;
  const [newCar] = await db.insert(cars).values(addedCar).returning();
  res.status(201).json(newCar);
});

router.put("/cars/:id", async (req, res) => {
  const carId = await parseInt(req.params.id);
  const { make, model, year, price } = req.body;
  const carIndex = cars.findIndex((c) => c.id === carId);

  if (carIndex === -1) {
    return res.status(404).json({ error: "Car not found" });
  }
  res.json(cars[carIndex]);
});

router.delete("/cars/:id", async (req, res) => {
  const carId = await parseInt(req.params.id);
  const carIndex = cars.findIndex((c) => c.id === carId);

  if (carIndex === -1) {
    return res.status(404).json({ error: "Car not found" });
  }

  const deletedCar = cars.splice(carIndex, 1)[0];

  res.json({
    message: "Car deleted successfully",
    car: deletedCar,
  });
});

router.get("/cars/:id", async (req, res) => {
  const carId = await parseInt(req.params.id);
  const car = cars.find((c) => c.id === carId);

  if (!car) {
    return res.status(404).json({ error: "Car not found" });
  }

  res.json(car);
});

app.use("/api/v1", router);

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
