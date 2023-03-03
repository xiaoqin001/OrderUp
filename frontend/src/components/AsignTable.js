import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OpenOrders from './OpenOrders';
import Menu from './Menu';
import './components.css';
import {  Button, Form, Input, Select, Row, Col  } from 'antd';
const { Option } = Select;


function AsignTable() {
    const [tableOptions, setTableOptions] = useState([]);
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [reFresh, setReFresh] = useState(false)

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

    useEffect(async () => {
      await axios.get('/table')
        .then((response) => {
          // console.log(response)
          const options = response.data.map(number => ({
            value: number,
            label: `Table ${number}`
          }));
          setTableOptions(options);
        })
        .catch((error) => {
          console.log(error);
        });

      await axios.get('/employee')
        .then((response) => {
          const options = response.data.map(employee => ({
            value: employee.id,
            label: employee.name
          }));
          setEmployeeOptions(options);
          // console.log(employeeOptions)
        })
        .catch((error) => {
          console.log(error);
        });
    }, [reFresh]);

    // console.log(employeeOptions)
    // console.log(selectedEmployee)


    const handleSubmit = async (event) => {
      if (reFresh) {
        setReFresh(false)
      }else{
        setReFresh(true)
      }
      event.preventDefault();

      await axios.post('/opentable', {
        table_id: selectedTable,
        employee_id: selectedEmployee
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    return (
      <div>
        <div className='AsignBar'>
          <div className='AsignBarLine'>
            <p className='AsignText'>Asign Table</p>
            <div className='AsignTable'>
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
            allowClear
            onChange={(e) => setSelectedTable(e)}
          >
            <Select.Option value='select' >Please select a table</Select.Option>
            {tableOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}

          </Select>
        </Form.Item>
        </Col>

        <Col>
        <Form.Item className='Server' name="employee" label="Server" rules={[{ required: true,},]}>
          <Select
            placeholder="Select a server"
            value={selectedEmployee}
            onChange={(e) => {setSelectedEmployee(e)}}
          >
            <Select.Option value='select' >Please select a server</Select.Option>
            {employeeOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}

          </Select>
        </Form.Item>
        </Col>


        <Col>
        <Form.Item >
          <Button className='submit' type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
        </Col>

        </Row>
      </Form>
      </div>
      </div>
      </div>
      <Menu />
      </div>

    );

}




  export default AsignTable;
