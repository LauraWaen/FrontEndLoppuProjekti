import React from "react";
import Home from "./Home";
import Customerlist from "./components/Customerlist";
import Traininglist from "./components/Traininglist";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Etusivu = () => {
	return (
		<div className="container py-5">
			<center><h1>Welcome to Personal Trainer page!</h1></center>
			<p>
				<div>
			<BrowserRouter>
			<center>
            <Link to="/">Home</Link>{' '}
            <Link to="/components/Customerlist">Customers</Link>{' '} 
			<Link to="/components/Traininglist">Trainings</Link>{' '} </center>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/components/Customerlist" element={<Customerlist />} />
						<Route exact path="/component/Traininglist" element={<Traininglist />} />
					</Routes>
			</BrowserRouter>
		</div>
			</p>
		</div>
	);
};

export default Etusivu;