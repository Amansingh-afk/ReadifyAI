import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();

  return (
    <ScrollArea className="min-w-full bg-background">
      <div className="flex max-h-screen">
        <div className="w-full max-h-screen">
          <ResizablePanelGroup direction="horizontal">
            {/* chat sidebar */}
            <ResizablePanel defaultSize={24}>
              <div className="max-w-xs">
                <ChatSideBar
                  chats={_chats}
                  chatId={parseInt(chatId)}
                  isPro={isPro}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />
            {/* pdf viewer */}
            <ResizablePanel defaultSize={36}>
              <div className="max-h-screen p-4">
                <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />
            {/* chat component */}
            <ResizablePanel defaultSize={40}>
              <div className="">
                <ChatComponent chatId={parseInt(chatId)} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ChatPage;
