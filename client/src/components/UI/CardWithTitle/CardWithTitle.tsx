import styles from "./CardWithTitle.module.scss";

interface Props {
  title: string;
  children: any;
}

export const CardWithTitle = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.tileTitle}>{props.title}</p>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
