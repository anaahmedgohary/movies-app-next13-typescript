"use client";

import YouTube, { YouTubeProps } from "react-youtube";
// import { Suspense } from "react";

// React.ReactNode
function gettrailerYouTube(videoId: string): React.ReactNode {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    // height: "auto",
    width: "100%",
    // width: "auto",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onReady={onPlayerReady}
      title="Play Trailer"
    />
  );
}

export default function TrailerYouTube({
  children,
  videoId,
}: {
  children?: React.ReactNode;
  videoId: string;
}) {
  const item: React.ReactNode = gettrailerYouTube(videoId);
  return (
    <>
      <div
        className="border-2 border-white flex-1 max-w-[600px] opacity-95 hover:opacity-100 focus:opacity-100 hover:border-green-500 focus:border-green-500 rounded-lg overflow-hidden shadow-md shadow-black"
        title="Play Trailer"
      >
        {item}
      </div>
    </>
  );
}
