import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppTemplate from "../../app-template";
import CustomDataTable from "../../../utils/custom-data-table";
import { Styles } from "./styles";

const PermissionsPage = () => {
  const permissions = useSelector((state) => state.permissions.permissions);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      isFilterable: true,
    },
    {
      name: "Guard Name",
      selector: (row) => row.guard_name || "web",
    },
  ];

  const totalPages = Math.ceil(permissions.length / perPage);
  const getCurrentPageData = () => {
    const start = currentPage * perPage;
    return permissions.slice(start, start + perPage);
  };

  return (
    <AppTemplate pageTitle="Permissions Management" navbar sidebar>
      <Styles>
        <CustomDataTable
          title="Permissions"
          data={getCurrentPageData()}
          columns={columns}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          onPerPageChange={setPerPage}
          perPage={perPage}
          onApplyFilter={() => {}}
        />
      </Styles>
    </AppTemplate>
  );
};

export default PermissionsPage;
