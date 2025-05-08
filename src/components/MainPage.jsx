import React, { useEffect, useState } from "react";
import ParentActivity from "./ParentActivity";
import "../App.css";

const MainPage = () => {
  // Store an array of parent activity objects
  const [parentActivities, setParentActivities] = useState([]);
  const [totalProjectWeight, setTotalProjectWeight] = useState(0);

  // Calculate total project weight whenever parent activities change
  useEffect(() => {
    const total = parentActivities.reduce(
      (sum, activity) => sum + Number(activity.weight || 0),
      0
    );
    setTotalProjectWeight(total);
  }, [parentActivities]);

  // --- Parent Activity Handlers ---
  const handleAddParentActivity = () => {
    setParentActivities((prev) => [
      ...prev,
      {
        id: Date.now(), // Simple unique ID
        name: `Parent Activity ${prev.length + 1}`,
        weight: 0,
        subActivities: [],
      },
    ]);
  };

  const handleDeleteParentActivity = (parentId) => {
    setParentActivities((prev) => prev.filter((p) => p.id !== parentId));
  };

  const handleUpdateParentProperty = (parentId, propertyName, value) => {
    setParentActivities((prev) =>
      prev.map((p) => {
        if (p.id === parentId) {
          if (propertyName === "weight") {
            let newWeight = parseFloat(value);
            if (isNaN(newWeight) || newWeight < 0) newWeight = 0;
      
            return { ...p, weight: newWeight };
          }
          return { ...p, [propertyName]: value }; // For name, etc.
        }
        return p;
      })
    );
  };

  // --- Sub-Activity Handlers (to be called from ParentActivity) ---
  const handleAddSubActivityToParent = (parentId) => {
    setParentActivities((prev) =>
      prev.map((p) => {
        if (p.id === parentId) {
          return {
            ...p,
            subActivities: [
              ...p.subActivities,
              {
                id: Date.now() + Math.random(), // More unique ID
                name: `Sub-Activity ${p.subActivities.length + 1}`,
                weight: 0,
              },
            ],
          };
        }
        return p;
      })
    );
  };

  const handleUpdateSubActivityProperty = (parentId, subId, propertyName, value) => {
    setParentActivities((prevParents) =>
      prevParents.map((parent) => {
        if (parent.id === parentId) {
          let newSubActivities = [...parent.subActivities];

          if (propertyName === "weight") {
            let newSubWeight = parseFloat(value) || 0;
            const parentWeightLimit = Number(parent.weight || 0);

            // Calculate sum of other sub-activities' weights
            const otherSubsWeight = newSubActivities
              .filter(sub => sub.id !== subId)
              .reduce((sum, sub) => sum + Number(sub.weight || 0), 0);

            // Check if new weight exceeds parent limit when combined with others
            if (otherSubsWeight + newSubWeight > parentWeightLimit) {
              newSubWeight = parentWeightLimit - otherSubsWeight;
              if (newSubWeight < 0) newSubWeight = 0; // Ensure non-negative
              alert(`Sub-activity weight capped at ${newSubWeight.toFixed(2)}%. Total for "${parent.name}" cannot exceed parent weight of ${parentWeightLimit}%.`);
            }
             if (newSubWeight < 0) newSubWeight = 0; // Ensure non-negative

            newSubActivities = newSubActivities.map((sub) =>
              sub.id === subId ? { ...sub, weight: newSubWeight } : sub
            );
          } else { // For 'name'
            newSubActivities = newSubActivities.map((sub) =>
              sub.id === subId ? { ...sub, [propertyName]: value } : sub
            );
          }
          return { ...parent, subActivities: newSubActivities };
        }
        return parent;
      })
    );
  };

  const handleDeleteSubActivity = (parentId, subId) => {
    setParentActivities((prev) =>
      prev.map((p) => {
        if (p.id === parentId) {
          return {
            ...p,
            subActivities: p.subActivities.filter((sub) => sub.id !== subId),
          };
        }
        return p;
      })
    );
  };


  return (
    <div>
      <button onClick={handleAddParentActivity} style={{ marginBottom: '20px', padding: '10px' }}>
        Add Parent Activity
      </button>

      <div style={{ border: '2px solid green', padding: '10px', margin: '20px 0' }}>
        <h2>Project Total Weight: {totalProjectWeight.toFixed(2)}%</h2>
        {totalProjectWeight === 100 ? (
          <button style={{ backgroundColor: 'green', color: 'white', padding: '8px 12px' }}>
            SAVE ENTIRE PROJECT
          </button>
        ) : (
          <button disabled style={{ padding: '8px 12px' }}>
            SAVE ENTIRE PROJECT (Requires 100% Total)
          </button>
        )}
      </div>

      <div>
        {parentActivities.map((activity) => (
          <div key={activity.id} style={{ border: '1px solid #ddd', margin: '15px', padding: '15px', backgroundColor: '#f9f9f9' }}>
            <ParentActivity
              // Pass the specific parent activity's data
              activityData={activity}
              // Pass handlers to update data in MainPage
              onUpdateParentProperty={(propertyName, value) =>
                handleUpdateParentProperty(activity.id, propertyName, value)
              }
              onDeleteParent={() => handleDeleteParentActivity(activity.id)}
              onAddSubActivity={() => handleAddSubActivityToParent(activity.id)}
              onUpdateSubActivityProperty={(subId, propertyName, value) =>
                handleUpdateSubActivityProperty(activity.id, subId, propertyName, value)
              }
              onDeleteSubActivity={(subId) => handleDeleteSubActivity(activity.id, subId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;