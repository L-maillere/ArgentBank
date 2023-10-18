import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function ExpiredTokenModal({ onClose }) {
    const [show, setShow] = useState(false);
    const error = useSelector(state => state.authentification.error);
    const location = useLocation();

    useEffect(() => {
        if (error === "Session expired. Please login again.") {
            setShow(true);
        } 
    }, [error]);

    useEffect(() => {
        if (location.pathname === '/sign-in') {
            setShow(false);
        }
    }, [location.pathname]);

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal" onClick={() => setShow(false)}>×</button>
                <h2>Session Expired</h2>
                <p>Your session has expired. Please login again.</p>
                <Link to="/sign-in" className="btn-login">Sign In</Link>
            </div>
        </div>
    );
}

export default ExpiredTokenModal;