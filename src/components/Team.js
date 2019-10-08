import React from "react";

const Team = props => {
  return (
    <>
      <td>
        <a href={props.team.TeamIconUrl}>{props.team.TeamName}</a>
      </td>
      <td>
        <img alt="" width="30" height="40" src={props.team.TeamIconUrl} />
      </td>
    </>
  );
};

export default Team;
