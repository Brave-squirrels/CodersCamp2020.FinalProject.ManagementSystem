import React from "react";
import { change } from "../../redux/actions/testAction";
import { connect } from "react-redux";

const LandingPage = (props: any) => {
  let sh: String = "xD";
  if (!props.test) {
    sh = "!xD";
  }

  //Run action on click which changes redux state and rerender component
  return <button onClick={props.onTestChange}>{sh}</button>;
};

//Get state from redux
const mapStateToProps = (state: any) => {
  return {
    test: state.testReducer.show,
  };
};

//Get action from /actions
const mapDispatchToProps = (dispatch: any) => {
  return {
    onTestChange: () => dispatch(change()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
