import styles from "./CardWithTitle.module.scss";

export const CardWithTitle = (props: any) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.tileTitle}>{props.title}</p>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
