import React from 'react';
import T from 'prop-types';
import { connect } from "react-redux";
import { Modal, Form, Input } from 'antd';
import { Main } from './styled';

const CreateModal = ({ form, config, onShow, handleHideModal, createConfigForm }) => {
  const { props } = config;
  const handleSubmitForm = () => {
    form.validateFields((errors, values) => {
      if (!errors) {
        createConfigForm(values);
        handleHideModal();
      }
    })
  };
  
  return (
    <Modal visible={onShow} title={'Create new form'} onCancel={handleHideModal} onOk={handleSubmitForm}>
      <Main>
        <Form>
          <Form>
            <Form.Item label={'Code'} className={'props-form-item'}>
              {form.getFieldDecorator('value', {
                rules: [{ required: true, message: 'This field can not be blank!' }],
                initialValue: props.value,
              })(
                <Input />
              )}
            </Form.Item>
    
            <Form.Item label={'Name'} className={'props-form-item'}>
              {form.getFieldDecorator('name', {
                rules: [{ required: true, message: 'This field can not be blank!' }],
                initialValue: props.name,
              })(
                <Input />
              )}
            </Form.Item>
    
            <Form.Item label={'API'} className={'props-form-item'}>
              {form.getFieldDecorator('api', {
                rules: [{ required: true, message: 'This field can not be blank!' }],
                initialValue: props.api,
              })(
                <Input />
              )}
            </Form.Item>
          </Form>
        </Form>
      </Main>
    </Modal>
  )
};

CreateModal.defaultProps = {
  onShow: false,
};

CreateModal.propType = {
  onShow: T.bool,
  handleHideModal: T.func,
};

const mapState = state => ({
  config: state.config,
});

const mapDispatch = ({ config: { updateFormProps, createConfigForm } }) => ({ updateFormProps, createConfigForm });

export default connect(mapState, mapDispatch)(Form.create()(CreateModal));
