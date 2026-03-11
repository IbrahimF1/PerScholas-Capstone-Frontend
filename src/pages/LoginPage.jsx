import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import StarryBackground from "../components/StarryBackground.jsx";
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
                let res = await axios.post("http://localhost:3000/auth/login", {
                    email: formData.email,
                    password: formData.password
                });
                setToken(res.data.token);

                let userRes = await axios.get(`http://localhost:3000/user/profile/${res.data.user_id}`);
                setUser(userRes.data);
                nav("/problems");

            } else {
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
        <div className="login-page-wrapper">
            <StarryBackground />
            
            <div className="login-card">
                <div className="login-header">
                    <h2>{isLogin ? "Welcome back" : "Create an account"}</h2>
                    <p>{isLogin ? "Enter your details to sign in" : "Start your coding journey today"}</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required={!isLogin}
                                placeholder="johndoe"
                            />
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="primary-btn">
                        {isLogin ? "Sign In" : "Register"}
                    </button>
                </form>

                <div className="login-footer">
                    <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
                    <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
                        {isLogin ? "Sign up" : "Log in"}
                    </button>
                </div>
            </div>
        </div>
    );
}