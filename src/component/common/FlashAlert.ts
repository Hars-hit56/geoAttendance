import { StatusBar } from 'react-native';
import { MessageType, showMessage } from 'react-native-flash-message';

const flashMessage = (
  message: string,
  type: MessageType,
  description?: string,
) =>
  showMessage({
    message: message,
    description: description,
    type: type,
    icon: type,
    position: 'top',
    statusBarHeight: StatusBar.currentHeight,
  });
export default flashMessage;
