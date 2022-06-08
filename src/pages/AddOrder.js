import React, {useState, useEffect} from 'react'
import '../css/Dashboard.css';
import { Form, Button, Input, Select, message } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
function AddOrder() {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [product, setProduct] = useState([]);
    const history = useHistory();
    useEffect(() => {
        const list_order = process.env.REACT_APP_ECOMMERCE_SECRET_BASEURL + "product"
        axios.get(list_order, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(response => {
            setProduct(response.data)
        });
    }, [])


    const onFinish = (values: any) => {
        console.log(values)
        product.filter(product_list => product_list.product_code === values.product_id).map((filterProduct) => {
            values.gross_sale = filterProduct.price * Number(values.quantity)
        })
        
        values.order_number = (Math.floor(Math.random() * (1000000 - 1 + 1)) + 1)
        const list_order = process.env.REACT_APP_ECOMMERCE_SECRET_BASEURL + "order"
        axios.post(list_order, {
            'customer_code': 1,
            'order_number': values.order_number,
            'status': 'Created',
            'quantity': values.quantity,
            'product_code': values.product_id,
            'gross_sale': values.gross_sale
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
                message.success({content: 'Successfully Added', duration: 2});
                history.push('/');
            }
            // setCustomer(response.data)
        });
    };

    const backBtn = () => {
        history.push('/');
    }

    return (
        <div style={{width: '50%', padding: 10, margin: 0}}>
            <Button type='primary' onClick={backBtn}>Back</Button>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ product_id: '', quantity: 0 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                label="Product"
                name="product_id"
                rules={[{ required: true, message: 'Please input your Product' }]}
                >
                <Select
                    placeholder="Select a Product"
                    allowClear
                >
                    {product && product.map((res) => {
                        <Option disabled>Select a Product</Option>
                        return(<>
                            <Option value={res.product_code}>{res.product_name}</Option>
                        </>)
                    })}
                </Select>
                </Form.Item>
        
                <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: 'Please input your Quantity' }]}
                >
                <Input />
                </Form.Item>
        
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
        </div>
        
    )
}

export default AddOrder
