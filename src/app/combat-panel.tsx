import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BattleZone } from "../web-components/battle-zone";

import { AgentList } from "./components/agent-list";
import { IntroPage } from "./components/intro-page";
import { AgentStatus } from "./components/agent-status";

import styles from "./styles.module.scss";

export const CombatPanel: React.FC = () => {
  const [isStart, setStart] = useState(false);

  const [battleZone, setBattleZone] = useState<BattleZone | null>(null);
  useEffect(() => {
    if (!battleZone) {
      return;
    }

    // const agentDeadHandler = () => {};
    battleZone.on("agent-dead", ({ isBot, name, kiiledBy }) => {
      if (!isBot) {
        toast.warn(`You Dead`);
        return;
      }
      if (!kiiledBy) {
        toast.info(`${name} is dead`);
      } else {
        toast.info(`${name} killed by ${kiiledBy}`);
      }
    });
  }, [battleZone]);

  const pageView = useMemo(() => {
    if (isStart) {
      return (
        <div className={styles.root}>
          <AgentList />
          {/* <div className={styles.canvas} /> */}
          <battle-zone ref={setBattleZone} class={styles.canvas}></battle-zone>
          <AgentStatus />
        </div>
      );
    }

    return <IntroPage onStart={() => setStart(true)} />;
  }, [isStart]);

  return (
    <>
      {pageView}
      <ToastContainer hideProgressBar position="bottom-right" />
    </>
  );
};
