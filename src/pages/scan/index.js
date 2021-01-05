import React, { useRef } from "react";
import { Button, Icon } from "antd";
import FormScan from "components/Scan";
import AddNewIcon from "assets/svg/addNew2.svg";

import Page from "components/common/Page";
import PageHeader from "components/common/PageHeader";
const FormCatalogPage = () => {
  const refForm = useRef(null);

  const showAddNew = () => {
    refForm.current.addForm();
  };
  return (
    <Page
      header={
        <PageHeader
          leftArea={"SCAN BIỂU MẪU"}
          rightArea={
            <Button type={"primary"} className="btn-add" onClick={showAddNew}>
              <Icon component={AddNewIcon} />
              Thêm mới
            </Button>
          }
        />
      }
    >
      <FormScan ref={refForm} />
    </Page>
  );
};

export default FormCatalogPage;
