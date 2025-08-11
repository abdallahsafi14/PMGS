/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Footer from "./footer";
import SiteNavbar from "./navbar";
import { ChildrenContent, Styles } from "./styles";
import Sidebar from "./sidebar";

const AppTemplate = ({ pageTitle, navbar, footer, children, sidebar }) => {
  const appName = "PMGT";

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <HelmetProvider>
      <Styles>
        {pageTitle && (
          <Helmet>
            <title>{pageTitle + " | " + appName}</title>
          </Helmet>
        )}

        {sidebar && (
          <Sidebar
            isSidebarCollapsed={isSidebarCollapsed}
            toggleSidebar={toggleSidebar}
          />
        )}

        <div className="main-data">
          {navbar && <SiteNavbar isSidebarCollapsed={isSidebarCollapsed} />}
          <ChildrenContent
            style={{ marginLeft: !sidebar && "0" }}
            isSidebarCollapsed={isSidebarCollapsed}
          >
            {children}
          </ChildrenContent>
        </div>

        {footer && <Footer />}
      </Styles>
    </HelmetProvider>
  );
};

export default AppTemplate;
