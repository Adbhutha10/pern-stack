import React from 'react';
import Car from './components/Car';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('api/v1/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
      }, []);
  console.log(cars);
  return (
    <div>
      <h1>Welcome to the Car Management App</h1>

      <ul>
        { cars.map(car => (
          <Car key={car.id} {...car} />
        )) }
      </ul>
    </div>
  );
};

export default App;