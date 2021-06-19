
import React,{useEffect,useContext} from 'react';
import './App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from './components/Table/Table';
import {DataContext} from './context/database/DataContext'
import Comments from './components/Comments/Comments'




function App() { 
  const {posts,getData,loading} = useContext(DataContext)
  
  useEffect(() => {
  getData()
  }, []) 


  return (
   <div className="App">
      {loading ? <CircularProgress/>:( <div><Comments/><Table  data={posts}/></div> )}
     </div>
  );
}

export default App;
