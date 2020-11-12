import { Toast } from 'materialize-css';

const toast = (message: string) => {
  Toast.dismissAll();
  new Toast({
    html: message,
  });
};

export default toast;
