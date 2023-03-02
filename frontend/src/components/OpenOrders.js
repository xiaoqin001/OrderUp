import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Avatar, Button, List, Skeleton  } from 'antd';
import Menu from './Menu';




function OpenOrders(props) {
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    console.log(props)

    useEffect(() => {
        axios.get('/order')
        .then((response)=>{
            console.log(response.data)
            setData(response.data);
            setList(response.data);
        })
        .catch((error)=>{
            console.log(error)
        });
    },[]);


    const handleClose = async (orderId) => {
        // event.preventDefault();
        console.log('submit')
        console.log(orderId)
        await axios.delete('/order', {
            data:{
                order_id: orderId
            }
        },{
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        });
    }
    const handleOrder = () => {}

    return(
        <div>
        <p>order list</p>
        <List
            itemLayout="horizontal"
        // size="large"
        // pagination={{
        //   onChange: (page) => {
        //     console.log(page);
        //   },
        //   pageSize: 5,
        // }}
            bordered={true}
            dataSource={list}
        // footer={
        //   <div>
        //     <b>ant design</b> footer part
        //   </div>
        // }

            renderItem={(item) => (
                // <List.Item actions={[<Button onClick={handleClose}>CLOSE TABLE</Button>]}>
                <List.Item>
                    <div>{`Table ${item.table_id}`}</div>
                    <div>price</div>
                    <div className='testButton'>
                        <Button onClick={(e)=>{handleClose(item.order_id)}}>CLOSE TABLE</Button>
                    </div>
                    <Button htmlType="button" onClick={(e)=>{handleOrder(item.order_id)}} >ADD TO ORDER</Button>
                </List.Item>
          )}
      />
      </div>
    )
}

export default OpenOrders;



// const { createRoot } = ReactDOM;
// const {  Avatar, Button, List, Skeleton  } = antd;
// const {  useEffect, useState  } = React;;
// const count = 3;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
// const App = () => {
//   const [initLoading, setInitLoading] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [list, setList] = useState([]);
//   useEffect(() => {
//     fetch(fakeDataUrl)
//       .then((res) => res.json())
//       .then((res) => {
//         setInitLoading(false);
//         setData(res.results);
//         setList(res.results);
//       });
//   }, []);
//   const onLoadMore = () => {
//     setLoading(true);
//     setList(
//       data.concat(
//         [...new Array(count)].map(() => ({
//           loading: true,
//           name: {},
//           picture: {},
//         })),
//       ),
//     );
//     fetch(fakeDataUrl)
//       .then((res) => res.json())
//       .then((res) => {
//         const newData = data.concat(res.results);
//         setData(newData);
//         setList(newData);
//         setLoading(false);
//         window.dispatchEvent(new Event('resize'));
//       });
//   };
//   const loadMore =
//     !initLoading && !loading ? (
//       <div
//         style={{
//           textAlign: 'center',
//           marginTop: 12,
//           height: 32,
//           lineHeight: '32px',
//         }}
//       >
//         <Button onClick={onLoadMore}>loading more</Button>
//       </div>
//     ) : null;
//   return (
//     <List
//       className="demo-loadmore-list"
//       loading={initLoading}
//       itemLayout="horizontal"
//       loadMore={loadMore}
//       dataSource={list}
//       renderItem={(item) => (
//         <List.Item
//           actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
//         >
//           <Skeleton avatar title={false} loading={item.loading} active>
//             <List.Item.Meta
//               avatar={<Avatar src={item.picture.large} />}
//               title={<a href="https://ant.design">{item.name?.last}</a>}
//               description="Ant Design, a design language for background applications, is refined by Ant UED Team"
//             />
//             <div>content</div>
//           </Skeleton>
//         </List.Item>
//       )}
//     />
//   );
// };
// const ComponentDemo = App;


// createRoot(mountNode).render(<ComponentDemo />);
