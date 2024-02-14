import React, { useState, useEffect } from "react";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { Modal } from "flowbite-react";
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceCollide,
} from "d3-force";
import Image from "next/image";

const initialData = [
  { name: "when you cooked me at racing 👿😠", img: "/racing.JPG" },
  { name: "gym bros 😤😤😤😤", img: "/gym-bros.JPG" },
  { name: "two cool cats 😎😎😎", img: "/cool-cats.jpg" },
  { name: "lets go to the beach beach 🏖️🏖️🏖️", img: "/beach.JPEG" },
  { name: "ur so creepy 😬😬😬", img: "/creeper.jpg" },
  { name: "we made that maze our ***** 😈😈😈", img: "/maze.JPG" },
  { name: "nom nom  nom nom nom", img: "/nom.JPG" },
  {
    name: "we kissed awkwardly in front of that couple 😳😳😳",
    img: "/mfa.jpg",
  },
  { name: "she goin' x games mode 😤😤😤", img: "/biker.JPG" },
  { name: "when we kinda broke up 😢😢😢", img: "/breakup.JPG" },
  {
    name: "our first date 😍😍😍 (u couldn't look at the stars 😢)",
    img: "/first-date.JPG",
  },
  {
    name: "our jason from friday the 13th recreation 😱😱😱",
    img: "/jumpscare.JPG",
  },
  {
    name: "red carpet moment 😎😎😎 (people kept looking at us)",
    img: "/soumya.jpg",
  },
  {
    name: "olympic gold medalist skier 😤😤😤",
    img: "/ski.jpg",
  },
  {
    name: "da minion after da neighborhood 😂😂😂",
    img: "/minion.JPG",
  },
  {
    name: "red light district 😳😳😳",
    img: "/red.JPG",
  },
  {
    name: "celtics and best bday ever yayayayay <3",
    img: "/bday.JPG",
  },
  {
    name: "respect the drip karen 😤😤😤",
    img: "/cool cats.jpg",
  },
  {
    name: "h-man 😎😤😤",
    img: "/hman.jpg",
  },
];

const heartPath =
  "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314";

export const ForceGraph = () => {
  const [nodes, setNodes] = useState<Array<any>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nodeContent, setNodeContent] = useState({
    img: "",
    text: "",
  });

  useEffect(() => {
    const data = initialData.map((d, index) => {
      return {
        img: d.img,
        text: d.name,
        index: index + 1,
        radius: Math.random() * 10 + 30,
        x: Math.random() * 800,
        y: Math.random() * 600,
        color: generateRandomRedColor(),
        rotation: Math.random() * 20 * (Math.random() > 0.5 ? 1 : -1),
      };
    });

    const sim = forceSimulation(data)
      .force("charge", forceManyBody().strength(100))
      .force("center", forceCenter(400, 250))
      .force(
        "collision",
        // @ts-ignore
        forceCollide().radius((d) => d.radius + 10)
      )
      .on("tick", () => setNodes([...data]));

    return () => {
      sim.stop();
    };
  }, []);

  // Function to handle node click
  const handleNodeClick = (name: string, img: string) => {
    // delete the node from the array
    const newNodes = nodes.filter((node) => node.text !== name);
    setNodes(newNodes);

    setNodeContent({
      img: img,
      text: name,
    });
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNodeContent({
      img: "",
      text: "",
    });
  };

  return (
    <>
      <svg width="1000" height="550">
        <Group>
          {nodes.map((node, i) => (
            <a
              href="#"
              key={i}
              onClick={() => handleNodeClick(node.text ?? "", node.img ?? "")}
              // on hover, make the heart bigger and more opaque
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              <path
                key={i}
                // open a modal on click
                d={heartPath}
                transform={`translate(${node.x - 12}, ${
                  node.y - 12
                }) scale(5.5) rotate(${node.rotation})`}
                // use slightly different colors for each node
                fill={node.color}
                stroke="white"
                strokeWidth={0.3}
              />
              <Text x={node.x + 30} y={node.y + 30} fontSize={20} fill="white">
                {node.index + 1}
              </Text>
            </a>
          ))}
        </Group>
      </svg>
      <Modal
        show={isModalOpen}
        onClose={handleCloseModal}
        title="My favorite moments with you"
        dismissible
        className="border-radius-0"
      >
        <Modal.Body>
          <div className="flex flex-col items-center">
            <p className="text-center text-2xl mb-4">{nodeContent.text}</p>
            <Image
              className="rounded-lg"
              src={nodeContent.img}
              alt={nodeContent.text}
              width={450}
              height={450}
            />
          </div>
        </Modal.Body>
      </Modal>
      {/* <Image src="/racing.JPG" alt="racing" width={500} height={500} /> */}
    </>
  );
};

function generateRandomRedColor() {
  // generate shades of red that are not too dark or too light
  const r = Math.floor(Math.random() * 100 + 155);
  const g = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);
  return `rgb(${r}, ${g}, ${b})`;
}
