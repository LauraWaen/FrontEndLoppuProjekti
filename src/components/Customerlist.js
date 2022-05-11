import React, { useState } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { useRef } from 'react';


function CustomerList() {
  const [customer, setCustomer] = useState({Name: '', Phonenumber: '', Email:''});
  const [customers, setCustomers] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  }

  const addCustomer = (event) => {
    setCustomers([...customers, customer]);
  }
  const deleteCustomer = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {    
      setCustomers(customers.filter((customer, index) =>      
      index !== gridRef.current.getSelectedNodes()[0].childIndex))  }
      else {    alert('Select row first');  
    }
  }
  

  const columns = [
    
    {headerName: 'Name', field: 'name', sortable: true, filter: true, floatingFilter: true},
    {headerName: 'Phonenumber', field: 'phonenumber', sortable: true, filter: true, floatingFilter: true, rowAnimation: true},
    {headerName: 'Email', field: 'email', sortable: true, filter: true, floatingFilter: true, rowAnimation: true}
 
    
  ]
 
  return (
    <div className="App">
      <center><input type="text" name="name" placeholder="Customer name.." value={customer.Name} onChange={inputChanged} />
      <input type="text" name="phonenumber"  placeholder="Customer phonenumber" value={customer.Phonenumber} onChange={inputChanged} />
      <input type="text" name="email"  placeholder="Email" value={customer.Email} onChange={inputChanged} /></center>
      <center><button onClick={addCustomer}>Add customer</button>
      <button onClick={deleteCustomer}>Delete customer</button></center>
      
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
      rowData={customers}>
     </AgGridReact>
     </div>
    </div>
  );
};

export default CustomerList;