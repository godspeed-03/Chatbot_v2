import { createContext, useReducer, useEffect, useContext } from "react";
import reducer from "./reducer";
import FetchDatabyQuery from "./API";

let initialState = {
  query: "",
  photo: [],
  UserName: "Guest",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchApiData = async () => {
    try {
      const result = await FetchDatabyQuery(state.query);
      dispatch({
        type: "Get_Photos",
        payload: {
          photo: result.photos,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const searchpost = (searchquery) => {
    dispatch({
      type: "Searchpost",
      payload: searchquery,
    });
  };

  const userName = (UserName) => {
    dispatch({
      type: "UserName",
      payload: UserName,
    });
  };

  useEffect(() => {
    fetchApiData();
  }, [state.query]);

  return (
    <AppContext.Provider value={{ ...state, searchpost, userName }}>
      {children}
    </AppContext.Provider>
  );
};

const useApiData = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApiData must be used within an AppProvider");
  }
  return context;
};

export { AppContext, AppProvider, useApiData };
