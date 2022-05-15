import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import Snackbar from '@material-ui/core/Snackbar';
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Traininglist() {
	const [trainings, setTrainings] = useState([]);

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch('https://customerrest.herokuapp.com/gettrainings')
			.then(response => response.json())
			.then(data => setTrainings(data));
	};

	const deleteTraining = id => {
		if (window.confirm("Are you sure to delete?")) {
			console.log('https://customerrest.herokuapp.com/api/trainings/' + id);
			fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {
				method: "DELETE"
			})
				.then(res => {
					fetchData();
					if (res.status >= 200 && res.status < 300) {
						Snackbar({ message: "Training deleted successfully!" });
					} else {
						Snackbar({ message: "Error. Try again." });
					}
				})
				.catch(err => console.error(err));
		}
	};
	const defaultColDef={ sortable: true }

	const columnDefs = [
		{ headerName: 'Training',
		  children: [
	
	
		{
			title: "Date",
			field: "date",
			sortable: true,
			filter: true,
			floatingFilter: true,
			render: rowdate => (
				<Moment format="DD/MM/YYYY HH:mm">{rowdate.date}</Moment>
			)
		},

		{
			headerName: "Duration (minutes)",
			field: "duration",
			sortable: true,
			filter: true,
			floatingFilter: true
			
		},

		{
			headerName: "Activity",
			field: "activity",
			sortable: true,
			filter: true,
			floatingFilter: true
		},

		{
			headerName: "Customer",
			field: "customer.firstname, customer.lastname",
			sortable: true,
			filter: true,
			floatingFilter: true,
			render: row => (
				<span>{row.customer.firstname + " " + row.customer.lastname}</span>
			)
		},
		{
			render: rowData => (

				<button
					style={{ cursor: "pointer" }}
					onClick={() => deleteTraining(rowData.id)}
				>Delete</button>
			),
				sorting: false
		},
	]
  }];

	return (
		
	<div
    className="ag-theme-material"
    style={{
    height: '1000px',
    width: '1000px',
	margin: 'auto'    }}
    >
	   <AgGridReact
		 rowData={trainings}
		 columnDefs={columnDefs}
		 defaultColDef={defaultColDef}
	   ></AgGridReact>
	 </div>
	);
}

