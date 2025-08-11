import React from "react";
import AppTemplate from "../../components/app-template";
import PageNotFoundComponent from "../../components/errors-components/page-not-found";
import { t } from "i18next";

const PageNotFound = () => {

  return (
    <AppTemplate pageTitle={t("Page Not Found")}>
      <PageNotFoundComponent />
    </AppTemplate>
  );
};

export default PageNotFound;
