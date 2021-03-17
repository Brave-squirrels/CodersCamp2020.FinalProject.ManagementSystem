import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(4),
      background: "#414858",
      marginTop: "1rem",
    },
    card: {
      background: "#4A5060",
      color: "#F3F9F6",
      height: "150px",
    },
    content: {
      color: "#F3F9F6",
    },
  })
);
