import { useState, useEffect } from "react";

import db from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

import "./App.css";

function App() {
  const [food, setFood] = useState({});
  const [drinks, setDrinks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const foodSnapshot = await getDocs(collection(db, "food"));
      foodSnapshot.forEach(doc => {
        const foodCat = {};
        foodCat[doc.id] = {...doc.data()};
        setFood(prevFood => (
          {...prevFood, ...foodCat}
        ));
      });
      setIsLoading(false);
    };
    fetchData();
  }, [setFood]);

  const Buttons = () => {

    const buttonNames = [];
    for(const catName in food) {
      buttonNames.push(catName);
    };
    
    return buttonNames.forEach(catName => {
      <button className="button">{catName}</button>
    });
  };

  return (
    <div className="App">
      {isLoading ? "Is Loading" : <Buttons />}
    </div>
  );
}

export default App;
