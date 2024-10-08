import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/cards/ImageCard";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  padding: 30px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
  background: ${({ theme }) => theme.background};
`;

const HeadLine = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([
    {
      prompt: "A beautiful sunrise",
      photo: "https://via.placeholder.com/300",
      name: "Alice",
    },
    {
      prompt: "A serene landscape",
      photo: "https://via.placeholder.com/300",
      name: "Bob",
    },
    {
      prompt: "A futuristic city",
      photo: "https://via.placeholder.com/300",
      name: "Charlie",
    },
    {
      prompt: "A cozy cabin in the woods",
      photo: "https://via.placeholder.com/300",
      name: "Diana",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPost, setFilteredPost] = useState(posts);

  useEffect(() => {
    // Mocked data fetch with a delay
    setLoading(true);
    setTimeout(() => {
      setPosts([
        {
          prompt: "Flying car",
          photo:
            "https://lh3.googleusercontent.com/gg/AJIvXiu7ZYAMxptKV9dVOAreonFHbCWUdNfrh6jfkfjEnb_phc8x_gcf5meu191LMs0QUy9Z2V31XQ4QfBbN46UEffoS94_tXX4RpvMQKGpyR0109bd_xrJvYrpSFyuUYKqpKxECfat-RX4C1D72U4T-M7eTOiZhxCcsB9nD6S9ynE6p4W3mXVo",
          name: "John",
        },
        {
          prompt: "Lord Ram",
          photo:
            "https://i.pinimg.com/236x/ba/4c/52/ba4c5262fb3f4efc264d608c707642c4.jpg",
          name: "Mitali",
        },
        {
          prompt: "man admiring perfect utopian city",
          photo:
            "https://i.pinimg.com/236x/df/a9/1f/dfa91f9f1dcb2e55e058ee1a7c2b20d4.jpg",
          name: "Alice",
        },
        {
          prompt: "thom yorke playing a piano underwater",
          photo:
            "https://i.pinimg.com/564x/48/bb/0c/48bb0c1c4f73d8b39636b5ef35d5f71b.jpg",
          name: "Bob",
        },
        {
          prompt: "Dard ocean with boat",
          photo:
            "https://i.pinimg.com/564x/85/5b/18/855b1845dafc9a3aa0c6d643d3bd49b2.jpg",
          name: "Charlie",
        },
        {
          prompt: "Half human half ai",
          photo:
            "https://i.pinimg.com/564x/2d/87/25/2d8725d201a734fd07e7e2935be6d89e.jpg",
          name: "Diana",
        },
      ]);
      setFilteredPost([
        {
          prompt: "Flying car",
          photo:
            "https://lh3.googleusercontent.com/gg/AJIvXiu7ZYAMxptKV9dVOAreonFHbCWUdNfrh6jfkfjEnb_phc8x_gcf5meu191LMs0QUy9Z2V31XQ4QfBbN46UEffoS94_tXX4RpvMQKGpyR0109bd_xrJvYrpSFyuUYKqpKxECfat-RX4C1D72U4T-M7eTOiZhxCcsB9nD6S9ynE6p4W3mXVo",
          name: "John",
        },
        {
          prompt: "man admiring perfect utopian city",
          photo:
            "https://i.pinimg.com/236x/df/a9/1f/dfa91f9f1dcb2e55e058ee1a7c2b20d4.jpg",
          name: "Alice",
        },
        {
          prompt: " thom yorke playing a piano underwater",
          photo:
            "https://i.pinimg.com/564x/48/bb/0c/48bb0c1c4f73d8b39636b5ef35d5f71b.jpg",
          name: "Bob",
        },
        {
          prompt: "Flowers in Apocalypse",
          photo:
            "https://i.pinimg.com/564x/85/5b/18/855b1845dafc9a3aa0c6d643d3bd49b2.jpg",
          name: "Charlie",
        },
        {
          prompt: "Half human half ai",
          photo: "https://via.placeholder.com/300",
          name: "Diana",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredPost(posts);
    }
    const filteredPosts = posts.filter((post) => {
      const promptMatch = post?.prompt
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const authorMatch = post?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return promptMatch || authorMatch;
    });

    if (search) {
      setFilteredPost(filteredPosts);
    }
  }, [posts, search]);

  return (
    <Container>
      <HeadLine>
        Explore popular posts in the Community!
        <Span>⦾ Generated with AI ⦾</Span>
      </HeadLine>
      <SearchBar
        search={search}
        handleChange={(e) => setSearch(e.target.value)}
      />
      <Wrapper>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {filteredPost.length > 0 ? (
              <>
                {filteredPost
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <ImageCard key={index} item={item} />
                  ))}
              </>
            ) : (
              <>No Posts Found !!</>
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
