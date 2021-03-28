import React from "react";
import Particles from "react-particles-js";

const ParticlesCom = () => {
  return (
    <Particles
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
      height="100%"
      width="100%"
      params={{
        particles: {
          color: {
            value: "#000000",
          },
          line_linked: {
            color: {
              value: "#000000",
            },
          },
          number: {
            value: 50,
          },
          size: {
            value: 3,
          },
        },
      }}
    />
  );
};

export default ParticlesCom;
