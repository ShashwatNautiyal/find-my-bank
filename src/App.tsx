import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import BankDetail from "./pages/BankDetail";
import Favourties from "./pages/Favourties";
import Home from "./pages/Home";

const App = () => {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Navigate to="/all-banks" />} />
				<Route path="/all-banks" element={<Home />} />
				<Route path="/favourites" element={<Favourties />} />
				<Route path="/bank-details/:ifsc" element={<BankDetail />} />
			</Routes>
		</div>
	);
};

export default App;
