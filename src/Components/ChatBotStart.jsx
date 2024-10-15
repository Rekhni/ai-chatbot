import './ChatBotStart.css';

// eslint-disable-next-line react/prop-types
const ChatBotStart = ({ onChatStart }) => {
  return (
    <div className="start-page">
        <button className="start-page-btn" onClick={onChatStart}>Chat AI</button>
    </div>
  )
}

export default ChatBotStart