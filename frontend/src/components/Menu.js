import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OpenOrders from './OpenOrders';
import {  Button, Checkbox, Input, Select, Row, Col  } from 'antd';
import './components.css';
const { Option } = Select;


function Menu() {
  const [beverages, setBeverages] = useState([])
  const [sides, setSides] = useState([])
  const [entrees, setEntrees] = useState([])
  const [items, setItems] = useState([])


  const handleSubmit = () => {
    setItems([])
  }

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

  // console.log(beverages)

  const onChange = (checkedValues) => {
    let item_list;
    item_list = items;
    item_list.push(checkedValues[0]);
    setItems(item_list);
    console.log(items)
  }
  // console.log(items)

  return (
    <div className='ParentChild'>
      <div className='Menu'>
        <div className='MenuType1'>
          <p className='MenuTitle1'>Entrees</p>
          <Checkbox.Group options={entrees} onChange={onChange} />
        </div>
        <div className='MenuType2'>
          <p className='MenuTitle2'>Sides</p>
          <Checkbox.Group options={sides} onChange={onChange} />
        </div>
        <div className='MenuType3'>
          <p className='MenuTitle3'>Beverages</p>
          <Checkbox.Group options={beverages} onChange={onChange} />
        </div>
        <Button className='MenuButton' onClick={handleSubmit}>Reset</Button>
      </div>
      <div className='OrderList'>
        <OpenOrders data={items}/>
      </div>
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
