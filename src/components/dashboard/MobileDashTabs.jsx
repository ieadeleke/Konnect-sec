import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const { TabPane } = Tabs;

const MobileDashTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("nav1");

  useEffect(() => {

    switch (location.pathname) {
      case "/restaurant/dashboard":
        setActiveKey("nav1");
        break;
      case "/restaurant/delivery":
        setActiveKey("nav2");
        break;
      case "/restaurant/menu":
        setActiveKey("nav3");
        break;
      case "/restaurant/profile":
        setActiveKey("nav4");
        break;
      case "/contact":
        setActiveKey("nav5");
        break;
      default:
        setActiveKey("nav1"); 
        break;
    }
  }, [location.pathname]);

  const handleTabChange = (key) => {
    setActiveKey(key);
    switch (key) {
      case "nav1":
        navigate("/restaurant/dashboard");
        break;
      case "nav2":
        navigate("/restaurant/delivery");
        break;
      case "nav3":
        navigate("/restaurant/menu");
        break;
      case "nav4":
        navigate("/restaurant/profile");
        break;
      case "nav5":
        navigate("/contact");
        break;
      default:
        break;
    }
  };

  return (
    <div className="hidden max-[720px]:block">
      <Tabs
        activeKey={activeKey}
        onChange={handleTabChange}
        tabPosition="top"
        style={{ overflowX: "auto" }}
      >
        <TabPane
          tab={
            <>
              <ion-icon class="" name="wallet-outline"></ion-icon>{" "}
              Dashboard
            </>
          }
          key="nav1"
        />

        <TabPane
          tab={
            <>
              <ion-icon class="" name="people-outline"></ion-icon>{" "}
              My Menu
            </>
          }
          key="nav3"
        />
        <TabPane
          tab={
            <>
              <ion-icon class="" name="card-outline"></ion-icon> My
              Profile
            </>
          }
          key="nav4"
        />
        <TabPane
          tab={
            <>
              <ion-icon class="" name="person-outline"></ion-icon>{" "}
              Support
            </>
          }
          key="nav5"
        />
      </Tabs>
    </div>
  );
};

export default MobileDashTabs;
