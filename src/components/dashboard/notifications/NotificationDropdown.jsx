import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import echo from "../../../services/echo";
// IMPORTANT: Import your existing echo instance instead of creating a new one

const DropdownContainer = styled.div`
  position: relative;
`;

const BellButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  color: ${({ theme }) => theme.text};
  position: relative;
  cursor: pointer;
  padding: 0 5px;
  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
  &::after {
    content: "${({ count }) => (count > 0 ? count : "")}";
    position: absolute;
    top: -0px;
    right: -3px;
    height: 20px;
    width: 20px;
    background-color: red;
    color: white;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 50%;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  right: 0;
  top: 120%;
  background: ${({ theme }) => theme.background};
  border-radius: 15px;
  width: 250px;
  padding: 0;
  list-style: none;
  z-index: 999;
  box-shadow: ${({ theme }) => theme.shadowMedium};
`;

const NotificationItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;

const ViewAllButton = styled.li`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.textOnSecondary};
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  &:hover {
    background: ${({ theme }) => theme.hover};
  }
`;

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const channel = echo.private("notifications");

    const handleNewNotification = (event) => {
      setNotifications((prev) => [
        {
          id: Date.now(),
          title: event.title,
          time: new Date().toLocaleTimeString(),
          read: false,
        },
        ...prev,
      ]);
    };

    channel.listen("NewNotification", handleNewNotification);

    return () => {
      // Clean up properly
      channel.stopListening("NewNotification", handleNewNotification);
      // Don't call echo.leave() here since other components might be using the same channel
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <DropdownContainer>
      <BellButton onClick={toggleDropdown} count={unreadCount}>
        <FiBell />
      </BellButton>

      {isOpen && (
        <DropdownList>
          {notifications.length > 0 ? (
            notifications.slice(0, 3).map((n) => (
              <NotificationItem key={n.id} read={n.read}>
                <strong>{n.title}</strong>
                <br />
                <small>{n.time}</small>
              </NotificationItem>
            ))
          ) : (
            <NotificationItem>
              <small>No new notifications</small>
            </NotificationItem>
          )}
          <ViewAllButton onClick={() => navigate("/notifications")}>
            View All
          </ViewAllButton>
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default NotificationDropdown;
