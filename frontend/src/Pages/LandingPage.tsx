import { useRef } from "react";
import Button from "../components/ui/Button";

const LandingPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-center items-center h-[90%] bg-gradient-to-br from-background to-primary">
      <div className="bg-secondary w-full max-w-md mx-auto p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-text text-center mb-8">
          Join the Chat
        </h1>
        <div className="flex flex-col gap-6">
          {/* Create Room Button */}
          <Button
            title="Create Room"
            size="lg"
            type="primary"
            onClickHandler={() => {}}
          />

          {/* Input for Room ID */}
          <div className="flex flex-col gap-3">
            <label htmlFor="room-id" className="text-sm font-medium text-text">
              Enter Room ID
            </label>
            <input
              id="room-id"
              type="text"
              maxLength={6}
              ref={inputRef}
              placeholder="e.g., 123456"
              className="p-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button
              title="Join Room"
              size="lg"
              type="send"
              onClickHandler={() => {}}
            />
          </div>

          {/* Global Chat Button */}
          <Button
            title="Global Chat"
            size="lg"
            type="secondary"
            onClickHandler={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
