import React, { useState, useRef, useEffect } from 'react';
import './DirectMessages.css';

function DirectMessages({ conversations, currentUser, selectedUser, onUserSelect, onSendMessage, theme, defaultAvatar }) {
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedUser, conversations]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      const conversation = conversations.find(conv => 
        conv.participants.some(p => p.id === selectedUser.id) && 
        conv.participants.some(p => p.id === currentUser.id)
      );
      
      if (conversation) {
        onSendMessage(conversation.id, newMessage);
        setNewMessage('');
      }
    }
  };

  const getOtherParticipant = (conversation) => {
    return conversation.participants.find(p => p.id !== currentUser.id);
  };

  const filteredConversations = conversations.filter(conv => {
    if (!searchTerm) return true;
    const otherUser = getOtherParticipant(conv);
    return otherUser.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           otherUser.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectedConversation = selectedUser ? 
    conversations.find(conv => 
      conv.participants.some(p => p.id === selectedUser.id) && 
      conv.participants.some(p => p.id === currentUser.id)
    ) : null;

  return (
    <div className={`direct-messages ${theme}`}>
      <div className="messages-container">
        {/* Conversations List */}
        <div className="conversations-sidebar">
          <div className="conversations-header">
            <h2>Messages</h2>
            <div className="search-conversations">
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="conversation-search"
              />
            </div>
          </div>
          
          <div className="conversations-list">
            {filteredConversations.length === 0 ? (
              <div className="no-conversations">
                <p>No conversations found</p>
              </div>
            ) : (
              filteredConversations
                .sort((a, b) => new Date(b.lastMessage) - new Date(a.lastMessage))
                .map(conversation => {
                  const otherUser = getOtherParticipant(conversation);
                  const lastMessage = conversation.messages[conversation.messages.length - 1];
                  const isSelected = selectedUser && selectedUser.id === otherUser.id;
                  
                  return (
                    <div
                      key={conversation.id}
                      className={`conversation-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => onUserSelect(otherUser)}
                    >
                      <img
                        src={otherUser.profilePicture || defaultAvatar}
                        alt={otherUser.displayName}
                        className="conversation-avatar"
                      />
                      <div className="conversation-info">
                        <div className="conversation-name">
                          {otherUser.displayName}
                          {otherUser.isBot && <span className="bot-badge">Bot</span>}
                        </div>
                        <div className="conversation-preview">
                          {lastMessage ? (
                            <>
                              <span className="last-message">
                                {lastMessage.sender.id === currentUser.id ? 'You: ' : ''}
                                {lastMessage.content}
                              </span>
                              <span className="last-time">{formatTime(lastMessage.timestamp)}</span>
                            </>
                          ) : (
                            <span className="no-messages">No messages yet</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {selectedUser ? (
            <>
              <div className="chat-header">
                <img
                  src={selectedUser.profilePicture || defaultAvatar}
                  alt={selectedUser.displayName}
                  className="chat-avatar"
                />
                <div className="chat-user-info">
                  <h3>{selectedUser.displayName}</h3>
                  <p>@{selectedUser.username}</p>
                  {selectedUser.isBot && <span className="bot-status">Bot • Online</span>}
                </div>
              </div>

              <div className="messages-area">
                {selectedConversation && selectedConversation.messages.length > 0 ? (
                  selectedConversation.messages.map(message => (
                    <div
                      key={message.id}
                      className={`message ${message.sender.id === currentUser.id ? 'sent' : 'received'}`}
                    >
                      {message.sender.id !== currentUser.id && (
                        <img
                          src={message.sender.profilePicture || defaultAvatar}
                          alt={message.sender.displayName}
                          className="message-avatar"
                        />
                      )}
                      <div className="message-content">
                        <div className="message-bubble">
                          <p>{message.content}</p>
                        </div>
                        <span className="message-time">{formatTime(message.timestamp)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-messages">
                    <div className="no-messages-icon">💬</div>
                    <h3>Start a conversation</h3>
                    <p>Send a message to {selectedUser.displayName} to get started!</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="message-input-form">
                <div className="message-input-container">
                  <input
                    type="text"
                    placeholder={`Message ${selectedUser.displayName}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="message-input"
                  />
                  <button type="submit" className="send-button" disabled={!newMessage.trim()}>
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="no-chat-icon">💬</div>
              <h3>Select a conversation</h3>
              <p>Choose a conversation from the sidebar to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DirectMessages;
