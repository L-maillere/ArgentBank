import BankAccount from "../../components/BankAccount/BankAccount";
import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.authentification.isLoggedIn);
  const isLoading = useSelector(state => state.authentification.isLoading);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
        navigate('/sign-in');
    } 
}, [isLoggedIn, isLoading, navigate]);
  
  return (
    <>
      <HeaderDashboard />
      <BankAccount
        title="Argent Bank Checking (x8349)" 
        amount="$2,082.79" 
        description="Available Balance"
      />
      <BankAccount
        title="Argent Bank Savings (x6712)" 
        amount="$10,928.42" 
        description="Available Balance"
      />
      <BankAccount
        title="Argent Bank Credit Card (x8349)" 
        amount="$184.30" 
        description="Current Balance"
      />
    </>
  );
}

export default Dashboard;