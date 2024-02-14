import { Handlee, Playfair_Display } from "next/font/google";
import { ForceGraph } from "../valentines";
import { HeroTypewriter } from "../typewriter";

const alata = Handlee({
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main>
      <div className="container mx-auto h-screen flex flex-col justify-center items-center mt-4">
        <h1
          className={`text-4xl font-bold text-center ${alata.className} py-6`}
        >
          Happy Valentine&apos;s Day to my{" "}
          <HeroTypewriter
            content={[
              "pookie bear!!",
              "bby girl!!",
              "stinky!!",
              "love!!",
              "one and only!!",
              "rat",
              "birdie!!",
              "munch!!",
              "twizzy!!",
              "brotha man!!",
              "love of my life!!",
              "boo thang!!",
            ]}
            style="text-red-500"
          />{" "}
        </h1>
        <h2 className={`text-2xl font-bold ${playfair.className} text-center`}>
          Here are{" "}
          <span className="text-red-500 font-bold text-4xl rotate-12">17</span>{" "}
          of my favorite moments with you :)
        </h2>
        <h3>
          Thank u for always being by my side, for all your love and kindness
          and sweetness, and for dealing with me ❤️ 😌
        </h3>
        <ForceGraph />
        <h3>
          With so so so so much love,{" "}
          <span className="text-red-500 font-bold">Sean {"<"}3</span> (that
          ginger guy)
        </h3>
      </div>
    </main>
  );
}
