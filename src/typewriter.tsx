import React from "react";
import Typewriter from "typewriter-effect";

export interface HeroTypewriterProps {
  content: string | string[];
  style: string;
  loop?: boolean;
}

export const HeroTypewriter = ({
  style,
  content,
  loop,
}: HeroTypewriterProps) => {
  if (typeof content === "string") {
    content = [content];
  }

  return (
    <span className={style}>
      <Typewriter
        options={{
          strings: content,
          autoStart: true,
          loop: loop ?? true,
        }}
      />
    </span>
  );
};
