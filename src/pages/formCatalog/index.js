import React, { useRef } from "react";
import { Button, Icon } from "antd";
import FormCatalog from "components/FormCatalog";
import AddNewIcon from "assets/svg/addNew2.svg";
import ModalAddForm from "components/FormCatalog/ModalAddForm";

import Page from "components/common/Page";
import PageHeader from "components/common/PageHeader";
const FormCatalogPage = () => {
  const refAddForm = useRef(null);
  const showAddNew = (item, readOnly) => () => {
    refAddForm.current.show(item, readOnly);
  };
  return (
    <Page
      header={
        <PageHeader
          leftArea={"DANH MỤC BIỂU MẪU"}
          rightArea={
            <Button type={"primary"} className="btn-add" onClick={showAddNew()}>
              <Icon component={AddNewIcon} />
              Thêm biểu mẫu
            </Button>
          }
        />
      }
    >
      <FormCatalog showAddNew={showAddNew} />
      <ModalAddForm wrappedComponentRef={refAddForm} />
    </Page>
  );
};

export default FormCatalogPage;
