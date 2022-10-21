import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
	return (
		<div className="home">
			<div className="homeWrapper">
				<h1 className="homepageTitle">
					Welcome the the Auth System🔐 project.
				</h1>
				<h3 className="homepageMessage">
					Get into the{" "}
					<Link to={"/dashboard"} className="link">
						<span>Dashboard</span>
					</Link>{" "}
					to have a 👁️glance👁️ at the insights.
				</h3>
			</div>
		</div>
	);
};

export default Home;
