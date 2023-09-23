import { useEffect, useMemo, useState } from "react";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BattleZone } from "../web-components/battle-zone";

import { AgentList } from "./components/agent-list";
import { IntroPage } from "./components/intro-page";
import { AgentStatus, IAgent } from "./components/agent-status";

import styles from "./styles.module.scss";

const GameScreen: React.FC = () => {
  const [battleZone, setBattleZone] = useState<BattleZone | null>(null);
  const [generation, setGeneration] = useState(0);
  const [agents, setAgents] = useState<IAgent[]>([]);

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

    battleZone.on("combate-start", ({ generation, agents }) => {
      setGeneration(generation);
      setAgents(
        agents.map((item) => ({
          ...item,
          health: 1,
        }))
      );
    });

    battleZone.on("combate-updated", ({ agents }) => {
      setAgents((prev) =>
        prev.map((agent) => {
          const next = agents.find((item) => item.id === agent.id);
          if (!next) {
            return agent;
          }
          return {
            ...agent,
            health: next.health,
          };
        })
      );
    });
  }, [battleZone]);

  return (
    <div className={styles.root}>
      <AgentStatus generation={generation} agents={agents} />
      <battle-zone ref={setBattleZone} class={styles.canvas}></battle-zone>
      <AgentList />
    </div>
  );
};

export const CombatPanel: React.FC = () => {
  const [isStart, setStart] = useState(false);

  const pageView = useMemo(() => {
    if (isStart) {
      return <GameScreen />;
    }

    return <IntroPage onStart={() => setStart(true)} />;
  }, [isStart]);

  return (
    <>
      {pageView}
      <ToastContainer
        hideProgressBar
        transition={Slide}
        position="bottom-right"
      />
    </>
  );
};
