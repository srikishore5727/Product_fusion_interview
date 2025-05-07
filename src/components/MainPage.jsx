import React, { useEffect, useState } from "react";
import ParentActivity from "./ParentActivity";
import "../App.css";

const MainPage = () => {
  const [parentActivity, setParentActivity] = useState(0);
  const [subActivity, setSubActivity] = useState(0);

  const handleClick = () => {
    setParentActivity((prev) => prev + 1);
  };

  const handleDelete = () => {
    setParentActivity((prev) => prev - 1);
  };

  const handleSubActivity = () => {
    setSubActivity((prev) => prev + 1);
  };

  const inputData = (e) => {
    setSubActivityVal(e.target.value);
  };

  const handleWeight = (e) => {
    setSubWeight(e.target.value);
  };

  // useEffect(() => {

  // }, [parentActivity]);

  return (
    <div>
      <button onClick={handleClick}>Add</button>

      <div>
        {[...Array(parentActivity)].map((_, index) => (
          <div key={index}>
            <ParentActivity key={index} />
            <button onClick={handleDelete} className="deleteButton">
              Delete
            </button>
            <a onClick={handleSubActivity} className="addItemOpt">
              Add Item
            </a>
            {[...Array(subActivity)].map((_, subIndex) => (
              <div key={subIndex} className="subActivitySection">
                <h2>Sub Activity</h2>
                <input type="text" onChange={inputData} />
                <input type="number" onChange={handleWeight} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
