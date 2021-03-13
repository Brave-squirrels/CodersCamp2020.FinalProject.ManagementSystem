import classes from "./bigRectangle.module.scss";

const BigRectangle = (props: any) => {
  return <div className={classes.bigRectangle}>{props.children}</div>;
};

export default BigRectangle;
