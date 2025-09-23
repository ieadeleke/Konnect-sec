import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const UnderConstruction = () => {
    return (
        <>
            <div style={{ height: "100vh", background: "rgba(0,0,0,0.2)" }}></div>
            <div style={{ width: "100%", height: "100vh", position: "absolute", top: "0", left: "0", display: "flex" }}>
                <div style={{ width: "fit-content", background: 'white', margin: "auto", zIndex: "100" }}>
                    <Result
                        status="error"
                        title="This page is under construction"
                        subTitle=""
                        extra={[<Link to='/profile/loyalty'><Button>Go Back</Button></Link>]}
                    />
                </div>
            </div>
        </>
    )
}

export default UnderConstruction