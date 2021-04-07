import styles from "./CardWithoutTitle.module.scss";


export const CardWithoutTitle = (props : any) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
