import Avatar from "@mui/joy/Avatar";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";

import styles from "./styles.module.scss";

const agentNames = [
  "Steve",
  "John",
  "Fay Hardy",
  "Ameer Mclaughlin",
  "Keenan Jones",
];

export const AgentList: React.FC = () => {
  return (
    <div className={styles.root}>
      <Typography
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: "0.15rem" }}
      >
        Agents
      </Typography>
      <List
        sx={{ "--ListItemDecorator-size": "56px" }}
        color="neutral"
        variant="soft"
      >
        {agentNames.map((name) => (
          <ListItem key={name}>
            <ListItemDecorator>
              <Avatar />
            </ListItemDecorator>
            <ListItemContent>
              <Typography level="title-sm">{name}</Typography>
              <Typography level="body-sm" noWrap></Typography>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
