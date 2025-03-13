'use client'
import React, { useState } from 'react';
import { Form, Input, Button, Select, Space, Upload, message, AutoComplete } from 'antd';
import type { UploadProps, SelectProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const options: SelectProps['options'] = [
    { label: 'Metal Casting', value: 'metal-casting' },
    { label: 'Metal Fabrication', value: 'metal-fabrication' },
    { label: 'Ground Screws', value: 'ground-screws' },
    { label: 'Quartz Stone', value: 'quartz-stone' },
    { label: 'Rubber', value: 'rubber' },
    { label: 'Plywood', value: 'plywood' },
];

const selectBefore = (
    <Select defaultValue="Mr">
        <Option value="Mr">Mr.</Option>
        <Option value="Ms">Ms.</Option>
        <Option value="Mrs">Mrs.</Option>
    </Select>
);

const selectAfter = (
    <Select defaultValue="piece">
        <Option value="piece">Piece</Option>
        <Option value="meter">Meter</Option>
        <Option value="inch">Inch</Option>
        <Option value="kilogram">Kilogram</Option>
        <Option value="pound">Pound</Option>
    </Select>
);

const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};

const CatogerySelection: React.FC = () => (
    <Space style={{ width: '100%' }} direction="vertical">
        <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={['metal-casting']}
            onChange={handleChange}
            options={options}
        />
    </Space>
);

const FormContact = () => {
    const [options, setOptions] = useState<{ value: string }[]>([]);
    
    const onSearch = (searchText: string) => {
        // Đây là danh sách các cảng phổ biến có thể xuất hiện khi người dùng nhập
        const commonPorts = [
            'Ho Chi Minh Port, Vietnam',
            'Hai Phong Port, Vietnam',
            'Da Nang Port, Vietnam',
            'Shanghai Port, China',
            'Singapore Port, Singapore',
            'Rotterdam Port, Netherlands',
            'Los Angeles Port, USA',
            'New York Port, USA',
            'Tokyo Port, Japan',
            'Busan Port, South Korea',
            'Hong Kong Port, China',
        ];
        
        setOptions(
            !searchText ? [] : commonPorts
                .filter(port => port.toLowerCase().includes(searchText.toLowerCase()))
                .map(port => ({ value: port })),
        );
    };

    return (
        <Form 
            layout="vertical"
            initialValues={{
                name: 'Your Name',
                company: 'Your Company',
                phone: 'Your Phone Number',
                email: 'Your Email',
                category: 'Your Category',
                quantity: 'Your Quantity',
                requirements: 'Your Requirements',
                location: 'Your Location',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item label="Name" name="name" style={{ flex: 1, marginRight: '1rem' }}>
                    <Input addonBefore={selectBefore} defaultValue="Your Name" />
                </Form.Item>
                <Form.Item label="Company" name="company" style={{ flex: 1, marginRight: '1rem' }}>
                    <Input placeholder="Your Company" />
                </Form.Item>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item label="Phone" name="phone" style={{ flex: 1, marginRight: '1rem' }}>
                    <Input placeholder="Your Phone Number" />
                </Form.Item>
                <Form.Item label="Email" name="email" style={{ flex: 1 }}>
                    <Input placeholder="Your Email" />
                </Form.Item>
            </div>

            <Form.Item label="Category" name="category">
                <CatogerySelection />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item label="Quantity" name="quantity" style={{ flex: 1, marginRight: '1rem' }}>
                    <Input addonAfter={selectAfter} placeholder="" />
                </Form.Item>
                <Form.Item label="Blueprint" name="blueprint" style={{ flex: 1, marginRight: '1rem' }}>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item label="Delivery port location" name="location" style={{ flex: 1, marginRight: '1rem' }}>
                    <AutoComplete
                        options={options}
                        onSearch={onSearch}
                        placeholder="Type to search for ports"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </div>

            <Form.Item label="Message" name="message">
                <Input.TextArea placeholder="Your Message" />
            </Form.Item>

            <Form.Item>
                <Button 
                    style={{ color: 'white', backgroundColor: '#b42026' }} 
                    type="primary" 
                    htmlType="submit"
                >
                    Send your RFQ
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormContact; 