"use client";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import LikeButton from "../../communities/[id]/components/Like-Button";
import ShareButton from "../../communities/[id]/components/Share-Button";
import Link from "next/link";
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

function Card({ id, image, title, authorName, votes, user }) {
  const voted = votes.some((vote) => vote.userId === user);

  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={
        image
          ? { backgroundImage: `url(${image})` }
          : { backgroundColor: "black" }
      }
      className={`shadow   ${classes.card}`}>
      <div>
        <Text className={`text-color ${classes.author}`} size="xs">
          Posted By {authorName}
        </Text>
        <Title order={3} className={`text-color ${classes.title}`}>
          {title.substring(0, 50)}
        </Title>
      </div>

      <div className="grid grid-flow-col grid-cols-2 gap-5 font-extrabold text-gray-400">
        <LikeButton
          voted={voted}
          postId={id}
          number={votes.length}></LikeButton>
        <ShareButton></ShareButton>
      </div>
    </Paper>
  );
}

export default function PostCarousel({ posts, user }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = posts.map((item) => (
    <Carousel.Slide key={item.title}>
      <Link href={`/communities/${item.community.name}/${item.id}#post`}>
        <Card {...item} user={user.id} />
      </Link>
    </Carousel.Slide>
  ));

  return (
    <div className="rounded-l">
      {mobile ? (
        <div className="flex flex-col gap-5">
          {posts.map((item, idx) => (
            <Link
              key={idx}
              href={`/communities/${item.community.name}/${item.id}#post`}>
              <Card {...item} user={user} />
            </Link>
          ))}
        </div>
      ) : (
        <Carousel
          classNames={classes}
          slideSize="50%"
          breakpoints={[
            {
              maxWidth: "sm",
              slideSize: "100%",
              slideGap: rem(2),
            },
          ]}
          slideGap="xl"
          align="start"
          loop
          withIndicators
          translate="yes"
          orientation={mobile ? "vertical" : "horizontal"}
          slidesToScroll={mobile ? 1 : 2}>
          {slides}
        </Carousel>
      )}
    </div>
  );
}
