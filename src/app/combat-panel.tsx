import { AgentList } from "./components/agent-list";

import styles from "./styles.module.scss";

type IProps = {
  // onCanvasReady: (canvas: HTMLCanvasElement) => void;
};

export const CombatPanel: React.FC<IProps> = () => {
  return (
    <div className={styles.root}>
      <AgentList />
      {/* <canvas
        ref={onCanvasReady}
        className={styles.canvas}
        width="1024"
        height="1024"
      /> */}
      <battle-zone class={styles.canvas}></battle-zone>
    </div>
  );
};
