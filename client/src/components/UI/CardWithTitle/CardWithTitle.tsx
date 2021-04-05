import styles from "./CardWithTitle.module.scss";

interface Props {
  title: string | JSX.Element | JSX.Element[];
  children: any;
  additionalClass?: string;
}

export const CardWithTitle = (props: Props) => {
  let classes = props.additionalClass
    ? [styles.tileTitle, styles[props.additionalClass]]
    : [styles.tileTitle];
  return (
    <div className={styles.wrapper}>
      <span className={classes.join(" ")}>{props.title}</span>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
