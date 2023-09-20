import { useCallback, useMemo, useState } from "react";
import { Button } from "@mui/joy";

import { Keyboard } from "./keyboard";
import { Mouse } from "./mouse";
import styles from "./styles.module.scss";
import "./style.css";

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
      case "A":
      case "S":
      case "D":
        return "Move";

      case "mouse-left":
        return "Shoot";
      case "mouse-move":
        return "Aim";
    }
    return null;
  }, [input]);

  return (
    <div className={"credit-page" + " " + styles.root}>
      <div className="controls">
        <Keyboard onHover={handleHover} />
        <Mouse onHover={handleHover} />
      </div>
      <div className="description">{description}</div>
      <Button onClick={onStart}>Start</Button>
    </div>
  );
};
