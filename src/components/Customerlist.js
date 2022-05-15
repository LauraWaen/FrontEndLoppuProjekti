import React, { useState, useEffect } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import Addcustomer from "./Addcustomer";
import Addtraining from "./Addtraining";
import Editcustomer from "./Editcustomer";
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import DeleteIcon from "@material-ui/icons/Delete";

export default function Customerlist() {
	const [customers, setCustomers] = useState([]);

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch('https://customerrest.herokuapp.com/api/customers')
			.then(response => response.json())
			.then(data => setCustomers(data.content));
	};

	const deleteCustomer = link => {
		if (window.confirm("Are you sure to delete customer?")) {
			console.log(link);
			fetch(link, { method: "DELETE" })
				.then(res => {

					fetchData();
					if (res.status >= 200 && res.status < 300) {
						Snackbar({ message: "Customer deleted successfully" });
					} else {
						Snackbar({ message: "Error. Try again." });
					}
				})
					.catch(err => console.error(err));
		}
	};

	const saveCustomer = customer => {
		fetch('https://customerrest.herokuapp.com/api/customers', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(customer)
		})
			.then(res => {
				fetchData();
				if (res.status >= 200 && res.status < 300) {
					Snackbar({ message: "Customer added successfully" });
				} else {
					Snackbar({ message: "Error. Try again." });
				}
			})
				.catch(err => console.error(err));
	};

		const saveTraining = training => {
		fetch('https://customerrest.herokuapp.com/api/trainings', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(training)
		})

		.then(res => {
			fetchData();
			if (res.status >= 200 && res.status < 300) {
				Snackbar({ message: "Training added successfully" });
				} else {
				Snackbar({ message: "Error. Try again." });
				}
			})
			.catch(err => console.error(err));
	};

		const updateCustomer = (customer, link) => {
		fetch(link, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(customer)
		})
			.then(res => fetchData())
			.then(Snackbar({ message: "Customer updated successfully" }))
			.catch(err => console.error(err));
	};
	const defaultColDef={ sortable: true }
	const columnDefs = [
		{ headerName: 'Customers',
		  children: [
		 {
	  
			headerName: 'Edit',
			valueGetter: (params) => params.data.links[0].href,
			cellRenderer: (params) => <Editcustomer updateCustomer={updateCustomer} customer={params.data} />,
			sortable: false,
		  },
		  {
			headerName: 'First name',
			field: 'firstname',
			sortable: true,
			filter: true,
			floatingFilter: true
		  },
		  {
			headerName: 'Last name',
			field: 'lastname',
			sortable: true,
			filter: true,
			floatingFilter: true
		  },
		  {
			headerName: 'Email',
			field: 'email',
			sortable: true,
			filter: true,
			floatingFilter: true
		  },
		  {
			headerName: 'Phone',
			field: 'phone',
			sortable: true,
			filter: true,
			floatingFilter: true
		  },
		  {
			headerName: 'Address',
			field: 'streetaddress',
			sortable: true,
			filter: true,
			floatingFilter: true
		  },
		  {
			headerName: 'Postcode',
			field: 'postcode',
			sortable: true,
			filter: true,
			floatingFilter: true
		  },
		  
		  {
			headerName: 'City',
			field: 'city',
			sortable: true,
			filter: true,
			floatingFilter: true
		  },
		  
		  {
			headerName: 'Delete',
			valueGetter: (params) => params.data.links[0].href,
			cellRenderer: (params) => (
			  <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteCustomer(params.data.links[0].href)}
				Delete
				></DeleteIcon>
			),
			sortable: false,
		  },
		  {
			headerName: 'Add training',
			valueGetter: (params) => params.data.links[0].href,
			cellRenderer: (params) => (
			  <Addtraining 
				saveTraining={saveTraining}
				customerId={params.data.links[0].href}
			  />
			),
			sortable: false,
		  },
		]
	  }];

	return (
		
			      
	<div
    className="ag-theme-material"
    style={{
    height: '7000px',
    width: '95%',
	margin: 'auto'    }}
    >
			<Addcustomer saveCustomer={saveCustomer} />
			<AgGridReact
               rowData={customers}
               columnDefs={columnDefs}
               defaultColDef={defaultColDef}
			   options={{ sorting: true }}
           ></AgGridReact>
		</div>
	);
}