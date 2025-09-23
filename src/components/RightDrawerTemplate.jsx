import { useEffect, useState } from 'react';
import { Drawer } from "antd";
import cancelIconUrl from '../assets/images/icons/x.svg';
const RightDrawerTemplate = ({ closeDrawer, openDrawer, width, title, children, sm = false }) => {

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        if (sm) {
            const handleResize = () => {
                setIsSmallScreen(window.innerWidth <= 768);
            };

            handleResize();

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [sm]);
    return (
        <Drawer
            placement={
                sm && isSmallScreen ? "bottom" : "right"
            }
            onClose={closeDrawer}
            open={openDrawer}
            width={width}
            className=""
            height="80%"
        >
            <div className="w-full px-0">
                <div className="flex justify-between items-center px-3 py-3">
                    <h2 className="text-xl"> {title} </h2>
                    <img src={cancelIconUrl} onClick={closeDrawer} className="cursor-pointer w-[28px] h-auto" alt="close" />
                </div>
                <hr />
                <div className='px-3'>
                    {children}
                </div>
            </div>
        </Drawer>
    );
};

export default RightDrawerTemplate;
