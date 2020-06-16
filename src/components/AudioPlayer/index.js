import React, { useState, useEffect } from "react";
import { useAudio } from "../../effects/useAudio";

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);
  toggle();

  return (
    <div/>
  );
};

export default Player;
