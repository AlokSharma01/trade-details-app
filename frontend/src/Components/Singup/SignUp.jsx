import React from "react";
import styles from "./SignUp.module.css";
import { useState } from "react";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";

export const SignUp = () => {

	const [data, setData] = useState({

		name:"",
		email:"",
		password:""
	})
	const [error, setError] = useState("")
	const navigate = useNavigate()
	const handleChange=(e)=>{

		setData({...data,[e.currentTarget.name]:e.currentTarget.value})
		
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8000/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	// const handleImage=(e)=>{

    //     const file = e.target.files[0];

	// 	console.log(file)

    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         console.log(reader.result);
           
    //     };

	// 	reader.readAsDataURL(file);
	// }	
	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome </h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>

				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create New Account</h1>
						<input
							type="text"
							placeholder="Name"
							name="name"
							value={data.name}
							onChange={handleChange}
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							value={data.email}
							onChange={handleChange}
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={data.password}
							onChange={handleChange}
							className={styles.input}
						/>
						{/* <label >Choose a profile picture:</label>
						<input
							type="file"
							name="avatar"
							accept="image/png, image/jpeg"
							onChange={handleImage}
							className={styles.input}
						/> */}
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};


