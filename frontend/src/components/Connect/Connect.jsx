import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, fetchUserProfile } from "../../features/authentification/authentification";

function Connect () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(state => state.authentification.error);
    const [displayError, setDisplayError] = useState(false);
    const [errorCount, setErrorCount] = useState(0);


    const handleLogin = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(login({ email, password }));
        if (login.fulfilled.match(resultAction)) {
            if (rememberMe) {
                localStorage.setItem('authToken', resultAction.payload.token);
            }
            dispatch(fetchUserProfile());
            navigate('/dashboard');
        } else {
            setErrorCount(prevCount => prevCount + 1);
        }
    };

    useEffect(() => {
        let timer;
        if (error) {
            setDisplayError(true);
            timer = setTimeout(() => {
                setDisplayError(false);
            }, 4000);
        }

        return () => clearTimeout(timer);
    }, [error, errorCount]);

    return (
        <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    id="username" />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    id="password" />
            </div>
            <div className="input-remember">
                <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
            {displayError && <p className="error-message">{error}</p>}
        </form>
    </section>
    )
}

export default Connect