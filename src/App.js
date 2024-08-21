import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "./config";
import Home from "./Page/Home";
import Campaign from "./Page/Campaign";

const App = () => {
	return (
			<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/campaign" element={<Campaign />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App