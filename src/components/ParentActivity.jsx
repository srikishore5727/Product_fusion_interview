import React from "react";
import "../App.css";

const ParentActivity = ({
  activityData,
  onUpdateParentProperty,
  onDeleteParent,
  onAddSubActivity,
  onUpdateSubActivityProperty,
  onDeleteSubActivity,
}) => {
  const { id: parentId, name, weight, subActivities } = activityData;

  const handleNameChange = (e) => {
    onUpdateParentProperty("name", e.target.value);
  };

  const handleWeightChange = (e) => {
    onUpdateParentProperty("weight", e.target.value);
  };

  const currentSubActivitiesTotalWeight = subActivities.reduce(
    (sum, sub) => sum + Number(sub.weight || 0),
    0
  );
  const isOverAllocated = currentSubActivitiesTotalWeight > Number(weight || 0);

  return (
    <div>
      {/* Navbar for this Parent Activity */}
      <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
        <h3>{name || "Parent Activity"}</h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          Current Parent Weight: {Number(weight || 0).toFixed(2)}%
          {Number(weight || 0) === 100 ? ( 
            <button style={{ marginLeft: '10px', backgroundColor: 'lightgreen' }}>Save This Parent</button>
          ) : (
            <button style={{ marginLeft: '10px' }} disabled>Save This Parent</button>
          )}
        </div>
      </div>

      {/* Main Content for this Parent Activity */}
      <div>
        <div className="activitySection" style={{ marginBottom: '10px' }}>
          <h4>Details</h4>
          <label>Name: </label>
          <input type="text" value={name || ""} onChange={handleNameChange} style={{ marginRight: '10px' }} />
        </div>

        <div className="weightSection" style={{ marginBottom: '10px' }}>
          <label>Weight (%): </label>
          <input type="number" value={weight || 0} onChange={handleWeightChange} min="0" />
        </div>

        <button onClick={onDeleteParent} className="deleteButton" style={{ backgroundColor: '#ffcccb', marginRight: '10px' }}>
          Delete This Parent
        </button>
        <a onClick={onAddSubActivity} className="addItemOpt" style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
          Add Sub-Activity Item
        </a>

        {/* Display Visual cue for sub-activity allocation */}
        {subActivities.length > 0 && (
             <div style={{ marginTop: '10px', padding: '5px', backgroundColor: isOverAllocated ? '#ffebee' : '#e8f5e9', border: `1px solid ${isOverAllocated ? 'red' : 'green'}` }}>
                Sub-Activities Total: {currentSubActivitiesTotalWeight.toFixed(2)}% / {Number(weight || 0).toFixed(2)}%
                {isOverAllocated && <strong style={{color: 'red'}}> (Overallocated by parent's current weight!)</strong>}
            </div>
        )}


        {/* Sub Activities Section for THIS parent */}
        <div style={{ marginLeft: "20px", marginTop: "15px" }}>
          <h4>Sub-Activities:</h4>
          {subActivities && subActivities.length > 0 ? (
            subActivities.map((sub, subIndex) => (
              <div key={sub.id} className="subActivitySection" style={{ borderTop: '1px dashed #eee', paddingTop: '10px', marginTop: '10px' }}>
                <h5>Sub Activity {subIndex + 1}</h5>
                <label>Name: </label>
                <input
                  type="text"
                  value={sub.name || ""}
                  onChange={(e) => onUpdateSubActivityProperty(sub.id, "name", e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <label>Weight (%): </label>
                <input
                  type="number"
                  value={sub.weight || 0}
                  onChange={(e) => onUpdateSubActivityProperty(sub.id, "weight", e.target.value)}
                  min="0"
                  style={{ marginRight: '10px' }}
                />
                <button onClick={() => onDeleteSubActivity(sub.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Delete Sub
                </button>
              </div>
            ))
          ) : (
            <p>No sub-activities added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentActivity;