// src/pages/notifications/index.jsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import AppTemplate from "../../app-template";
import { Badge, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import echo from "../../../services/echo";
// IMPORTANT: Import your echo instance, don't create a new one

const Container = styled.div`
  padding: 20px;
`;

const NotificationItem = styled.div`
  background-color: ${({ read, theme }) =>
    read ? theme.primary : theme.hover};
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.3s;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMedium};
  }
`;

const NotificationContent = styled.div`
  flex-grow: 1;
  padding-right: 10px;
`;

const Title = styled.h5`
  margin: 0;
`;

const Details = styled.p`
  margin: 5px 0;
  font-size: 0.9em;
  .type-badge {
    background-color: ${({ theme }) => theme.active} !important;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // DEBUG: Check the echo configuration
    console.log("Echo auth endpoint:", echo.connector.options.authEndpoint);

    const channel = echo.private("notifications");

    const handleNewNotification = (event) => {
      console.log("Notification received:", event);
      setNotifications((prev) => [
        {
          id: Date.now(),
          title: event.title,
          related: event.related,
          type: event.type,
          date: new Date().toLocaleDateString(),
          read: false,
        },
        ...prev,
      ]);
    };

    channel.listen("NewNotification", handleNewNotification);

    return () => {
      channel.stopListening("NewNotification", handleNewNotification);
      echo.leave("notifications");
    };
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <AppTemplate
      pageTitle="Notifications"
      navbar
      sidebar
      SEOPageName="Notifications"
    >
      <Container>
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} read={notif.read}>
            <NotificationContent>
              <Title>{notif.title}</Title>
              <Details>
                Type: <Badge className="type-badge">{notif.type}</Badge> |
                Related to: {notif.related} | Date: {notif.date}
              </Details>
            </NotificationContent>
            <ActionButtons>
              {!notif.read && (
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => markAsRead(notif.id)}
                >
                  Mark as Read
                </Button>
              )}
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteNotification(notif.id)}
              >
                <FaTrash />
              </Button>
            </ActionButtons>
          </NotificationItem>
        ))}
        {notifications.length === 0 && <p>No notifications to display.</p>}
      </Container>
    </AppTemplate>
  );
}

export default NotificationsPage;
