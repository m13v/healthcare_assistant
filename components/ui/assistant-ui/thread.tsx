import {
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import React, { PropsWithChildren, type FC } from "react";
import Image from 'next/image';
import nurseImage from '@/public/nurse.png';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ArrowDownIcon, SendHorizonalIcon } from "lucide-react";

export const Thread: FC = () => {
  return (
    <TooltipProvider>
      <ThreadPrimitive.Root className="flex h-full flex-col items-center pb-3">
        <ThreadPrimitive.Viewport className="flex w-full grow flex-col items-center overflow-y-scroll scroll-smooth px-4 pt-12">
          <ThreadPrimitive.Empty>
            <ThreadEmpty />
          </ThreadPrimitive.Empty>

          <ThreadPrimitive.Messages
            components={{
              UserMessage,
              AssistantMessage,
            }}
          />
          <ThreadScrollToBottom />
        </ThreadPrimitive.Viewport>

        {/* Add ThreadSuggestions above the Composer */}
        <div className="w-full px-4 mb-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <ThreadSuggestion prompt="How Bonsai works?">
              <p className="font-semibold">How Bonsai works?</p>
            </ThreadSuggestion>
            <ThreadSuggestion prompt="Frequently Asked Questions">
              <p className="font-semibold">Frequently Asked Questions</p>
            </ThreadSuggestion>
            <ThreadSuggestion prompt="Pricing">
              <p className="font-semibold">Pricing</p>
            </ThreadSuggestion>
            <ThreadSuggestion prompt="Prescription shipment">
              <p className="font-semibold">Prescription shipment</p>
            </ThreadSuggestion>
            <ThreadSuggestion prompt="Get started">
              <Button variant="outline" className="flex-1 h-12 outline-none" style={{ backgroundColor: '#00C9A7', color: '#FFFFFF' }}>
                <p className="font-semibold">Get started</p>
              </Button>
            </ThreadSuggestion>
          </div>
        </div>

        <Composer />
      </ThreadPrimitive.Root>
    </TooltipProvider>
  );
};


const ThreadEmpty: FC = () => {
  return (
    <div className="w-full max-w-2xl flex flex-col grow py-6 px-4">
      <div className="relative flex grow flex-col items-center justify-center overflow-visible">
        <Image
          src={nurseImage}
          alt="Nurse"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-[-1]"
        />
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">Weight loss</span> without the <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-400">needle</span>
        </h1>
        <p className="mt-4 text-xl text-center text-shadow"><strong>No injections. No cravings.</strong></p>
        <p className="mt-4 text-xl text-center text-shadow"><strong>Oral medication only.</strong></p>
        <p className="mt-4 text-xl text-center text-shadow"><strong>No insurance needed.</strong></p>
      </div>
    </div>
  );
};

const ThreadSuggestion: FC<PropsWithChildren<{ prompt: string }>> = ({ prompt, children }) => {
  return (
    <ThreadPrimitive.Suggestion prompt={prompt} method="replace" autoSend asChild>
      <Button variant="outline" className="flex-1 h-12">
        {children}
      </Button>
    </ThreadPrimitive.Suggestion>
  )
}

const getStartedStyle = {
  backgroundColor: '#00C9A7',
  color: '#FFFFFF',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '8px',
  padding: '10px 20px',
  cursor: 'pointer',
  textAlign: 'center',
  display: 'inline-block',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
};

const ThreadScrollToBottom: FC = () => {
  return (
    <div className="sticky bottom-0">
      <ThreadPrimitive.ScrollToBottom asChild>
        <IconButton
          tooltip="Scroll to bottom"
          variant="outline"
          className="-top-10 absolute rounded-full disabled:invisible"
        >
          <ArrowDownIcon className="size-4" />
        </IconButton>
      </ThreadPrimitive.ScrollToBottom>
    </div>
  );
};

const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="flex w-[calc(100%-32px)] max-w-[40rem] items-end rounded-lg border p-0.5 shadow-sm">
      <ComposerPrimitive.Input
        placeholder="Write a message..."
        className="h-12 max-h-40 grow resize-none bg-transparent p-3.5 text-sm outline-none placeholder:text-foreground/50"
      />
      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send className="m-2 flex size-8 items-center justify-center rounded-md bg-foreground font-bold text-2xl shadow disabled:opacity-10">
          <SendHorizonalIcon className="size-4 text-background" />
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>
      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel className="m-3.5 flex size-5 items-center justify-center rounded-full border-2 border-foreground">
          <div className="size-2 rounded-[1px] bg-foreground" />
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </ComposerPrimitive.Root>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="relative flex w-full max-w-2xl gap-3 pb-12">
      <Avatar>
        <AvatarFallback>Y</AvatarFallback>
      </Avatar>

      <div className="grow">
        <p className="font-semibold">You</p>

        <p className="whitespace-pre-line text-foreground">
          <MessagePrimitive.Content />
        </p>
      </div>
    </MessagePrimitive.Root>
  );
};

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="relative flex w-full max-w-2xl gap-3 pb-12">
      <Avatar>
        <AvatarFallback>A</AvatarFallback>
      </Avatar>

      <div className="flex-grow">
        <p className="font-semibold">Assistant</p>

        <p className="whitespace-pre-line text-foreground">
          {<MessagePrimitive.Content />}
        </p>
      </div>
    </MessagePrimitive.Root>
  );
};

type IconButton = ButtonProps & { tooltip: string };

const IconButton: FC<IconButton> = ({
  children,
  tooltip,
  className,
  ...rest
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("size-auto p-1", className)}
          {...rest}
        >
          {children}
          <span className="sr-only">{tooltip}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{tooltip}</TooltipContent>
    </Tooltip>
  );
};