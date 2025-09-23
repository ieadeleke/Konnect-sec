import React from 'react'

const AlertModal = ({ children, title, desc }) => {
    return (
        <div>
            <div className="" style={{ maxWidth: "420px" }}>
                <div className="">
                    <div className="aut">
                        <div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlertModal