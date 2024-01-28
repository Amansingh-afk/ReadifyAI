"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Rocket } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Message } from "ai";
import { toast } from "react-hot-toast";
import MessageList from "./MessageList";
import axios from "axios";
import SubscriptionButton from "./SubscriptionButton";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  const [showInput, setShowInput] = React.useState(true);

  React.useEffect(() => {
    // Count the number of messages with role 'user'
    const userMessages = messages.filter((message) => message.role === "user");

    if (userMessages.length >= 5) {
      setShowInput(false);
      toast(
        (t) => (
          <span>
            You have finished <b>5/5 free questions. </b>
            Consider upgrading to our <b>Pro version.</b>
          </span>
        ),
        { icon: "👏" }
      );
    }
  }, [messages]);

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <ScrollArea className="border">
      <div className="relative h-screen" id="message-container">
        {/* header */}
        <div
          className="sticky top-0  px-2 py-1 h-fit bg-primary text-primary-foreground"
          style={{ zIndex: 10000 }}
        >
          <h3 className="flex items-center text-xl font-bold">
            <img
              className="rounded-xl mr-2"
              src="https://cdn-icons-gif.flaticon.com/12544/12544440.gif"
              width="40"
            />{" "}
            Readify AI
          </h3>
        </div>

        {/* message list */}
        <MessageList messages={messages} isLoading={isLoading} />
        {showInput && (
          <form
            onSubmit={handleSubmit}
            className="sticky bottom-0 inset-x-0 px-2 py-4"
          >
            <div className="flex">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask any question..."
                className="w-full"
              />
              <Button
                variant="outline"
                className="bg-muted text-muted-foreground ml-2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </ScrollArea>
  );
};

export default ChatComponent;
