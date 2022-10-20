import { useForm } from "react-hook-form";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import db from "../firebase-config";
import { useEffect, useState } from "react";

const Modal = (props) => {
  const [langauages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (props.showDrinks) {
        setLanguages(["English"]);
        const catSnapshot = await getDoc(doc(db, "drinks", "categories"));
        setCategories(catSnapshot.data().categories);
        setIsLoading(false);
        return;
      }
      const langSnapshot = await getDoc(doc(db, "food", "languages"));
      const catSnapshot = await getDoc(doc(db, "food", "categories"));
      setCategories(catSnapshot.data().categories);
      setLanguages(langSnapshot.data().lang);
      setIsLoading(false);
    };
    fetchData();
  }, [setLanguages, setCategories, props.showDrinks]);

  const { register, handleSubmit } = useForm();
  const addProduct = async (data) => {
    let docRef;
    if (props.showDrinks) {
      docRef = doc(db, "drinks", data.category);
    } else {
      docRef = doc(db, "food", data.category);
    }

    const prodKeys = Object.keys(data);
    let properObject = {};
    prodKeys.forEach((key) => {
      if (
        key === "id" ||
        key === "price" ||
        key === "category" ||
        key === "isAvailable" ||
        key === "img" ||
        key === 'index'
      ) {
        properObject = { ...properObject, [key]: data[key] };
        return;
      }

      const prod = key.split("_");
      properObject = {
        ...properObject,
        [prod[1]]: { ...properObject[prod[1]], [prod[0]]: data[key] },
      };
    });

    if (props.isForEdit) {
      props.setModal(false);
      await updateDoc(docRef, {
        [props.data.id]: deleteField(),
        [data.id]: { ...properObject },
      });
    } else {
      props.setModal(false);

      await updateDoc(docRef, {
        [data.id]: { ...properObject },
      });
    }
  };

  return isLoading ? (
    "Is Loading"
  ) : (
    <>
      <div className="modalContent">
        <form onSubmit={handleSubmit(addProduct)}>
          <div className="firstRow headRow">
            <div className="input">
              <label htmlFor="id">Product ID</label>
              <input
                id="id"
                name="id"
                defaultValue={props.isForEdit ? props.data.id : ""}
                {...register("id")}
              />
            </div>
            <div className="input">
              <label htmlFor="price">Product Price</label>
              <input
                id="price"
                name="price"
                type="number"
                step=".1"
                defaultValue={props.isForEdit ? props.data.price : 0}
                {...register("price")}
              />
            </div>
            <div className="input">
              <label htmlFor="index">Product Index</label>
              <input
                id="index"
                name="inedx"
                type="number"
                defaultValue={props.isForEdit ? props.data.index : 0}
                {...register("index")}
              />
            </div>
            <div className="input">
              <label htmlFor="cat">Product Category</label>
              <select
                id="cat"
                name="cat"
                {...register("category")}
                defaultValue={props.isForEdit && props.data.category}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="input">
              <label htmlFor="isAvailable">
                Is Available
                <input
                  id="isAvailable"
                  name="isAvailable"
                  type="radio"
                  value="true"
                  defaultChecked={
                    props.isForEdit && props.data.isAvailable === "true"
                  }
                  {...register("isAvailable")}
                />
              </label>
              <label htmlFor="isAvailable">
                Is Not Available
                <input
                  id="isNotAvailable"
                  name="isNotAvailable"
                  type="radio"
                  value="false"
                  defaultChecked={
                    props.isForEdit && props.data.isAvailable === "false"
                  }
                  {...register("isAvailable")}
                />
              </label>
            </div>
            <div className="input" id="imgdiv">
              <label htmlFor="id">Product Image Link</label>
              <input
                id="img"
                name="img"
                defaultValue={props.isForEdit ? props.data.img : ""}
                {...register("img")}
              />
            </div>
          </div>
          <hr />
          {langauages.map((lang) => {
            return (
              <div className="firstRow" key={lang}>
                <div className="input">
                  <label htmlFor={`name_${lang}`}>{lang} Name</label>
                  <input
                    id={`name_${lang}`}
                    name={`name_${lang}`}
                    defaultValue={props.isForEdit ? props.data[lang].name : ""}
                    {...register(`name_${lang}`)}
                  />
                </div>
                <div className="input textarea">
                  <label htmlFor={`desc_${lang}`}>{lang} Description</label>
                  <textarea
                    rows="3"
                    columns="5"
                    id={`desc_${lang}`}
                    name={`desc_${lang}`}
                    defaultValue={props.isForEdit ? props.data[lang].desc : ""}
                    {...register(`desc_${lang}`)}
                  />
                </div>
              </div>
            );
          })}
          <div className="buttonsBottom">
            <button className="buttons" type="submit">
              {props.isForEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
      <div className="backdrop" onClick={() => props.setModal(false)} />
    </>
  );
};

export default Modal;
