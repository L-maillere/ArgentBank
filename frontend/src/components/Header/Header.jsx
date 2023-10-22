import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HeaderLogo from '../../assets/argentBankLogo.webp';
import { logout } from '../../features/authentification/authentification';

function Header () {
    const isLoggedIn = useSelector(state => state.authentification.isLoggedIn);
    const userName = useSelector(state => state.authentification.userInfo?.userName);
    const dispatch = useDispatch();


    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={HeaderLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div className="main-nav-button">
                {isLoggedIn ? (
                <>
                    <Link to="/dashboard" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        {userName}
                    </Link>
                    <Link 
                    onClick={() => dispatch(logout())}
                    to="/" className="main-nav-item">
                        <i className="fa fa-sign-out"></i>
                        Sign Out
                    </Link>
                </>
                ) : (
                <Link to="/sign-in" className="main-nav-item">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
                )}
            </div>
      </nav>
    )
}

export default Header;