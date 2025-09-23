import { notification } from "antd";
export const openNotificationWithIcon = (type, title, message = "") => {
	notification[type]({message: title, placement: 'bottomRight', description: message, });
};