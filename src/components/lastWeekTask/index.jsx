import React, { useState } from "react";
import { IoIosDocument } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

import {
  WeekContainer,
  WeekHeader,
  ItemList,
  Item,
  CheckboxContainer,
  Checkbox,
  Content,
  Title,
  Tag,
  Description,
  Icon,
  MetaInfo,
  Status,
  Avatar,
  LoadMoreButton,
} from "./styles";

const activityData = [
  {
    id: 1,
    title: "Atlassian Intelligence: How to work smarter with AI",
    tag: "LEARNJIRA-3",
    description: "(Learn) Jira Premium benefits in 5 min",
    icon: "👍",
    checked: true,
    status: "Created",
  },
  {
    id: 2,
    title: "Plans: How to use detailed roadmaps to plan out your work",
    tag: "LEARNJIRA-2",
    description: "(Learn) Jira Premium benefits in 5 min",
    icon: "📊",
    checked: true,
    status: "Created",
  },
  {
    id: 3,
    title:
      "Security & permissions: How to control who can edit or or manage projects",
    tag: "LEARNJIRA-1",
    description: "(Learn) Jira Premium benefits in 5 min",
    icon: "🔐",
    checked: true,
    status: "Created",
  },
];

const LastWeekActivity = () => {
  const [activities, setActivities] = useState(activityData);

  const toggleCheckbox = (id) => {
    setActivities(
      activities.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const loadMoreActivities = () => {
    console.log("Loading more activities...");
  };

  return (
    <>
      <WeekContainer>
        <WeekHeader>IN THE LAST WEEK</WeekHeader>

        <ItemList>
          {activities.map((activity) => (
            <Item key={activity.id}>
              <CheckboxContainer onClick={() => toggleCheckbox(activity.id)}>
                <Checkbox checked={activity.checked}>
                  {activity.checked && <FaCheck />}
                </Checkbox>
              </CheckboxContainer>

              <Content>
                <Title>{activity.title}</Title>
                <MetaInfo>
                  <Tag>
                    <IoIosDocument />
                    {activity.tag}
                  </Tag>
                  <Description>
                    <span>{activity.description}</span>
                    <Icon>{activity.icon}</Icon>
                  </Description>
                </MetaInfo>
              </Content>

              <Status>{activity.status}</Status>
              <Avatar>A</Avatar>
            </Item>
          ))}
        </ItemList>

        <LoadMoreButton onClick={loadMoreActivities}>
          Load new activity
        </LoadMoreButton>
      </WeekContainer>
    </>
  );
};

export default LastWeekActivity;
