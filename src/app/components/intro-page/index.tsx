import { useCallback, useMemo, useState } from "react";
import { Button } from "@mui/joy";

import { Keyboard } from "./keyboard/keyboard";
import { Mouse } from "./mouse/mouse";
import styles from "./styles.module.scss";

type IProps = {
  onStart: () => void;
};

export const IntroPage: React.FC<IProps> = ({ onStart }) => {
  const [input, setInput] = useState<string>();

  const handleHover = useCallback(
    (name: string) => {
      setInput(name);
    },
    [setInput]
  );

  const description = useMemo(() => {
    switch (input) {
      case "W":
        return "Move up (↑ also work)";
      case "A":
        return "Move left (← also work)";
      case "S":
        return "Move down (↓ also work)";
      case "D":
        return "Move right (→ also work)";

      case "mouse-left":
        return "Shoot";
      case "mouse-move":
        return "Aim";
    }
    return null;
  }, [input]);

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <div className={styles.keyboard}>
          <Keyboard onHover={handleHover} />
        </div>
        <div className={styles.mouse}>
          <Mouse onHover={handleHover} />
        </div>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.action}>
        <Button onClick={onStart}>Start</Button>
      </div>
    </div>
  );
};
