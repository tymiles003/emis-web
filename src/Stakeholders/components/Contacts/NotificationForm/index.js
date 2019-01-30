import { getStakeholders } from '@codetanzania/emis-api-client';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SearchableSelectInput from '../../../../components/SearchableSelectInput';

const { TextArea } = Input;

class NotificationForm extends Component {
  static propTypes = {
    contact: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      abbreviation: PropTypes.string,
      mobile: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
    form: PropTypes.shape({ getFieldDecorator: PropTypes.func }).isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    // const {
    //   form: { validateFieldsAndScroll },
    // } = this.props;

    // validateFieldsAndScroll((error, values) => {
    //   if (!error) {
    //     const notification = {
    //       to: {
    //         _id: {
    //           $in: values.recipients,
    //         },
    //       },
    //       subject: values.subject,
    //       body: values.message,
    //     };

    //     console.log(notification);
    //   }
    // });
  };

  render() {
    const {
      onCancel,
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 24 },
        xxl: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
        lg: { span: 24 },
        xl: { span: 24 },
        xxl: { span: 24 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} autoComplete="off">
        {/* notification recipients */}
        <Form.Item {...formItemLayout} label="Recipients">
          {getFieldDecorator('recipients', {
            rules: [
              {
                required: true,
                message: 'Please provide at least one recipient',
              },
            ],
          })(
            <SearchableSelectInput
              placeholder="Enter notification recipients"
              onSearch={getStakeholders}
              optionLabel="name"
              optionValue="_id"
              mode="multiple"
            />
          )}
        </Form.Item>
        {/* end notification recipients */}

        {/* notification subject */}
        <Form.Item {...formItemLayout} label="Subject">
          {getFieldDecorator('subject', {
            rules: [{ required: true, message: 'Contact time is required' }],
          })(<Input placeholder="Applicable for Email notification only" />)}
        </Form.Item>
        {/* notification subject */}

        {/* activity description */}
        <Form.Item {...formItemLayout} label="Message">
          {getFieldDecorator('message', {
            rules: [
              {
                required: true,
                message: 'Please provide notification message',
              },
            ],
          })(
            <TextArea
              autosize={{ minRows: 6, maxRows: 10 }}
              placeholder="Write notification message here ..."
            />
          )}
        </Form.Item>
        {/* end activity description */}

        {/* form actions */}
        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
        {/* end form actions */}
      </Form>
    );
  }
}

export default Form.create()(NotificationForm);