import { useCallback, useEffect, useMemo, useState } from "react";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type {
  IAgentDeadEvent,
  ICombatEndEvent,
  ICombatStartEvent,
  ICombatUpdatedEvent,
} from "../game/interfaces/game-event-map";
import { BattleZone } from "../web-components/battle-zone";

import { IScore, Scoreboard } from "./components/scoreboard";
import { IntroPage } from "./components/intro-page";
import { AgentStatus, IAgent } from "./components/agent-status";

import styles from "./styles.module.scss";

type IGameProps = {
  onDead: () => void;
};

const GameScreen: React.FC<IGameProps> = ({ onDead }) => {
  const [battleZone, setBattleZone] = useState<BattleZone | null>(null);
  const [generation, setGeneration] = useState(0);
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [scores, steScores] = useState<IScore[]>([]);

  useEffect(() => {
    if (!battleZone) {
      return;
    }

    const handleAgentDead = ({ isBot, name, kiiledBy }: IAgentDeadEvent) => {
      if (!isBot) {
        toast.warn(`You Dead`);
        onDead();
        return;
      }
      if (!kiiledBy) {
        toast.info(`${name} is dead`);
      } else {
        toast.info(`${name} killed by ${kiiledBy}`);
      }
    };

    const handleCombatStart = ({ generation, agents }: ICombatStartEvent) => {
      setGeneration(generation);
      setAgents(
        agents.map((item) => ({
          ...item,
          health: 1,
        }))
      );
    };

    const handleCombatUpdated = ({ agents }: ICombatUpdatedEvent) => {
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
    };

    const handleCombatEnd = ({ scoreboard }: ICombatEndEvent) => {
      steScores(scoreboard);
    };

    battleZone.on("agent-dead", handleAgentDead);
    battleZone.on("combate-start", handleCombatStart);
    battleZone.on("combate-updated", handleCombatUpdated);
    battleZone.on("combate-end", handleCombatEnd);

    return () => {
      battleZone.off("agent-dead", handleAgentDead);
      battleZone.off("combate-start", handleCombatStart);
      battleZone.off("combate-updated", handleCombatUpdated);
      battleZone.off("combate-end", handleCombatEnd);
    };
  }, [battleZone, onDead]);

  return (
    <div className={styles.root}>
      <AgentStatus generation={generation} agents={agents} />
      <battle-zone ref={setBattleZone} class={styles.canvas}></battle-zone>
      <Scoreboard scores={scores} />
    </div>
  );
};

export const CombatPanel: React.FC = () => {
  const [isStart, setStart] = useState(false);

  const handleDead = useCallback(() => {
    setStart(false);
  }, []);

  const pageView = useMemo(() => {
    if (isStart) {
      return <GameScreen onDead={handleDead} />;
    }

    return <IntroPage onStart={() => setStart(true)} />;
  }, [handleDead, isStart]);

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
