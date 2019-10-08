import { useState, useEffect, useReducer } from "react";

const Reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return { ...state, isLoading: true, isError: false };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const useHttp = (initialUrl, method, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(Reducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    // const fetchData = async () => {
    //   dispatch({ type: "INIT" });
    //   try {
    //     const result = await axios(url);
    //     if (!didCancel) {
    //       dispatch({ type: "SUCCESS", payload: result.data });
    //     }
    //   } catch (error) {
    //     if (!didCancel) {
    //       dispatch({ type: "FAILURE" });
    //     }
    //   }
    // };

    let didCancel = false;

    const fetchData = () => {
      //const method = "get";
      const config = {
        url: url,
        method: method,
        headers: { "Content-Type": "application/json" }
      };

      dispatch({ type: "INIT" });
      fetch(url, { config })
        .then(result => {
          return result.json();
        })
        .then(resultdata => {
          console.log("### useHttp #####", resultdata);
          if (!didCancel) {
            dispatch({ type: "SUCCESS", payload: resultdata });
          }
        })
        .catch(error => {
          if (!didCancel) {
            dispatch({ type: "FAILURE" });
          }
        });
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url, method]);

  return [state, setUrl];
};

export default useHttp;
