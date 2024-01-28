"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Home, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import SubscriptionButton from "./SubscriptionButton";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  return (
    <ScrollArea className="border">
      <div className="w-full h-screen p-4 text-gray-200">
        <Link href="/">
          <Button className="w-full">
            <PlusCircle className="mr-2 w-4 h-4 animate-pulse" />
            New Chat
          </Button>
        </Link>

        <div className="flex max-h-screen pb-20 flex-col gap-2 mt-4">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div
                className={cn(
                  "rounded-lg p-3 text-slate-300 flex items-center",
                  {
                    "bg-secondary text-secondary-foreground":
                      chat.id === chatId,
                    "hover:bg-secondary text-secondary-foreground":
                      chat.id !== chatId,
                  }
                )}
              >
                {/* <MessageSquare className="mr-2" /> */}
                <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                  {chat.pdfName}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {/* <div className="absolute bottom-4 left-4 w-full">
          <div className="flex items-center p-4 gap-2 text-sm text-slate-500 flex-wrap">
            <SubscriptionButton isPro={isPro} />
            <Link href="/">
              <Button variant="outline" className="text-primary">
                Home
                <Home className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div> */}
      </div>
    </ScrollArea>
  );
};

export default ChatSideBar;
