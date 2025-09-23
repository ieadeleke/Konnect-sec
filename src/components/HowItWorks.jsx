import { Button, Modal } from 'antd'
import { useState } from 'react'

const HowItWorks = ({ data }) => {
    const [howItWorks, setHowItWorks] = useState(false)
    return (
        <>
            <button onClick={() => { setHowItWorks(true) }} style={{ width: "fit-content ", background: "transparent", border: "none", outline: "none", color: "#1890ff" }}>(How it works)</button>
            <Modal centered={true} title="" open={howItWorks} footer={null} className="pb-5 pt-5">
                <h2>{data?.title}</h2>
                <p>{data?.description}</p>
                <ul>
                    {data?.lists.map((list, index) => (
                        <li key={index} style={{ listStyle: "none", display: "flex", alignItems: "center" }}>
                            <ion-icon name="checkmark-circle-outline" style={{ marginRight: "8px" }}></ion-icon>
                            <span dangerouslySetInnerHTML={{ __html: list.content }} />
                        </li>
                    ))}
                </ul>
                <Button onClick={() => setHowItWorks(false)}>Close</Button>
            </Modal>
        </>
    )
}

export default HowItWorks