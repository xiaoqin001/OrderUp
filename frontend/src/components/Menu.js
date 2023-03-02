import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OpenOrders from './OpenOrders';
import {  Button, Checkbox, Input, Select, Row, Col  } from 'antd';
const { Option } = Select;


function Menu() {
  const [beverages, setBeverages] = useState([])
  const [sides, setSides] = useState([])
  const [entrees, setEntrees] = useState([])
  const [items, setItems] = useState([])


  const handleSubmit = () => {}

  useEffect( () => {
    axios.get('/menu')
    .then((response)=>{
      setBeverages(response.data['Beverages'])
      setSides(response.data['Sides'])
      setEntrees(response.data['Entrees'])
      setItems([])
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  console.log(beverages)

  const onChange = (checkedValues) => {
    let item_list;
    item_list = items;
    item_list.push(checkedValues[0]);
    setItems(item_list);
    console.log(items)
  }
  console.log(items)

  return (
    <div>
      <Button onClick={handleSubmit}>submit</Button>
      <div>
        <p>Entrees</p>
        <Checkbox.Group options={beverages} onChange={onChange} />
      </div>
      <div>
        <p>Sides</p>
        <Checkbox.Group options={sides} onChange={onChange} />
      </div>
      <div>
        <p>Beverages</p>
        <Checkbox.Group options={entrees} onChange={onChange} />
      </div>
      <OpenOrders data={items}/>
    </div>
  )

}




  export default Menu;




// const onChange = (checkedValues) => {
//   console.log('checked = ', checkedValues);
// };
// const plainOptions = ['Apple', 'Pear', 'Orange'];
// const options = [
//   {
//     label: 'Apple',
//     value: 'Apple',
//   },
//   {
//     label: 'Pear',
//     value: 'Pear',
//   },
//   {
//     label: 'Orange',
//     value: 'Orange',
//   },
// ];

// const App = () => (
//   <>
//     <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
//     <br />
//     <br />
//     <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
//     <br />
//     <br />
//     <Checkbox.Group
//       options={optionsWithDisabled}
//       disabled
//       defaultValue={['Apple']}
//       onChange={onChange}
//     />
//   </>
// );
// const ComponentDemo = App;


// createRoot(mountNode).render(<ComponentDemo />);
