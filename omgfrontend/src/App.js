import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Login from "./components/Login";
import eventBus from "./common/eventBus";
import Dasbor from "./pages/Dasbor";
import AuthService from "./Services/auth.services";

import UpdateStatusPengadaan from "./pages/UpdateStatusPengadaan";
import DetailProfil from "./pages/DetailProfil";

const PrivateRoute = ({ role, roles = [], ...props }) => {
  if (roles.includes(role)) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/Error401" />;
  }
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [role, setRole] = useState("");
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (user) {
      setCurrentUser(user);

      if (!role) {
        setRole(user.role);
      }
    }

    eventBus.on("logout", () => {
      logOut();
    });

    return () => {
      eventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <Routes>
      <Route path="/Error401" element={<Error401 />}></Route>
      <Route exact path="/" element={<Login />} />

      {currentUser ? (
        <>
          <Route
            path="/dasbor"
            element={
              <PrivateRoute
                role={role}
                roles={[
                  "Staff",
                  "Warehouse",
                  "Supervisor",
                  "Manajer",
                  "Purchaser",
                  "Admin",
                ]}
              >
                <Dasbor />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user"
            element={
              <PrivateRoute role={role} roles={["Admin"]}>
                <ManajemenUser />
              </PrivateRoute>
            }
          />

          
          <Route
            path="/pengadaan/detail/:id_pengadaan/update/status"
            element={
              <PrivateRoute
                role={role}
                roles={["Warehouse", "Admin", "Purchaser"]}
              >
                <UpdateStatusPengadaan />
              </PrivateRoute>
            }
          ></Route>

          <Route
              path="/detail/profile/:idKaryawan"
              element={
                <PrivateRoute
                    role={role}
                    roles={[
                      "Staff",
                      "Warehouse",
                      "Supervisor",
                      "Manajer",
                      "Purchaser",
                      "Admin",
                    ]}
                >
                  <DetailProfil />
                </PrivateRoute>
              }
          ></Route>
          </>
          ) : (
          <></>
          )}
    </Routes>
  );
};

export default App;

