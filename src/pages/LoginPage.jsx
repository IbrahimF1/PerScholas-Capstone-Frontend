import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import "./LoginPage.css";

export default function LoginPage() {
    const { setToken, setUser } = useContext(AuthContext);
    const nav = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (isLogin) {
                // Login Request
                let res = await axios.post("http://localhost:3000/auth/login", {
                    email: formData.email,
                    password: formData.password
                });
                setToken(res.data.token);

                // Fetch User Profile
                let userRes = await axios.get(`http://localhost:3000/user/profile/${res.data.user_id}`);
                setUser(userRes.data);
                nav("/problems");

            } else {
                // Register Request
                await axios.post("http://localhost:3000/user/profile", formData);
                alert("Registration Successful! Please log in.");
                setIsLogin(true);
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "An error occurred");
        }
    }

    return (
        <fieldset className="login-container">
            <legend>{isLogin ? "Login" : "Register"}</legend>
            <form className="login-form" onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <label>
                            Username:
                            <br />
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required={!isLogin}
                            />
                        </label>
                        <br /><br />
                    </  >
                )}
                <label>
                    Email:
                    <br />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br /><br />
                <label>
                    Password:
                    <br />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br /><br />
                <button type="submit">{isLogin ? "Login" : "Register"}</button>
            </form>
            <br />
            <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
                {isLogin ? "Need an account? Register" : "Have an account? Login"}
            </button>
        </fieldset>
    );
}