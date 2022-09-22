import { useState, useEffect } from "react";

import db from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

import { ItemContainer } from "./components/itemContainer";

import "./App.css";

function App() {
  const [food, setFood] = useState({});
  const [drinks, setDrinks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const foodSnapshot = await getDocs(collection(db, "food"));
      foodSnapshot.forEach((doc) => {
        const foodCat = {};
        foodCat[doc.id] = { ...doc.data() };
        setFood((prevFood) => ({ ...prevFood, ...foodCat }));
      });
      setIsLoading(false);
    };
    fetchData();
  }, [setFood, setIsLoading]);

  return isLoading ? "Is Loading" : <ItemContainer data={food}/>
}

export default App;
