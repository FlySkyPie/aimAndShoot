import { AgentList } from "./components/agent-list";

import styles from "./styles.module.scss";

type IProps = {
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
};

export const CombatPanelComponent: React.FC<IProps> = ({ onCanvasReady }) => {
  return (
    <div className={styles.root}>
      <AgentList />
      <canvas ref={onCanvasReady} className={styles.canvas} />
    </div>
  );
};
