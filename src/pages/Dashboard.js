import React, {useState, useEffect} from 'react'
import '../css/Dashboard.css';
import { Table, Button, Space, message } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Dashboard() {
    const history = useHistory();
    const [customer, setCustomer] = useState([]);
    useEffect(() => {
        const list_order = process.env.REACT_APP_ECOMMERCE_SECRET_BASEURL + "order"
        axios.get(list_order, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(response => {
            setCustomer(response.data)
        });
    }, [])

    
    const columnsSelected = [
        {
            title: "Name",
            dataIndex: 'name',
            key: 'name',
            // sorter: (a, b) => a.name - b.name,
        },
        {
            title: "Product Name",
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: "Price",
            dataIndex: 'price',
            key: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
  
        },
        {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: "Quantity",
            dataIndex: 'quantity',
            key: 'quantity',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: "gross_sale",
            dataIndex: 'gross_sale',
            key: 'gross_sale',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.gross_sale - b.gross_sale,
        },
        {
            title: "Action",
            render: (row,id) => <div><Space>
                <Button type="primary"onClick={() => {
                    editBtn(row);
                }}>Edit</Button>
                <Button type="danger" onClick={() => {
                    cancelBtn(row);
                }}>Cancel</Button></Space>
            </div>,
        },
    ];

    const editBtn = (res) => {
        console.log(res)
        history.push(`/update_order/${res.product_name}/${res.quantity}/${res.order_detail_id}`);
    }
    const cancelBtn = (res) => {
        // history.push(`/cancel_order/${res.order_detail_id}`);
        const list_order = process.env.REACT_APP_ECOMMERCE_SECRET_BASEURL + `order/${res.order_id}`
        axios.put(list_order, {
            'status': 'Cancelled',
        }, 
        { 
            headers: 
                { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
        })
        .then(response => {
            if(response.status === 200){
                message.success({content: 'Successfully Cancel', duration: 2});
                history.push('/');
            }
            // setProduct(response.data)
        });
    }
    const addOrder = () => {
        history.push('/add_order');
    }
    return (
        <div>
            <Button type="primary" onClick={addOrder}>Add Order</Button>
            <Table
                dataSource={customer}
                columns={columnsSelected}
                size="small"
            />
        </div>
    )
}

export default Dashboard
