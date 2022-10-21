import React from "react";

const Dashboard = ({ user }) => {
	return (
		<div className="dashboard">
			<div className="dashboardWrapper">
				<div className="dashboardTop">
					<div className="dashboardLeftContainer">
						<img
							src={
								user.profilePic != ""
									? user.profilePic
									: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
							}
							alt="profile-img"
							className="dashboardImg"
						/>
					</div>
					<div className="dashboardRightContainer">
						<span className="dashboardWelcomeMessage">
							Welcome Back, {user.firstname} {user.lastname}
						</span>
						<span className="dashboardEmail">{user.email}</span>
					</div>
				</div>
				<div className="dashboardBottom">
					This is your profile insights📈 <br />
					<span>See more</span>↗️ about how the business💲 is going on.
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
