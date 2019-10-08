import React, { useEffect, useReducer, useState, useCallback } from "react";
import useHttp from "./hooks/useHttp";
import Team from "./Team";
import Search from "./ui/Search";

const Reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        teams: action.payload
      };
    default:
      throw new Error();
  }
};

const Teams = () => {
  //const url = "http://localhost:8000/api/company";
  const url = "https://www.openligadb.de/api/getavailableteams/bl1/2019";

  const initialdata = { teams: [] };
  const [teamdata, dispatch] = useReducer(Reducer, initialdata);

  const [{ data, isLoading, isError }, doFetch] = useHttp(`${url}`, "GET", []);

  useEffect(() => {
    console.log("##############", data);

    dispatch({ type: "SET", payload: data });
  }, [data, doFetch]);

  const doFilterTeams = useCallback(filteredTeams => {
    if (filteredTeams !== "") {
      console.log("+++++++++++++++++++++", filteredTeams);
      dispatch({ type: "SET", payload: filteredTeams });
    }
  }, []);

  const doAddTeam = useCallback(teams => {
    //
    var newTeamsArr = teamdata.teams;
    newTeamsArr.push(teams);
    console.log("###### Add Team ########", newTeamsArr);
    dispatch({ type: "SET", payload: newTeamsArr });
  });

  const doDeleteTeam = useCallback(id => {
    const filtered = teamdata.teams.filter(team => {
      return team.TeamId !== id ? true : false;
    });
    console.log("###### delete Team ########", id, filtered);
    dispatch({ type: "SET", payload: filtered });
  });

  return (
    <>
      {isLoading ? (
        <p>Loading data ...</p>
      ) : (
        <table>
          <tbody>
            {teamdata.teams.map((t, k) => (
              <tr key={k}>
                <Team team={t} deleteTeam={doDeleteTeam} />
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Search filterTeams={doFilterTeams} addTeam={doAddTeam} data={data} />
    </>
  );
};

export default Teams;
