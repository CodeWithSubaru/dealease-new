import { GlobalStyles } from "./GlobalStyle.style";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader } from "./Components/Loader/Loader";
import { NotFound } from "./Pages/NotFound";

import { Login } from "./Pages/Auth/Login";
import { LoginSeller } from "./Pages/Auth/LoginSeller";
import { LoginAdmin } from "./Pages/Auth/LoginAdmin";

// Buyer Components
import { Home } from "./Pages/Buyer/Home";
import { Message } from "./Pages/Buyer/Message";
import { AuthBuyerLayout } from "./Layouts/AuthBuyerLayout";

// Seller Components
import { HomeSeller } from "./Pages/Seller/Home";
import { AuthSellerLayout } from "./Layouts/AuthSellerLayout";

// Admin Components
import { Dashboard } from "./Pages/Admin/Dashboard";
import { MessageAdmin } from "./Pages/Admin/Message";
import { AuthAdminLayout } from "./Layouts/AuthAdminLayout";
// solla
import { Mainpage } from "./Pages";
// ramos
import { Test } from "./Components/Header/Header";

import { GuestLayout } from "./Layouts/GuestLayout";
import { Register } from "./Pages/Auth/Register";
import { RegisterExist } from "./Pages/Auth/RegisterExist";
import useAuthContext from "./Hooks/Context/AuthContext";

function App() {
  const { loading, user } = useAuthContext();

  if (loading && !user) {
    return <Loader visibility={loading}></Loader>;
  }

  return (
    <>
      <div>
        <GlobalStyles />
        {/* Buyer Route */}
        <Routes>
          <Route element={<AuthBuyerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/message" element={<Message />} />
          </Route>

          {/* Seller Route */}
          <Route element={<AuthSellerLayout />}>
            <Route path="/seller/home" element={<HomeSeller />} />
          </Route>

          {/* Admin Route */}
          <Route element={<AuthAdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/message" element={<MessageAdmin />} />
          </Route>

          <Route element={<GuestLayout />}>
            {/*Solla */}
            <Route path="/Dealease" element={<Mainpage />} />
            {/*  */}
            <Route path="/login" element={<Login />} />
            <Route path="/seller/login" element={<LoginSeller />} />
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-exist" element={<RegisterExist />} />
            <Route path="/test" element={<Test />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
