import React, { useState, useRef, useEffect } from "react";
//import ErrorModal from '../UI/ErrorModal';
//import useHttp from '../../hooks/http';

const Search = React.memo(props => {
  var { filterTeams, data, addTeam } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();
  //const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    var filtered = [];
    const timer = setTimeout(() => {
      if (enteredFilter === "") {
        filtered = data;
      } else if (enteredFilter === inputRef.current.value) {
        const searchToken = new RegExp("^" + enteredFilter);
        filtered = data.filter(str => {
          return str.TeamName.match(searchToken, "i");
        });
      }
      if (filtered.length) {
        filterTeams(filtered);
      }
    }, 500);

    console.log("++++++", data);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, inputRef, filterTeams]);

  return (
    <section className="search">
      <div className="search-input">
        <label>Filter by Name</label>
        <input
          ref={inputRef}
          type="text"
          value={enteredFilter}
          onChange={event => setEnteredFilter(event.target.value)}
        />
      </div>
      <button
        onClick={event =>
          addTeam({
            TeamId: 99,
            TeamName: "1.FcFc",
            ShortName: "",
            TeamGroupName: "",
            TeamIconUrl: ""
          })
        }
      >
        Add
      </button>
    </section>
  );
});
export default Search;
