import { useState } from "react";
import "./itemContainer.css";
import Modal from "./modal";

export const ItemContainer = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [dataForEdit, setDataForEdit] = useState({});

  const ItemCell = (props) => {
    const sorted = Object.keys(props.data)
      .sort()
      .reduce((accumulator, key) => {
        accumulator[key] = props.data[key];

        return accumulator;
      }, {});
    let allKeys = Object.keys(sorted);
    allKeys.splice(allKeys.indexOf("index"), 1);
    allKeys.unshift("index");
    return allKeys.map((key, index) => {
      let styleClass = "itemCell";
      if (key === "index") styleClass = "itemCell index";
      return (
        <div key={key} className={styleClass}>
          {sorted[key]}
          {key === "price" ? "$" : ""}
        </div>
      );
    });
  };

  const handleOnEdit = (data) => {
    setDataForEdit({ ...data });
    setShowModal(true);
  };

  const ItemRow = (props) => {
    const allKeys = Object.keys(props.data).sort(
      (a, b) => props.data[a].index - props.data[b].index
    );

    return allKeys.map((key) => {
      const data = {
        index: props.data[key].index,
        desc: props.data[key].English.desc,
        price: props.data[key].price,
        cat: props.data[key].category,
        name: props.data[key].id,
      };
      const dataForEdit = { ...props.data[key] };

      return (
        <div key={key} className="itemRow">
          <ItemCell data={data} />
          <button
            onClick={() => handleOnEdit(dataForEdit)}
            className="itemCell button"
          >
            Edit
          </button>
        </div>
      );
    });
  };

  const allKeys = Object.keys(props.data);

  return (
    <div className="itemContainer">
      <div className="itemRow contHeadcont">
        <span className="contHead index">Index</span>
        <span className="contHead">Category</span>
        <span className="contHead">Description</span>
        <span className="contHead">Name</span>
        <span className="contHead">Price</span>
        <span className="contHead">Edit</span>
      </div>
      {allKeys.map((key) => {
        if (key === "categories") return <div key={key} />;

        return (
          <div key={key}>
            <ItemRow key={key} data={props.data[key]} /> <hr/>
          </div>
        );
      })}
      {showModal && (
        <Modal
          data={dataForEdit}
          isForEdit={true}
          showDrinks={props.isForDrinks}
          setModal={setShowModal}
        />
      )}
    </div>
  );
};
