import { Button, Modal } from 'antd';
import React from 'react';

const InfoModal = ({ title, desc, visible, onClose, lists = [] }) => {
    return (
        <Modal centered={true} open={visible} onCancel={onClose} footer={null}>
            <h2>{title}</h2>
            <p>{desc}</p>
            <ul>
                {lists.map((list, index) => (
                    <li key={index} style={{ listStyle: "none", display: "flex", alignItems: "center" }}>

                        <span dangerouslySetInnerHTML={{ __html: list.content }} />
                    </li>
                ))}
            </ul>
            <Button onClick={onClose}>Cancel</Button>
        </Modal>
    );
};

export default InfoModal;