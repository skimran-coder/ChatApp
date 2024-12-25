import { useRef } from "react";
import Button from "../components/ui/Button";

const ChatPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-primary to-background shadow-lg h-[90%]">
      <div className="w-full max-w-lg h-5/6 bg-primary rounded-lg shadow-xl flex flex-col">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold text-center">Chat Room</h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 h-5/6">
          {/* Example Messages */}
          <div className="flex justify-start">
            <div className="bg-gray-200 p-3 rounded-lg max-w-xs text-sm">
              Hey there! How are you?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-600 bg-opacity-90 text-white p-3 rounded-lg max-w-xs text-sm">
              I'm good, thanks! How about you?
            </div>
          </div>
          {/* Add more messages dynamically */}
        </div>

        <div className="p-4 bg-secondary border-t border-secondary flex items-center space-x-3">
          <input
            type="text"
            ref={inputRef}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
          />
          <Button
            onClickHandler={() => {}}
            title="Send"
            size="md"
            type="send"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
