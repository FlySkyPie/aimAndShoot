import { AgentList } from "./components/agent-list";

import styles from "./styles.module.scss";

export const CombatPanelComponent: React.FC = () => {
  return (
    <div className={styles.root}>
      <AgentList />
      <canvas className={styles.canvas} />
    </div>
  );
};
