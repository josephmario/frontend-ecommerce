import React, {useState, useEffect} from 'react'
import '../css/Dashboard.css';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Button, Space, message, Input } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Highlighter from 'react-highlight-words';

function Dashboard() {
    const history = useHistory();
    const [customer, setCustomer] = useState([]);
    console.log(customer)
    //Product
    const [searchInputProduct, setsearchInputProduct] = useState('')
    const [searchTextProduct, setsearchTextProduct] = useState('')
    const [searchedColumnProduct, setsearchedColumnProduct] = useState('')
    
    //Status
    const [searchInputStatus, setsearchInputStatus] = useState('')
    const [searchTextStatus, setsearchTextStatus] = useState('')
    const [searchedColumnStatus, setsearchedColumnStatus] = useState('')

    //OrderNum
    const [searchInputOrderNum, setsearchInputOrderNum] = useState('')
    const [searchTextOrderNum, setsearchTextOrderNum] = useState('')
    const [searchedColumnOrderNum, setsearchedColumnOrderNum] = useState('')

    useEffect(() => {
        const list_order = process.env.REACT_APP_ECOMMERCE_SECRET_BASEURL + "order"
        axios.get(list_order, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(response => {
            setCustomer(response.data)
        });
    }, [])

    //Product
    const handleSearchProduct = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setsearchTextProduct(selectedKeys[0])
        setsearchedColumnProduct('full_name')
    }

    //Status
    const handleSearchStatus = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setsearchTextStatus(selectedKeys[0])
        setsearchedColumnStatus('status')
    }

    //OrderNum
    const handleSearchOrderNum = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setsearchTextOrderNum(selectedKeys[0])
        setsearchedColumnOrderNum('order_number')
    }

    const columnsSelected = [
        {
            title: "Order Number",
            dataIndex: 'order_number',
            key: 'order_number',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => {
                            setsearchInputOrderNum(node);
                        }}
                        placeholder={'Search Order Number'}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearchOrderNum(selectedKeys, confirm, 'order_number')}
                    />
                    <Space>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                            onClick={() => handleSearchOrderNum(selectedKeys, confirm, 'order_number')}
                        >
                            Search
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => (record['order_number']) ? record['order_number'].toString().toLowerCase().includes(value.toLowerCase()) : '',
            onFilterDropdownVisibleChange: visible =>{
                if(visible) {
                    setTimeout(() => searchInputOrderNum, 100);
                }
            },
            render: text =>
                searchedColumnOrderNum === 'order_number' ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchTextOrderNum]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                ),
        },
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
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => {
                            setsearchInputProduct(node);
                        }}
                        placeholder={'Search Product Name'}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearchProduct(selectedKeys, confirm, 'product_name')}
                    />
                    <Space>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                            onClick={() => handleSearchProduct(selectedKeys, confirm, 'product_name')}
                        >
                            Search
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => (record['product_name']) ? record['product_name'].toString().toLowerCase().includes(value.toLowerCase()) : '',
            onFilterDropdownVisibleChange: visible =>{
                if(visible) {
                    setTimeout(() => searchInputProduct, 100);
                }
            },
            render: text =>
                searchedColumnProduct === 'product_name' ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchTextProduct]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                ),
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
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => {
                            setsearchInputStatus(node);
                        }}
                        placeholder={'Search Status'}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearchStatus(selectedKeys, confirm, 'status')}
                    />
                    <Space>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                            onClick={() => handleSearchStatus(selectedKeys, confirm, 'status')}
                        >
                            Search
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => (record['status']) ? record['status'].toString().toLowerCase().includes(value.toLowerCase()) : '',
            onFilterDropdownVisibleChange: visible =>{
                if(visible) {
                    setTimeout(() => searchInputStatus, 100);
                }
            },
            render: text =>
                searchedColumnStatus === 'status' ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchTextStatus]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                ),
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
        const list_order = process.env.REACT_APP_ECOMMERCE_SECRET_BASEURL + `order_status/${res.order_id}`
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
