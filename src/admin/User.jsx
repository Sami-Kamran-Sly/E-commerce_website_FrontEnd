import React from "react";
import Layout from "../components/Layout";
import AdminMenu from "../layout/AdminMenu";
// components/layout/AdminMenu

function Users() {
  return (
    <Layout title={"DashBoard Create Users"}>
      <div className="container-fluid mt-5 pt-4 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>All User</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
