import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-50e31-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) {
        throw new Error();
      }

      const mealsData = await response.json();

      const loadedMeals = [];

      for (const mealKey in mealsData) {
        loadedMeals.push({
          id: mealKey,
          name: mealsData[mealKey].name,
          description: mealsData[mealKey].description,
          price: mealsData[mealKey].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(() => {
      setIsLoading(false);
      setError(
        `sorry I ata all the meals please forgive me, no Iam just kidding just check you internet connection `
      );
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
