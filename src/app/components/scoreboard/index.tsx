import { useMemo } from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";

import { AgentIcon } from "../../atoms/agent-icon";

import styles from "./styles.module.scss";

export type IScore = {
  id: string;
  name: string;
  color: string;
  hitRate: number;
};

type IProps = {
  scores: IScore[];
};

export const Scoreboard: React.FC<IProps> = ({ scores }) => {
  const listView = useMemo(() => {
    if (scores.length === 0) {
      return (
        <List sx={{ borderRadius: "sm" }} color="neutral" variant="outlined">
          <ListItem>
            <ListItemContent>
              <Typography level="title-sm">N/A</Typography>
            </ListItemContent>
          </ListItem>
        </List>
      );
    }

    const _scores = structuredClone(scores);
    _scores.sort((a, b) => b.hitRate - a.hitRate);
    return (
      <List sx={{ borderRadius: "sm" }} color="neutral" variant="outlined">
        {_scores.map(({ id, name, color, hitRate }) => (
          <ListItem key={id}>
            <ListItemDecorator>
              <div className={styles.agenIcon}>
                <AgentIcon color={color} />
              </div>
            </ListItemDecorator>
            <ListItemContent>
              <Typography level="title-sm">{name}</Typography>
              <Typography level="body-sm" noWrap component="div">
                Hit Rate: {(hitRate * 100).toFixed(2)}%
              </Typography>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    );
  }, [scores]);

  return (
    <div className={styles.root}>
      <Typography level="body-xs" sx={{ letterSpacing: "0.15rem" }}>
        Scoreboard of Last Combat
      </Typography>
      {listView}
    </div>
  );
};
