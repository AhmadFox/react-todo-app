import { createContext, useState, useContext } from "react";
import Notification from '../components/ui/Notification';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

	const [ notfShow, setNotification ] = useState(false);
    const [ notfData, setNotificationData ] = useState([]);

	const hideShowNotification = (data) => {

		setNotificationData(data)
		setNotification(true);
	
		setTimeout(() => {
			setNotification(false);
		}, 3000);
	}

	return (
		<NotificationContext.Provider value={{hideShowNotification}}>
			<Notification show={notfShow} data={notfData} />
			{children}
		</NotificationContext.Provider> 
	)
};

export const useNotification = () => {
	return useContext(NotificationContext)
}