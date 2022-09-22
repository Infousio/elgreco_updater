
export const ItemContainer = (props) => {

  const ItemCell = (props) => {


    const sorted = Object.keys(props.data).sort().reduce((accumulator, key) => {
      accumulator[key] = props.data[key];

      return accumulator;
    }, {})

    const allKeys = Object.keys(sorted);

    return <div className="itemCell">{allKeys.map((key) => {
      return sorted[key];
    })}</div>;
  }

  const ItemRow = (props) => {
    const allKeys = Object.keys(props.data);
    
    return (<div className="itemRow">{allKeys.map((key) => {
      return <ItemCell key={key} data={props.data[key]} />
    })}</div>)
  
  }

  const allKeys = Object.keys(props.data);
  return (
    <div className="itemContainer">{allKeys.map((key) => {
      return <ItemRow key={key} data={props.data[key]} />
    })}</div>
  );
};
