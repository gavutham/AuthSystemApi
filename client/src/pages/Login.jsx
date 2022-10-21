import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState(false);
	const google = () => {
		window.location.replace(
			"https://auth-system-skill-test.herokuapp.com/google/"
		);
	};
	const facebook = () => {
		window.location.replace(
			"https://auth-system-skill-test.herokuapp.com/facebook/"
		);
	};
	const handleSubmit = async () => {
		try {
			setError(false);
			const body = {
				email: emailRef.current.value,
				password: passwordRef.current.value,
			};
			console.log(body);
			const res = await axios.get(
				"https://auth-system-skill-test.herokuapp.com/v1/login",
				{
					params: body,
				}
			);
			setUser(res.data);
		} catch (err) {
			console.log(err);
			setError(true);
		}
	};
	return (
		<div className="login">
			<h1 className="loginTitle">Choose a Login Method</h1>
			<div className="loginWrapper">
				<div className="loginLeft">
					<div className="loginButton google" onClick={google}>
						<i className="fa-brands fa-google icon"></i> Google
					</div>
					<div className="loginButton facebook" onClick={facebook}>
						<i className="fa-brands fa-facebook-f icon"></i> Facebook
					</div>
				</div>
				<div className="loginCenter">
					<div className="line" />
					<div className="or">OR</div>
				</div>
				<div className="loginRight">
					<input type="email" placeholder="Enter your Email" ref={emailRef} />
					<input
						type="password"
						placeholder="Enter your Password"
						ref={passwordRef}
					/>
					{error && (
						<span style={{ color: "crimson", marginBottom: "15px" }}>
							Something went wrong.Try again
						</span>
					)}
					<button className="submit" onClick={handleSubmit}>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
