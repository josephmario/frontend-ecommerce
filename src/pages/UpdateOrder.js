import React, {useState, useEffect} from 'react'
import '../css/Dashboard.css';
import { Form, Button, Input, Select, message } from 'antd';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
function UpdateOrder() {
    const { Option } = Select;
    // const [form] = Form.useForm();
    const [product, setProduct] = useState([]);
    const history = useHistory();
    const { product_name, quantity, order_detail_id } = useParams();

    useEffect(() => {
        axios.get(process.env.REACT_APP_ECOMMERCE_SECRET_BASEURL + "product", { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(response => {
            setProduct(response.data)
        });
    }, [])

    const onFinish = (values: any) => {
        product.filter(product_list => product_list.product_name === values.product_name).map((filterProduct) => {
            values.gross_sale = filterProduct.price * Number(values.quantity)
            values.product_id = filterProduct.product_code
        })
        
        
        const list_order = process.env.REACT_APP_ECOMMERCE_SECRET_BASEURL + `order/${order_detail_id}`
        axios.put(list_order, {
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
                message.success({content: 'Successfully Updated', duration: 2});
                history.push('/');
            }
            // setProduct(response.data)
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
                initialValues={{  product_name: product_name, quantity: quantity }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                label="Product"
                name="product_name"
                rules={[{ required: true, message: 'Please input your Product' }]}
                >
                <Select
                    placeholder="Select a Product"
                    allowClear
                >
                    <Option disabled>Select a Product</Option>
                    {product && product.map((res) => {
                        if(product_name === res.product_name){
                            return(<>
                                <Option key={res.product_name}>{res.product_name}</Option>
                            </>)
                        }else{
                            return(<>
                                <Option value={res.product_name}>{res.product_name}</Option>
                            </>)
                        }
                        
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

export default UpdateOrder
