"use client"
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import React from "react";

const Nodes = React.memo(({id} : {id: string}) => {
  const [init, setInit] = useState(false);
  const [dense, setDense] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    const handleResize = () => {
      // Check the zoom level and update density
      const zoomLevel = window.devicePixelRatio;
      if (zoomLevel >= 1) setDense(true); // Toggle on density when zoomed in
      else setDense(false); // Toggle off density when zoomed out
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push",
          },
          onHover: {
            enable: false,
            mode: "grab",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          grab: {
            distance: 200,
            duration: 0.4,
          }
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: false,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.bottom,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: true,
          speed: 2,
          straight: true,
        },
        number: {
          density: {
            enable: dense,
          },
          limit: {
            mode: "wait",
            value: 250,
          },
          value: 250,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: "square",
        },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      fullScreen: {
        enable: false,
      },
      detectRetina: true,
    }),
    [dense],
  );

  if (init) {
    return (
      <Particles
        id={`tsparticles-${id}`} // Use uniqueId here
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute h-[100vh] w-[100vw]"
      />
    );
  }

  return <></>;
});

Nodes.displayName = "Nodes";

export default Nodes;