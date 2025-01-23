// Chat user type definition
export class ChatUser {
  id = '';
  name = '';
  avatar = '';
  status = 'offline';
  lastSeen = null;
  unreadCount = 0;
}

// Message type definition
export class Message {
  id = '';
  senderId = '';
  content = '';
  timestamp = '';
  read = false;
}
