// import ChatBotStart from "./Components/ChatBotStart";
import { useEffect, useState } from "react";
import ChatBotApp from "./Components/ChatBotApp";
import ChatBotStart from "./Components/ChatBotStart";
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [isChatting, setIsChatting] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
    setChats(storedChats);

    if (storedChats.length > 0) {
      setActiveChat(storedChats[0].id);
    }
  }, [])

  function handleStartChat() {
    setIsChatting(true);

    if (chats.length === 0) {
      createNewChat();
    }
  }

  function handleGoBack() {
    setIsChatting(false);
  }

  function createNewChat(initialMessage = '') {
    const newChat = {
      id: uuidv4(),
      displayId: `Chat ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString()}`,
      messages: initialMessage ? [{ type: 'prompt', text: initialMessage, timestamp: new Date().toLocaleTimeString() }] : [],
    }

    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    localStorage.setItem('chats', JSON.stringify(updatedChats));
    localStorage.setItem(newChat.id, JSON.stringify(newChat.messages));
    setActiveChat(newChat.id);
  }

  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp
          onGoBack={handleGoBack}
          chats={chats}
          setChats={setChats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          onNewChat={createNewChat}
        />
      ) : (
        <ChatBotStart onChatStart={handleStartChat} />
      )}
    </div>
  );
};

export default App;
