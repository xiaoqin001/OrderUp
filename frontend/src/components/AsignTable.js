import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Button, Form, Input, Select, Row, Col  } from 'antd';
const { Option } = Select;


function AsignTable() {
    const [tableOptions, setTableOptions] = useState([]);
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

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

    useEffect(() => {
      axios.get('/api/table')
        .then((response) => {
          console.log(response)
          const options = response.data.map(table => ({
            value: table.id,
            label: `Table ${table.number}`
          }));
          setTableOptions(options);
        })
        .catch((error) => {
          console.log(error);
        });

      axios.get('/api/employee')
        .then((response) => {
          const options = response.data.map(employee => ({
            value: employee.id,
            label: employee.name
          }));
          setEmployeeOptions(options);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('/orders', {
        table_id: selectedTable,
        employee_id: selectedEmployee
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    return (
      <Form
        // {...layout}

        // form={form}
        // name="control-hooks"
        // onFinish={onFinish}
        // style={{
        //   maxWidth: 600,
        // }}
      >
        <Row>


        <Col>
        <Form.Item
          name="table"
          label="Table"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a table"
            // onChange={onGenderChange}
            allowClear
            value={selectedTable} onChange={(event) => setSelectedTable(event.target.value)} required
          >
            <Option value="">Please select a table</Option>
            {tableOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}

          </Select>
        </Form.Item>
        </Col>

        <Col>
        <Form.Item
          name="employee"
          label="Server"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a server"
            // onChange={onGenderChange}
            allowClear
            value={selectedEmployee} onChange={(event) => setSelectedEmployee(event.target.value)} required
          >
            <Option value="">Please select a server</Option>
            {employeeOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}

          </Select>
        </Form.Item>
        </Col>


        <Col>
        <Form.Item >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </Col>

        </Row>
      </Form>

    );

}




  export default AsignTable;



  // const { createRoot } = ReactDOM;
  // const {  Button, Form, Input, Select  } = antd;
  // const { Option } = Select;
  // const layout = {
  //   labelCol: {
  //     span: 8,
  //   },
  //   wrapperCol: {
  //     span: 16,
  //   },
  // };
  // const tailLayout = {
  //   wrapperCol: {
  //     offset: 8,
  //     span: 16,
  //   },
  // };
  // const App = () => {
  //   const [form] = Form.useForm();
  //   const onGenderChange = (value) => {
  //     switch (value) {
  //       case 'male':
  //         form.setFieldsValue({
  //           note: 'Hi, man!',
  //         });
  //         break;
  //       case 'female':
  //         form.setFieldsValue({
  //           note: 'Hi, lady!',
  //         });
  //         break;
  //       case 'other':
  //         form.setFieldsValue({
  //           note: 'Hi there!',
  //         });
  //         break;
  //       default:
  //     }
  //   };
  //   const onFinish = (values) => {
  //     console.log(values);
  //   };
  //   const onReset = () => {
  //     form.resetFields();
  //   };
  //   const onFill = () => {
  //     form.setFieldsValue({
  //       note: 'Hello world!',
  //       gender: 'male',
  //     });
  //   };
  //   return (
  //     <Form
  //       {...layout}

  //       form={form}
  //       name="control-hooks"
  //       onFinish={onFinish}
  //       style={{
  //         maxWidth: 600,
  //       }}
  //     >
  //       <row>
  //       <col>
  //       <Form.Item
  //         name="note"
  //         label="Note"
  //         rules={[
  //           {
  //             required: true,
  //           },
  //         ]}
  //       >
  //         <Input />
  //       </Form.Item>
  //       </col>
  //       <col>
  //       <Form.Item
  //         name="gender"
  //         label="Gender"
  //         rules={[
  //           {
  //             required: true,
  //           },
  //         ]}
  //       >
  //         <Select
  //           placeholder="Select a option and change input text above"
  //           onChange={onGenderChange}
  //           allowClear
  //         >
  //           <Option value="male">male</Option>
  //           <Option value="female">female</Option>
  //           <Option value="other">other</Option>
  //         </Select>
  //       </Form.Item>
  //       </col>
  //       <col>
  //       <Form.Item
  //         noStyle
  //         shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
  //       >
  //         {({ getFieldValue }) =>
  //           getFieldValue('gender') === 'other' ? (
  //             <Form.Item
  //               name="customizeGender"
  //               label="Customize Gender"
  //               rules={[
  //                 {
  //                   required: true,
  //                 },
  //               ]}
  //             >
  //               <Input />
  //             </Form.Item>
  //           ) : null
  //         }
  //       </Form.Item>
  //       </col>
  //       <Form.Item {...tailLayout}>
  //         <Button type="primary" htmlType="submit">
  //           Submit
  //         </Button>
  //         <Button htmlType="button" onClick={onReset}>
  //           Reset
  //         </Button>
  //         <Button type="link" htmlType="button" onClick={onFill}>
  //           Fill form
  //         </Button>
  //       </Form.Item>
  //     </row>
  //     </Form>
  //   );
  // };
  // const ComponentDemo = App;


  // createRoot(mountNode).render(<ComponentDemo />);
