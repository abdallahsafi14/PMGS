import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppTemplate from "../../app-template";
import CustomDataTable from "../../../utils/custom-data-table";
import { Styles } from "./styles";
import { getRoles } from "../../../store/roles/action/rolesActions";
import CustomModal from "../../../utils/custom-modal/CustomModal";
import { Button } from "react-bootstrap";
import { FaEye, FaTrashAlt } from "react-icons/fa";

const RolesPage = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles.roles);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'view' | 'delete'
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  const handleView = (role) => {
    setModalType("view");
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleDelete = (role) => {
    setModalType("delete");
    setSelectedRole(role);
    setShowModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting:", selectedRole);
    setShowModal(false);
    // dispatch(deleteRole(selectedRole.id))
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRole(null);
    setModalType(null);
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Role Name",
      selector: (row) => row.name,
      isFilterable: true,
    },
    {
      name: "Permissions",
      selector: (row) => row.permissions?.map((p) => p.name).join(", ") || "—",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="action-btn"
            title="View"
            onClick={() => handleView(row)}
          >
            <FaEye />
          </button>
          <button
            className="action-btn"
            title="Delete"
            onClick={() => handleDelete(row)}
          >
            <FaTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  const totalPages = Math.ceil(roles.length / perPage);
  const getCurrentPageData = () => {
    const start = currentPage * perPage;
    return roles.slice(start, start + perPage);
  };

  return (
    <AppTemplate pageTitle="Roles Management" navbar sidebar footer>
      <Styles>
        <CustomDataTable
          title="Roles"
          data={getCurrentPageData()}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          onPerPageChange={setPerPage}
          perPage={perPage}
          onApplyFilter={({ columnKey, value }) => {
            console.log(columnKey, value);
          }}
        />

        <CustomModal
          show={showModal}
          onHide={closeModal}
          title={modalType === "view" ? "Role Details" : "Confirm Delete"}
          bodyContent={
            modalType === "view" ? (
              <div>
                <p style={{ textAlign: "start" }}>
                  <strong>ID:</strong> {selectedRole?.id}
                </p>
                <p style={{ textAlign: "start" }}>
                  <strong>Name:</strong> {selectedRole?.name}
                </p>
                <p style={{ textAlign: "start" }}>
                  <strong>Permissions:</strong>
                </p>
                <ul
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {selectedRole?.permissions?.map((p) => (
                    <li
                      key={p.id}
                      style={{ textAlign: "start", width: "fit-content" }}
                    >
                      {p.name}
                    </li>
                  )) || <li>No Permissions</li>}
                </ul>
              </div>
            ) : (
              <p>
                Are you sure you want to delete role{" "}
                <strong>{selectedRole?.name}</strong>?
              </p>
            )
          }
          footerContent={
            modalType === "delete" && (
              <Button variant="danger" onClick={confirmDelete}>
                Confirm Delete
              </Button>
            )
          }
          headerBg={modalType === "delete" ? "#dc3545" : "#007bff"}
          headerColor="white"
          bodyBg="#f8f9fa"
          footerBg="#f1f1f1"
          buttonProps={{
            bgColor: "#6c757d",
            textColor: "white",
            hoverColor: "#5a6268",
          }}
        />
      </Styles>
    </AppTemplate>
  );
};

export default RolesPage;
