import ReactMarkdown from "react-markdown";

/**
 * Renders a single chat message bubble.
 * Styles vary based on the sender and content (text/image).
 * @param {{message: {sender: 'user' | 'ai', text: string, imageUrl?: string}}} props
 */
const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";

  // Base classes from your design system for message bubbles
  const bubbleClasses =
    "px-5 py-3 rounded-2xl shadow-sm leading-relaxed max-w-lg md:max-w-xl";
  const senderClasses = isUser
    ? "bg-green-600 text-white rounded-br-none"
    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none";

  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          A
        </div>
      )}
      <div className={`${bubbleClasses} ${senderClasses}`}>
        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt="User upload"
            className="rounded-lg mb-2 max-h-64 object-cover"
          />
        )}
        {message.text && (
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => <p {...props} />,
              strong: ({ node, ...props }) => <strong {...props} />,
              em: ({ node, ...props }) => <em {...props} />,
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-5" {...props} />
              ),
              li: ({ node, ...props }) => <li {...props} />,
              a: ({ node, ...props }) => (
                <a
                  className="text-green-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  className="bg-gray-100 rounded px-1 py-0.5 text-sm"
                  {...props}
                />
              ),
            }}
          >
            {message.text}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
