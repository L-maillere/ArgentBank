import BankAccount from "../../components/BankAccount/BankAccount";
import HeaderDashboard from "../../components/HeaderDashboard/HeaderDashboard";

function Dashboard() {
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