import React, { useEffect, useState } from "react";
import AppTemplate from "../../app-template";
import CustomDataTable from "../../../utils/custom-data-table";
import { useNavigate } from "react-router-dom";
import PathConstants from "../../../routes/pathConstants";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUsers } from "../../../store/users/usersSlice";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../store/users/action/usersActions";

const UsersContainer = styled.div`
  padding: 20px;
`;

function UsersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxUsers = useSelector(selectUsers);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (reduxUsers && reduxUsers.length > 0) {
      setUsers(reduxUsers);
    }
  }, [reduxUsers]);

  console.log("Redux users:", reduxUsers);
  console.log("Local users state:", users);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      isFilterable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      isFilterable: true,
    },
    {
      name: "Role",
      selector: (row) => row.roles?.[0]?.name || "No Role",
      isFilterable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.email_verified_at ? "Verified" : "Unverified"),
    },
    {
      name: "Created",
      selector: (row) => new Date(row.created_at).toLocaleDateString(),
    },
  ];

  const handleView = (user) =>
    navigate(`/users/${user.id}`, { state: { user } });

  const handleEdit = (user) =>
    navigate(`/users/edit/${user.id}`, { state: { user } });

  const handleDelete = (user) => {
    if (window.confirm(`Delete ${user.name}?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      // You might also want to dispatch a delete action here
      // dispatch(deleteUser(user.id));
    }
  };

  return (
    <AppTemplate pageTitle="User Management" navbar sidebar SEOPageName="Users">
      <UsersContainer>
        <CustomDataTable
          title="Manage Users"
          data={users}
          columns={columns}
          renderActions
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          Add
          Link={PathConstants.CreateUser}
          LinkToEdit="/users/edit"
          currentPage={0}
          totalPages={1}
          onPageChange={() => {}}
          onPerPageChange={() => {}}
          perPage={10}
          onApplyFilter={() => {}}
        />
      </UsersContainer>
    </AppTemplate>
  );
}

export default UsersPage;
