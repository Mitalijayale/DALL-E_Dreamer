import React from "react";
import styled from "styled-components";
import FileSaver from "file-saver";
import { Avatar } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";

const Card = styled.div`
  position: relative;
  display: flex;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};
    scale: 1.05;
  }
  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: start;
  gap: 2px;
  justify-content: end;
  flex-direction: column;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  opacity: 0;
  padding: 16px;
  transition: opacity 0.3s ease;
  color: ${({ theme }) => theme.white};

  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: ${({ theme }) => theme.white};
`;

const Author = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.white};
`;

const ImageCard = ({ item }) => {
  const handleDownload = () => {
    if (item?.photo) {
      const blob = new Blob([item.photo], { type: "image/jpeg" });
      FileSaver.saveAs(blob, `download.jpg`);
    }
  };

  console.log("Image URL:", item?.photo); // Debug statement

  return (
    <Card>
      <img
        alt={item?.prompt}
        width="100%"
        src={item?.photo}
        style={{
          borderRadius: "12px",
          border: "2px solid red", // Debug styling
          backgroundColor: "yellow", // Debug styling
        }}
      />
      <HoverOverlay>
        <Prompt>• {item?.prompt}</Prompt>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Author>
            <Avatar sx={{ background: "green", width: "32px", height: "32px" }}>
              {item?.name[0]}
            </Avatar>{" "}
            {item?.name}
          </Author>
          <DownloadRounded onClick={handleDownload} />
        </div>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;
