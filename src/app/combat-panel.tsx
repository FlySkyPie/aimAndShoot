import { useState } from "react";

import { AgentList } from "./components/agent-list";
import { IntroPage } from "./components/intro-page";

import styles from "./styles.module.scss";

export const CombatPanel: React.FC = () => {
  const [isStart, setStart] = useState(false);

  if (isStart) {
    return (
      <div className={styles.root}>
        <AgentList />
        <battle-zone
          ref={(ref) => console.log(ref)}
          class={styles.canvas}
        ></battle-zone>
      </div>
    );
  }

  return <IntroPage onStart={() => setStart(true)} />;
};
