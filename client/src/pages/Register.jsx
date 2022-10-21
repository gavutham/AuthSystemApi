import React from "react";
import { useRef } from "react";
import { useState } from "react";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";

const Register = ({ setUser }) => {
	const [file, setFile] = useState(null);
	const fnameRef = useRef();
	const lnameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const [isFetching, setFetching] = useState(false);
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

	const handleSubmit = () => {
		const signup = async (user) => {
			try {
				const newUser = await axios.post(
					"https://auth-system-skill-test.herokuapp.com/v1/signup",
					user
				);
				setUser(newUser.data);
			} catch (err) {
				setError(true);
			}
		};
		setError(false);
		setFetching(true);
		if (file) {
			const fileName = new Date().getTime() + file.name;
			const storage = getStorage(app);
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
					}
				},
				(error) => {
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						const user = {
							email: emailRef.current.value,
							password: passwordRef.current.value,
							firstname: fnameRef.current.value,
							lastname: lnameRef.current.value,
							profilePic: downloadURL,
						};
						signup(user);
					});
				}
			);
		} else {
			const user = {
				email: emailRef.current.value,
				password: passwordRef.current.value,
				firstname: fnameRef.current.value,
				lastname: lnameRef.current.value,
			};
			signup(user);
		}
	};

	return (
		<div className={"login " + (isFetching && " disabledpage")}>
			<h1 className="loginTitle">Choose an option to Register</h1>
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
					<div className="profileInputContainer">
						<img
							src={
								file
									? URL.createObjectURL(file)
									: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
							}
							alt=""
							className="profileImg"
						/>
						<label htmlFor="file">
							<i className="fa-solid fa-plus"></i>Upload your photo
						</label>
						<input
							className="profileInput"
							type="file"
							id="file"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</div>

					<input
						type="text"
						placeholder="Enter your First Name"
						ref={fnameRef}
					/>
					<input
						type="text"
						placeholder="Enter your Last Name"
						ref={lnameRef}
					/>
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
					<button
						className="submit"
						disabled={isFetching}
						onClick={handleSubmit}
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
};

export default Register;
