import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "./config";

import Login from "./Auth/Login";
import Dashboard from "./User/Dashboard";
import Contact from "./User/Contact";
import Group from "./User/Group";
import Upgrade from "./User/Upgrade";
import Message from "./User/Message";
import MessageCreate from "./User/Message/Create";
import Devices from "./User/Devices";
import { SidebarProvider } from "./Providers/SidebarProvider";
import HistoryDetail from "./User/Message/Detail";
import UserMiddleware from "./middleware/User";
import Logout from "./User/Logout";
import AdminRouter from "./Admin";
import Purchase from "./User/Purchase";
import Onboarding from "./User/Onboarding";
import Account from "./User/Account";
import Tes from "./User/Tes";
import Sync from "./User/Sync";

const App = () => {
	return (
		<SidebarProvider>
			<BrowserRouter>
			<Routes>
				{/* AUTH AREA */}
				<Route path="/" element={<GoogleOAuthProvider clientId={config.google_client_id}><Login /></GoogleOAuthProvider>} />
				<Route path="/login" element={<GoogleOAuthProvider clientId={config.google_client_id}><Login /></GoogleOAuthProvider>} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/onboarding" element={<Onboarding />} />
				<Route path="/sync/:deviceID" element={<UserMiddleware><Sync /></UserMiddleware>} />
				<Route path="/tes" element={<Tes />} />

				<Route path="/dashboard" element={<UserMiddleware><Dashboard /></UserMiddleware>} />
				<Route path="/message" element={<UserMiddleware><Message /></UserMiddleware>} />
				<Route path="/account" element={<UserMiddleware><Account /></UserMiddleware>} />
				<Route path="/message/create" element={<MessageCreate />} />

				<Route path="/devices" element={<UserMiddleware><Devices /></UserMiddleware>} />
				<Route path="/contact" element={<UserMiddleware><Contact /></UserMiddleware>} />
				<Route path="/group/:id" element={<UserMiddleware><Group /></UserMiddleware>} />
				<Route path="/history" element={<UserMiddleware><Message /></UserMiddleware>} />
				<Route path="/history/:id/detail" element={<UserMiddleware><HistoryDetail /></UserMiddleware>} />
				
				<Route path="/upgrade" element={<UserMiddleware><Upgrade /></UserMiddleware>} />
				<Route path="/purchase" element={<UserMiddleware><Purchase /></UserMiddleware>} />
			</Routes>

			<AdminRouter />
		</BrowserRouter>
		</SidebarProvider>
	)
}

export default App