import React from "react";

const Team = props => {
  return (
    <>
      <td>
        <button
          className="button is-light"
          onClick={() => props.deleteTeam(props.team.TeamId)}
        >
          {props.team.TeamName}
        </button>
      </td>
      <td className="column is-light">
        <img alt="" width="20" height="20" src={props.team.TeamIconUrl} />
      </td>
    </>
  );
};

export default Team;
