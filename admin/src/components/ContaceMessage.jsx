import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMail, FiPhone, FiUser, FiMessageSquare, FiTrash2, FiClock } from 'react-icons/fi';
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';

const ContactMessage = () => {
  const baseurl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${baseurl}/api/contact`);
      setMessages(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.phone.includes(searchTerm)
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${baseurl}/api/contact/${id}`);
      setMessages(messages.filter(message => message._id !== id));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = (id) => {
    setMessages(messages.map(message =>
      message._id === id ? { ...message, read: true } : message
    ));
    if (selectedMessage && selectedMessage._id === id) {
      setSelectedMessage({ ...selectedMessage, read: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Contact Messages</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
              <div className="h-4 bg-blue-200 rounded w-32"></div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiUser className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="text-sm text-gray-600">
                {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''} found
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Message List */}
              <div className="w-full md:w-1/3 border-r border-gray-200 max-h-[600px] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No messages found
                  </div>
                ) : (
                  filteredMessages.map(message => (
                    <div
                      key={message._id}
                      className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${!message.read ? 'bg-blue-50' : ''} ${selectedMessage?._id === message._id ? 'bg-gray-100' : ''}`}
                      onClick={() => {
                        setSelectedMessage(message);
                        if (!message.read) markAsRead(message._id);
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {message.read ? (
                            <FaRegCircle className="text-gray-400" />
                          ) : (
                            <FaRegCheckCircle className="text-blue-500" />
                          )}
                          <h3 className="font-medium text-gray-800">{message.name}</h3>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(message.createdAt || message._id)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 truncate">{message.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <FiMail className="text-gray-400 text-xs" />
                        <span className="text-xs text-gray-500">{message.email}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Detail */}
              <div className="w-full md:w-2/3 p-6 max-h-[600px] overflow-y-auto">
                {selectedMessage ? (
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">{selectedMessage.name}</h2>
                        <div className="flex items-center gap-2 mt-1 text-gray-600">
                          <FiClock className="text-sm" />
                          <span className="text-sm">{formatDate(selectedMessage.createdAt || selectedMessage._id)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteMessage(selectedMessage._id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete message"
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                          <FiMail />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-gray-800">{selectedMessage.email}</p>
                        </div>
                      </div>

                      {selectedMessage.phone && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-full text-green-600">
                            <FiPhone />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="text-gray-800">{selectedMessage.phone}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3 mt-6">
                        <div className="p-2 bg-purple-100 rounded-full text-purple-600 mt-1">
                          <FiMessageSquare />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Message</p>
                          <p className="text-gray-800 whitespace-pre-line">{selectedMessage.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <FiMessageSquare className="text-4xl text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500">Select a message to read</h3>
                    <p className="text-gray-400 mt-1 max-w-md">
                      Choose a message from the list to view its contents and contact details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessage;