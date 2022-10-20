import { useState, useEffect } from "react";
import db from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";

import { ItemContainer } from "./components/itemContainer";

import "./App.css";
import Modal from "./components/modal";

function App() {
  const [food, setFood] = useState({});
  const [drinks, setDrinks] = useState({});
  const [selectedCart, setSelectedCart] = useState("food");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isForDrinks, setIsForDrinks] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log('is Fetching')
      setIsLoading(true);
      switch (selectedCart) {
        case "food":
          const foodSnapshot = await getDocs(collection(db, "food"));
          foodSnapshot.forEach((doc) => {
            if (doc.id === "languages") return;
            const foodCat = {};
            foodCat[doc.id] = { ...doc.data() };
            setFood((prevFood) => ({ ...prevFood, ...foodCat }));
          });
          break;
        case "drinks":
          const drinkSnapshot = await getDocs(collection(db, "drinks"));

          drinkSnapshot.forEach((doc) => {
            if (doc.id === "categories") return;
            const drinkCat = {};
            drinkCat[doc.id] = { ...doc.data() };
            setDrinks((prevDrinks) => ({ ...prevDrinks, ...drinkCat }));
          });
          break;
        default:
          break;
      }
      setIsLoading(false);
    };
    if(showModal) return;
    fetchData();
  }, [selectedCart, setIsLoading, showModal]);

  const setForDrinks = (showDrinks) => {
    setIsForDrinks(showDrinks);
    setShowModal(true);
  }

  return isLoading ? (
    "Is Loading"
  ) : (
    <div>
      <div className="container">
        <div className="actionButtons">
          <button onClick={() => setSelectedCart("food")} className="buttons">
            Food
          </button>
          <button onClick={() => setSelectedCart("drinks")} className="buttons">
            Drinks
          </button>
          <button className="buttons" onClick={() => setForDrinks(false)}>
            Add Food
          </button>
          <button className="buttons" onClick={() => setForDrinks(true)}>
            Add Drinks
          </button>
        </div>
        {selectedCart === "food" ? (
          <ItemContainer data={food} isForDrinks={false} setModal={setShowModal} />
        ) : (
          <ItemContainer data={drinks} isForDrinks={true} setModal={setShowModal} />
        )}
      </div>
      {showModal && (
        <Modal isForEdit={false} showDrinks={isForDrinks} setModal={setShowModal} />
      )}
    </div>
  );
}

export default App;
