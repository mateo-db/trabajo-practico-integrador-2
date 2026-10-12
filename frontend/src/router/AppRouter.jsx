import { BrowserRouter, Routes, Route } from "react-router";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { HomePage } from "../pages/HomePage";
import { ProtectedRoute } from "./ProtectedRoutes";
import { PublicRoute } from "./PublicRoutes";
import { NonRoute } from "./NonRoutes";


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<HomePage />}/>  
                </Route>
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage />}/>
                </Route>
                <Route path="*" element={<NonRoute />} />
            </Routes>
        </BrowserRouter>
    )
}
