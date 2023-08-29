"use client";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
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
import LikeButton from "../../communities/[id]/components/Like-Button";
import ShareButton from "../../communities/[id]/components/Share-Button";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";

function PostCard({ id, image, title, authorName, votes, user, content }) {
  const voted = votes.some((vote) => vote.userId === user);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Card
      className={` `}
      style={{ width: mobile ? "100vw" : rem(400), height: rem(500) }}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none h-1/2">
        <img src={image} alt="card-image" className="object-cover w-full" />
      </CardHeader>
      <div className="flex flex-col justify-between h-1/2">
        <CardBody>
          <Typography variant="h4" color="blue-gray">
            {title.substring(0, 25)}...
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            {content.substring(0, 100)}...
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <LikeButton
              voted={voted}
              postId={id}
              number={votes.length}></LikeButton>
            <ShareButton></ShareButton>
          </div>
          <Typography className="font-normal">
            Posted By {authorName}
          </Typography>
        </CardFooter>
      </div>
    </Card>
  );
}
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
}));
export default function PostCarousel({ posts, user }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = posts.map((item) => (
    <Carousel.Slide key={item.title}>
      <Link href={`/communities/${item.community.name}/${item.id}#post`}>
        <PostCard {...item} user={user.id} />
      </Link>
    </Carousel.Slide>
  ));

  return (
    <div className="rounded-l">
      {mobile ? (
        <div className="flex flex-col gap-5 items-center">
          {posts.map((item, idx) => (
            <Link
              key={idx}
              href={`/communities/${item.community.name}/${item.id}#post`}>
              <PostCard {...item} user={user} />
            </Link>
          ))}
        </div>
      ) : (
        <Carousel
          classNames={classes}
          slideSize="30%"
          breakpoints={[
            {
              maxWidth: "sm",
              slideSize: "100%",
              slideGap: rem(1),
            },
          ]}
          slideGap="xl"
          align="start"
          loop
          withIndicators
          translate="yes"
          orientation={mobile ? "vertical" : "horizontal"}
          slidesToScroll={mobile ? 1 : 3}>
          {slides}
        </Carousel>
      )}
    </div>
  );
}
