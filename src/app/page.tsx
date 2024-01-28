import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, LogIn, CalendarDays, Github, Rocket } from "lucide-react";
import FileUpload from "@/components/FIleUpload";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ModeToggle } from "@/components/theme-toggle";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="w-screen min-h-screen ">
      <div className="flex justify-between fixed top-4 right-4">
        <div className="mr-2">
          <Link
            href={"https://github.com/Amansingh-afk/ReadifyAI"}
            target="_blank"
          >
            <Button variant="outline" size="icon">
              <Github />
            </Button>
          </Link>
        </div>
        <ModeToggle />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center">
                <h1 className="mr-3 text-5xl font-semibold">Readify AI</h1>
                <UserButton afterSignOutUrl="/" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Readify AI</h4>
                  <p className="text-sm">
                    Just a fun project to make reading easier! – created and
                    maintained by @aman.singh
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Joined December 2023
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <div className="flex mt-2">
            {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button className="hover:scale-105">
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <div className="ml-3">
                  <SubscriptionButton isPro={isPro} />
                </div>
              </>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg">
            ReadifyAI - Your AI-powered PDF sidekick.
            <br></br>Make PDFs smarter: summarizing, annotating, and more.
            {/* <br></br>Just a fun project to make reading easier! */}
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <Alert className="bg-accent">
          <Rocket className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You have only 5 free queries, Consider upgrading to our pro
            version.
          </AlertDescription>
        </Alert>
      </div>
      <div className="area bg-bgcustom">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
