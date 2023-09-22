import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import LinearProgress from "@mui/joy/LinearProgress";
import { nanoid } from "nanoid";

import { AgentIcon } from "./icon";
import styles from "./styles.module.scss";

type IAgent = {
  id: string;
  name: string;
  color: string;
  health: number;
};

const mockAgents: IAgent[] = [
  {
    id: nanoid(),
    name: "Steve",
    color: "#ffff00",
    health: 0.5,
  },
  {
    id: nanoid(),
    name: "John",
    color: "#ff00ff",
    health: 1,
  },
  {
    id: nanoid(),
    name: "Fay Hardy",
    color: "#ff00ff",
    health: 1,
  },
];

// type IProps = {
//   agents: IAgent[];
// };

export const AgentStatus: React.FC = () => {
  return (
    <div className={styles.root}>
      <Typography
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: "0.15rem" }}
      >
        Agents
      </Typography>
      <List sx={{ borderRadius: "sm" }} color="neutral" variant="outlined">
        {mockAgents.map(({ id, name, color, health }) => (
          <ListItem key={id}>
            <ListItemDecorator>
              <div className={styles.agenIcon}>
                <AgentIcon color={color} />
              </div>
            </ListItemDecorator>
            <ListItemContent>
              <Typography level="title-sm">{name}</Typography>
              <Typography level="body-sm" noWrap>
                <LinearProgress
                  determinate
                  color="danger"
                  size="lg"
                  value={health * 100}
                />
              </Typography>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
