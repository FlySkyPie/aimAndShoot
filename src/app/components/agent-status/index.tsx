import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import LinearProgress from "@mui/joy/LinearProgress";
import { Input } from "@mui/joy";

import { AgentIcon } from "./icon";
import styles from "./styles.module.scss";

export type IAgent = {
  id: string;
  name: string;
  color: string;
  health: number;
};

type IProps = {
  generation: number;
  agents: IAgent[];
};

export const AgentStatus: React.FC<IProps> = ({ generation, agents }) => {
  return (
    <div className={styles.root}>
      <Typography
        level="body-xs"
        // textTransform="uppercase"
        sx={{ letterSpacing: "0.15rem" }}
      >
        Generation
      </Typography>
      <Input value={generation} readOnly />
      {/* <FormControl>
        <FormLabel>Generation</FormLabel> */}
      {/* <Input placeholder="Placeholder" />
        <FormHelperText>This is a helper text.</FormHelperText> */}
      {/* </FormControl> */}
      <Typography
        level="body-xs"
        // textTransform="uppercase"
        sx={{ letterSpacing: "0.15rem" }}
      >
        Agents
      </Typography>
      <List sx={{ borderRadius: "sm" }} color="neutral" variant="outlined">
        {agents.map(({ id, name, color, health }) => (
          <ListItem key={id}>
            <ListItemDecorator>
              <div className={styles.agenIcon}>
                <AgentIcon color={color} />
              </div>
            </ListItemDecorator>
            <ListItemContent>
              <Typography level="title-sm">{name}</Typography>
              <Typography level="body-sm" noWrap component="div">
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
