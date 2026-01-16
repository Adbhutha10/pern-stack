import express from "express";
const app = express();
const port=3000;
const router = express.Router();
app.use(express.json());
app.use((req, res, next) => {
    const timestamp=new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

let cars=[
    {id:1, make:"Toyota", model:"Camry", year:2020, price:24000},
    {id:2, make:"Honda", model:"Accord", year:2019, price:22000},
    {id:3, make:"Ford", model:"Mustang", year:2021, price:26000}
];

app.get('/', (req, res) => {
    res.send('Hello, World!\n');
});

router.get('/', (req, res) => {
    res.json(cars);
});

router.get('/:id', (req, res) => {
    const id=Number(req.params.id);
    const car=cars.find(car => car.id===id);
    if(car){
        res.json(car);
    } else {
        res.status(404).send('Car not found');
    }
});

router.post('/', (req, res) => {
    const { make, model, year, price } = req.body;
    if (!make || !model || !year || !price) {
        return res.status(400).json({error: "Missing fields"});
    }

    const newCar = {
        id: cars.length + 1,
        make,
        model,
        year: Number(year),
        price: Number(price)
    };
    cars.push(newCar);
    res.status(201).json(newCar);
});

router.put('/:id', (req, res) => {
    const id=Number(req.params.id);
    const { make, model, year, price } = req.body;
    const carIndex = cars.findIndex(car => car.id === id);
    if (carIndex === -1) {
        return res.status(404).json({ error: "Car not found" });
    }
    if (make) cars[carIndex].make = make;
    if (model) cars[carIndex].model = model;
    if (year) cars[carIndex].year = Number(year);
    if (price) cars[carIndex].price = Number(price);
    res.json(cars[carIndex]);
});

router.delete('/:id', (req, res) => {
    const id=Number(req.params.id);
    const carIndex = cars.findIndex(car => car.id === id);
    if (carIndex === -1) {
        return res.status(404).json({ error: "Car not found" });
    }
    const deletedCar = cars.splice(carIndex, 1)[0];
    res.json({message: "Car deleted", car: deletedCar});
});
 

app.use('/api/v1/cars', router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
