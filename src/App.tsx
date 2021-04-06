import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Menu } from 'antd';
import { InputNumber } from 'antd';
import { Cascader, Select } from 'antd';
import { DatePicker, Space } from 'antd';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

import { createBrowserHistory } from 'history';
import { useHistory } from 'react-router';


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function App1() {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const [current, setCurrent] = useState("mail")
  const history= useHistory()
  const onGenderChange = (value: any) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        return;

      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;

      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };
  const onFinish = (values: any) => {
    const obj = {
      uname: values.username, pass: values.password, amount: values.amount, cascader: values.cascader[values.cascader.length - 1],
      dob: JSON.stringify(values.dateOfBirth["_d"]), note: values.note, gender: values.gender
    }

    dispatch({ type: "Submit", payload: obj })
    history.push("/comp2")
  };
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],

        },
        {
          value: 'hangzhou1',
          label: 'Hangzhou1',
          children: [
            {
              value: 'xihu1',
              label: 'West1 Lake1',
            },
            {
              value: 'xihu2',
              label: 'West2 Lake2',
            },
            {
              value: 'xihu2',
              label: 'West2 Lake2',
            }
          ],

        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onChange = () => {

  }
  function displayRender(label: any) {
    return label[label.length - 1];
  }
  function handleClick(e: any) {
    console.log('click ', e);
    setCurrent(e)
  };

  return (
    <>

      <Form className="d-flex flex-column align-items-center justify-content-center mt-5"
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item
          label="Username"
          name="username"
          tooltip="please write something"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}

        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item label="amount" name="amount"
          rules={
            [
              {
                required: true,

              }
            ]
          } >
          <InputNumber
            defaultValue={1000}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item label="Cascader" name="cascader">
          <Cascader
            options={options}
            expandTrigger="hover"
            displayRender={displayRender}
          />
        </Form.Item>
        <Form.Item
          name="note"
          label="Note"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={onGenderChange}
            allowClear
          >
            <Select.Option value="male">male</Select.Option>
            <Select.Option value="female">female</Select.Option>
            <Select.Option value="other">other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="dateOfBirth" label="dateOfBirth" rules={[{ required: true }]}>
          <DatePicker onChange={onChange} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
              </Button>
        </Form.Item>
      </Form>

    </>
  );
}

