import React from "react";
import ParticlesBg from "particles-bg";
import styles from "./main.module.scss";

const main = (props: any) => {
  let config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-40, 40],
    alpha: [0.6, 0],
    scale: [0.1, 0.2],
    position: "all",
    color: ["#fff", "#fff"],
    cross: "dead",
    // emitter: "follow",
    random: 15,
    g: 1,
    onParticleUpdate: (ctx: any, particle: any) => {
      ctx.beginPath();
      ctx.rect(
        particle.p.x,
        particle.p.y,
        particle.radius * 2,
        particle.radius * 2
      );
      ctx.fillStyle = particle.color;
      ctx.fill();
      ctx.closePath();
    },
  };

  return (
    <main className={styles.mainCon}>
      {props.children} <ParticlesBg type="custom" config={config} bg={true} />
    </main>
  );
};

export default main;
