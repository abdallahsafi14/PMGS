import React from "react";
import {
  CardContainer,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  CardFooter,
  BadgeRow,
  Badge,
} from "./styles";
import { useNavigate } from "react-router-dom";

function CustomCard({ cards }) {
  const navigate = useNavigate();

  return (
    <>
      {cards.map((card, index) => {
        const [priorityLabel, statusLabel] = card.description2
          .split("|")
          .map((v) => v.trim());

        return (
          <CardContainer
            key={index}
            onClick={() => navigate(`/projects/${card.id}`)}
          >
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>

            <CardBody>
              <CardText>{card.description1}</CardText>

              <BadgeRow>
                <Badge type={priorityLabel?.split(":")[1]?.trim()}>
                  {priorityLabel}
                </Badge>
                <Badge type={statusLabel?.split(":")[1]?.trim()}>
                  {statusLabel}
                </Badge>
              </BadgeRow>
            </CardBody>

            <CardFooter>{card.footerText || "View Details"}</CardFooter>
          </CardContainer>
        );
      })}
    </>
  );
}

export default CustomCard;
