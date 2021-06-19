import React, { useReducer } from "react";
import { DataContext } from "./DataContext";
import { DataReducer } from "./DataReducer";
import * as axios from "axios";
import moment from "moment";


let count = 1,
  newId = 0;

const columns = [
  {
    Header: "News Table",
    columns: [
      {
        Header: "time added",
        accessor: (id) => {
          return moment(id.time * 1000)
            .local()
            .format("DD-MM-YYYY HH:mm");
        },
      },
      {
        Header: "title",
        accessor: "title",
        disableSortBy: window.innerWidth < 414 ?true:false
      },
      {
        Header: "domain",
        accessor: "domain",
        disableSortBy: window.innerWidth < 414 ?true:false
      },
    ],
  },
];

export const DataState = ({ children }) => {
  const initialState = {
    posts: [],
    loading: true,
    visible: false,
    comments: [],
  };
  const [state, dispatch] = useReducer(DataReducer, initialState);

  const getData = async () => {
    await axios
      .get(`https://api.hnpwa.com/v0/news/${count}.json`)
      .then((res) => {
        dispatch({ type: "GET_DATA", payload: res.data });
        count = count + 1;
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const getId = async (id) => {
    if (newId != id) {
      await axios
        .get(`https://api.hnpwa.com/v0/item/${id}.json`)
        .then((res) => {
          dispatch({ type: "GET_COMMENTS", payload: res.data });
          newId = id;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const closeMenu=()=>{
   dispatch({ type: "CLOSE_COMMENTS"})
  }

  return (
    <DataContext.Provider
      value={{
        getData,
        posts: state.posts,
        loading: state.loading,
        columnsSet:columns,
        open:state.visible,
        closeMenu,
        getId,
        comments: state.comments,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
