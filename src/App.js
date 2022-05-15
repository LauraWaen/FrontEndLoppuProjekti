import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navigation from ".//components/Navigation";
import Home from ".//components/Home";
import Customerlist from ".//components/Customerlist";
import Traininglist from ".//components/Traininglist";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<div>
			<BrowserRouter>
				<div className="App">
					<Navigation />
					<Routes>
						<Route exact path="/" element={<Home/>} />
						<Route path="/customers" element={<Customerlist/>} exact/>
						<Route path="/trainings" element={<Traininglist/>} exact/>
		
						<Route render={() => <h1>Page not found</h1>} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;