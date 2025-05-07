import { useState } from "react";
import "../App.css";

const ParentActivity = () => {
  const [activity, setActivity] = useState([]);
  const [weight, setWeight] = useState([]);

  const inputData = (e) => {
    setActivity(e.target.value);
  };

  const handleWeight = (e) => {
    setWeight(e.target.value);
  };


  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1>Construction Site</h1>
        <div style={{padding: "5px", width: "100px", borderRadius: "5px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            {weight}%
            {
                weight == 100 ? <button>Save</button> : <button disabled>Save</button>
            }
        </div>
      </div>


      {/* Main Content */}
      <div>

        <div className="activitySection">
          <h2>Activity</h2>
          <input type="text" value={activity} onChange={inputData} />
        </div>

        {/* <div>a
              <h2>Unit of Count</h2>
              <select id="">
                  <option value=""></option>
              </select>
          </div> */}

        <div className="weightSection">
          <h2>Weight</h2>
          <input type="number" value={weight} onChange={handleWeight}/>
        </div>

      </div>
    </div>
  );
};

export default ParentActivity;
