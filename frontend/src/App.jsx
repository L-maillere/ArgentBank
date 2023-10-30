import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginFromLocalStorage } from './features/authentification/authentification';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ExpiredTokenModal from './components/ExpiredTokenModal/ExpiredTokenModal';
import SignIn from './pages/SignIn/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';

function MainLayout() {
    const location = useLocation();
    const isDarkBackground = location.pathname === '/sign-in' || location.pathname === '/dashboard';
    const dispatch = useDispatch();
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            dispatch(loginFromLocalStorage());
        } else {
            dispatch({ type: 'authentification/setLoadingFalse'});
        }
    }, [dispatch]);

  return (
    <>
      <Header />
        <ExpiredTokenModal/>
        <main className={isDarkBackground ? 'main bg-dark' : 'main'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} /> 
          </Routes>
        </main>
      <Footer />
    </>
  );
}

export default function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <MainLayout />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
}
