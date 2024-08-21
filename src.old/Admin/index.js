import { Route, Routes } from "react-router-dom"
import Dashboard from "./Dashboard";
import Contact from "./Contact";
import User from "./User";
import UserDetail from "./UserDetail";
import AdminMiddleware from "../middleware/Admin";
import Login from "./Login";
import Admin from "./Admin";
import Logout from "./Logout";
import Purchase from "./Purchase";
import History from "./History";
import HistoryDetail from "./HistoryDetail";

const AdminRouter = () => {
    return (
        <Routes>
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/logout" element={<Logout />} />
            <Route path="/admin/dashboard" element={<AdminMiddleware><Dashboard /></AdminMiddleware>} />
            <Route path="/admin/user" element={<AdminMiddleware><User /></AdminMiddleware>} />
            <Route path="/admin/user/:id/detail" element={<AdminMiddleware><UserDetail /></AdminMiddleware>} />
            <Route path="/admin/contact" element={<AdminMiddleware><Contact /></AdminMiddleware>} />
            <Route path="/admin/purchase" element={<AdminMiddleware><Purchase /></AdminMiddleware>} />
            <Route path="/admin/history" element={<AdminMiddleware><History /></AdminMiddleware>} />
            <Route path="/admin/history/:id/detail" element={<AdminMiddleware><HistoryDetail /></AdminMiddleware>} />
            <Route path="/admin/admin" element={<AdminMiddleware><Admin /></AdminMiddleware>} />
        </Routes>
    ) 
}

export default AdminRouter;