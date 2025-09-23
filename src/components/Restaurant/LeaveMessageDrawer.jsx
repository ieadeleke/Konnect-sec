import { useState } from 'react';
import { Drawer, Input, Button, Checkbox } from 'antd';
import sendIcon from "../../assets/images/restaurant/send-o.svg";
import RightDrawerTemplate from "../../components/RightDrawerTemplate";
const LeaveMessageDrawer = () => {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [saveToList, setSaveToList] = useState(false);


    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const closeDrawer = () => {
        setIsDrawerVisible(false);
        setMessage(""); 
        setSaveToList(false); 
    };

    const handleAddNote = () => {
        console.log(`Message: ${message}`);
        console.log(`Save to list: ${saveToList}`);

        closeDrawer();
    };

    return (
        <>
            <div className="my-10">
                <div className="flex items-center justify-between py-2">
                    <p>Leave a message for the restaurant</p>
                    <span onClick={showDrawer} style={{ cursor: 'pointer' }}>
                        <img src={sendIcon} alt="Send Icon" className="w-8 h-8" />
                      </span>
                </div>
            </div>

            <RightDrawerTemplate closeDrawer={closeDrawer}
                                 openDrawer={isDrawerVisible}
                                 width={350} title={"Note for restaurant"}>
                <div className={"mt-10"}>
                    <Input.TextArea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        placeholder="Write your message here.   .."
                        style={{
                            borderRadius: '8px',
                            borderColor: '#000',
                            fontSize: '14px',
                            padding: '10px',
                        }}
                    />

                    <div className="mt-4">
                        <Checkbox
                            checked={saveToList}
                            onChange={(e) => setSaveToList(e.target.checked)}
                            style={{fontSize: '14px'}}
                        >
                            Save note to list
                        </Checkbox>
                    </div>

                    <div className="my-3 flex justify-end">
                        <button
                            type="primary"
                            onClick={handleAddNote}
                            disabled={!message.trim()} 
                            className="bg-[#44843F] text-white rounded-3xl border-2 border-black px-40 my-10 py-3"
                        >
                            Add Note
                        </button>
                    </div>
                </div>
            </RightDrawerTemplate>
        </>
    );
};

export default LeaveMessageDrawer;
