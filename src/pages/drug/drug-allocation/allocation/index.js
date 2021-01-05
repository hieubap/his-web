import React, { useEffect } from "react";
import { connect } from "react-redux";
import DrugAllocation from "components/drug-allocation/DrugAllocation";

const Allocation = (props) => {
  useEffect(() => {
    props.updateData({
      feature: "allocation",
    });
  }, []);

  return <DrugAllocation />;
};

const mapState = (state) => ({});

const mapDispatch = ({ drugAllocation: { updateData } }) => ({ updateData });

export default connect(mapState, mapDispatch)(Allocation);
