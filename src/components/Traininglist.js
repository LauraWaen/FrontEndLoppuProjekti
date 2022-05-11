import React, { useState } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { useRef } from 'react';


function TrainingList() {
  const [training, setTraining] = useState({description: '', date: '', coatch:'', priority:''});
  const [trainings, setTrainings] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  }

  const addTraining = (event) => {
    setTrainings([...trainings, training]);
  }
  const deleteTraining = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {    
      setTrainings(trainings.filter((training, index) =>      
      index !== gridRef.current.getSelectedNodes()[0].childIndex))  }
      else {    alert('Select row first');  
    }
  }

  const columns = [
    
    {headerName: 'What kind of exercise', field: 'desc', sortable: true, filter: true, floatingFilter: true},
    {headerName: 'Date', field: 'date', sortable: true, filter: true, floatingFilter: true, rowAnimation: true},
    {headerName: 'Coatch', field: 'coatch', sortable: true, filter: true, floatingFilter: true, rowAnimation: true},
    {headerName: 'Priority', field: 'priority', sortable: true, filter: true,
     cellStyle: params => params.value === "High" ? {color:'hotpink'} : {color: 'black'}, floatingFilter: true
     
    }
  ]
 
  return (
    <div className="App">
      <center><input type="text" name="desc" placeholder="Exercise.." value={training.desc} onChange={inputChanged} />
      <input type="text" name="date"  placeholder="Date.." value={training.date} onChange={inputChanged} />
      <input type="text" name="coatch"  placeholder="Coatch name.." value={training.coatch} onChange={inputChanged} />
      <input type="text" name="priority"  placeholder="Priority.." value={training.priority} onChange={inputChanged} /></center>
      <center><button onClick={addTraining}>Add training</button>
      <button onClick={deleteTraining}>Delete training</button></center>

    <div
    className="ag-theme-material"
    style={{
    height: '700px',
    width: '80%',
    margin: 'auto',
    }}
    >


     <AgGridReact
      ref={gridRef}
      onGridReady={ params => gridRef.current = params.api }
      rowSelection="single"
      columnDefs={columns}
      rowData={trainings}>
     </AgGridReact>
     </div>
    </div>
  );
};

export default TrainingList;

