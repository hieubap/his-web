import React, { useRef } from "react";
import { Button, Icon } from "antd";
import VitalSign from "components/categories/VitalSigns";
import AddNewIcon from "assets/svg/addNew2.svg";
import ModalAddVitalSigns from "components/categories/VitalSigns/ModalAddVitalSigns";

import Page from "components/common/Page";
import PageHeader from "components/common/PageHeader";
const VitalSignsCategoryPage = () => {
  const refAddVitalSigns = useRef(null);
  const showAddNew = (item = null, readOnly = false) => () => {
    refAddVitalSigns.current.show(item, readOnly);
  };
  return (
    <Page
      header={
        <PageHeader
          leftArea={"DANH MỤC CHỈ SỐ SỐNG"}
          rightArea={
            <Button type={"primary"} className="btn-add" onClick={showAddNew()}>
              <Icon component={AddNewIcon} />
              Thêm chỉ số sống
            </Button>
          }
        />
      }
    >
      <ModalAddVitalSigns wrappedComponentRef={refAddVitalSigns} />
      <VitalSign showAddNew={showAddNew} />
    </Page>
  );
};

export default VitalSignsCategoryPage;
