"use client";
import React from "react";
import { BsPeople } from "react-icons/bs";
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  rem,
  getStylesRef,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  controls: {
    ref: getStylesRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getStylesRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
  card: {
    height: rem(300),
    width: rem(320),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  author: {
    color: theme.white,
    opacity: 1,
    fontWeight: 900,
    textTransform: "uppercase",
  },
}));

function CommunityCard({ community }) {
  const { classes } = useStyles();
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={
        community.image
          ? { backgroundImage: `url(${community.image})` }
          : { backgroundColor: "black" }
      }
      className={`shadow   ${classes.card}`}>
      <div>
        <Text className={` ${classes.author}`} size="xs">
          Created By {community.creator.name}
        </Text>
        <Title order={3} className={`text-color ${classes.title}`}>
          {community.name}
        </Title>
      </div>

      <div className="grid grid-flow-col grid-cols-2 gap-5 font-extrabold text-white">
        <div>
          <BsPeople size={20} className="mr-2"></BsPeople> Followers{" "}
          {community.subscribers.length}
        </div>
      </div>
    </Paper>
  );
}

const CommunitiesCards = ({ communities }) => {
  return (
    <div className="hidden md:flex md:flex-row gap-10">
      {communities.map((item, idx) => (
        <CommunityCard key={idx} community={item}></CommunityCard>
      ))}
    </div>
  );
};

export default CommunitiesCards;
