// File: AppContext.tsx
import { createContext,  useReducer, useEffect, useContext } from 'react';
import reducer from './reducer';
import FetchDatabyQuery from './API';


const initialState = {
  query: '',
  photo: [],
  
};


const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  const fetchApiData = async () => {
    try {
      const result = await FetchDatabyQuery(state.query);
      // console.log(result)
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

  const removepost = (photoid) => {
    dispatch({
      type: "remove_post",
      payload: photoid,
    });
  };

  const searchpost = (searchquery) => {
    dispatch({
      type: "Searchpost",
      payload: searchquery,
    });
  };

  useEffect(() => {
    fetchApiData();
  }, [state.query]);

  // console.log(state)

  return (
    <AppContext.Provider value={{ ...state, removepost, searchpost }}>
      {children}
    </AppContext.Provider>
  );
};

// console.log(typeof AppContext)

 const useApiData = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApiData must be used within an AppProvider');
  }
  return context;
};

export { AppContext, AppProvider, useApiData };
