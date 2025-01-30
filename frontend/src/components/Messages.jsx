import React, { useState } from 'react';

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', avatar: '/api/placeholder/32/32', lastMessage: 'Hey, how are you?', unread: 2 },
    { id: 2, name: 'Jane Smith', avatar: '/api/placeholder/32/32', lastMessage: 'The meeting is at 3 PM', unread: 0 },
    { id: 3, name: 'Mike Johnson', avatar: '/api/placeholder/32/32', lastMessage: 'Thanks for your help!', unread: 1 },
  ]);
  const [messages, setMessages] = useState([
    { id: 1, senderId: 1, text: 'Hey, how are you?', timestamp: '10:00 AM' },
    { id: 2, senderId: 'me', text: 'I\'m good, thanks! How about you?', timestamp: '10:02 AM' },
    { id: 3, senderId: 1, text: 'Doing great! Had a question about the project.', timestamp: '10:05 AM' },
  ]);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedContact) {
      const newMessage = {
        id: messages.length + 1,
        senderId: 'me',
        text: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r bg-white">
        <div className="p-4">
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            <input
              type="text"
              className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Search contacts..."
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-full">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                selectedContact?.id === contact.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{contact.name}</h3>
                    {contact.unread > 0 && (
                      <span className="bg-blue-500 text-white px-2 rounded-full text-xs">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="font-semibold">{selectedContact.name}</h2>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === 'me' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.senderId === 'me'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  📤
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;