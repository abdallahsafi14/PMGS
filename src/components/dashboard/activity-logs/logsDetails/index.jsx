import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LogContainer,
  LogTitle,
  InfoRow,
  Label,
  Value,
  Section,
  BackButton,
  Divider,
  Badge,
} from "./styles";
import AppTemplate from "../../../app-template";
import { selectActivityLogs } from "../../../../store/activity-logs/activitySlice";
import { fetchActivityLogs } from "../../../../store/activity-logs/action/activityActions";

const ActivityLogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActivityLogs({ page: 1, perPage: 10 }));
  }, [dispatch]);

  const logs = useSelector(selectActivityLogs);
  const log = logs.find((log) => log.id === Number(id));

  if (!log) return <div className="p-4">Loading activity log...</div>;

  const renderSubjectField = (field) => log.subject?.[field] ?? "N/A";

  return (
    <AppTemplate pageTitle="Activity Log Details" navbar sidebar>
      <LogContainer>
        <BackButton onClick={() => navigate(-1)}>
          ← Back to Activity Logs
        </BackButton>

        <LogTitle>Log Entry #{log.id}</LogTitle>

        <Section>
          <Divider>Metadata</Divider>
          <InfoRow>
            <Label>Description:</Label>
            <Value>{log.description}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Event:</Label>
            <Badge>{log.event}</Badge>
          </InfoRow>
          <InfoRow>
            <Label>Model:</Label>
            <Value>{log.subject_type?.split("\\").pop() || "N/A"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Model ID:</Label>
            <Value>{log.subject_id}</Value>
          </InfoRow>
          <InfoRow>
            <Label>Causer:</Label>
            <Badge>{log.causer?.name || "System"}</Badge>
          </InfoRow>
          <InfoRow>
            <Label>Timestamp:</Label>
            <Value>{new Date(log.created_at).toLocaleString()}</Value>
          </InfoRow>
        </Section>

        {log.subject && (
          <Section>
            <Divider>Subject Details</Divider>
            <InfoRow>
              <Label>Title:</Label>
              <Value>{renderSubjectField("title")}</Value>
            </InfoRow>
            <InfoRow>
              <Label>Status:</Label>
              <Badge>{renderSubjectField("status")}</Badge>
            </InfoRow>
            <InfoRow>
              <Label>Priority:</Label>
              <Badge>{renderSubjectField("priority")}</Badge>
            </InfoRow>
            <InfoRow>
              <Label>Due Date:</Label>
              <Value>{renderSubjectField("due_date")}</Value>
            </InfoRow>
          </Section>
        )}
      </LogContainer>
    </AppTemplate>
  );
};

export default ActivityLogDetails;
