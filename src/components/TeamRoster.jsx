import React from "react";

const TeamDetailsPage = ({ teamDetails, selectedStartSeason, selectedEndSeason }) => {
  return (
    <div>
      <h1>Team Details</h1>
      {teamDetails ? (
        <div>
          <h2>{teamDetails.name_display_full}</h2>
          <p>Start Season: {selectedStartSeason}</p>
          <p>End Season: {selectedEndSeason}</p>
        </div>
      ) : (
        <p>Loading team details...</p>
      )}
    </div>
  );
};

export default TeamDetailsPage;

