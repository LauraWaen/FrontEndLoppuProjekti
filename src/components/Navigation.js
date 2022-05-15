import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<div>
			<nav
				className="navbar navbar-expand-lg navbar-dark"
				style={{ backgroundColor: "pink" }}
			>
				<Link className="navbar-brand" to="/">
					Personal Trainer
				</Link>
				<button
					className="navbar-toggler navbar-toggler-right"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav -item">
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
						<li className="nav -item">
							<Link className="nav-link" to="/customers">
								Customers
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/trainings">
								Trainings
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navigation;