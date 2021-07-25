import { notification } from 'antd';

const NotificationService = {
    notify: (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
            placement: 'bottomRight',
        });
    }
}

export default NotificationService;