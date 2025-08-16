import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Check, Loader2, RefreshCw, Send, X } from "lucide-react";
import { FC } from "react";

interface SuggestionCardProps {
  onClick?: () => void;
  text: string;
  variant?: "amber" | "blue" | "green";
  className?: string;
  handleConfirmRevertMessage?: (confirm: boolean) => void;
}

const SuggestionCard: FC<SuggestionCardProps> = ({
  onClick,
  className = "",
  text,
  variant = "amber",
}) => {
  const baseContainerStyles = "flex gap-2 pb-2 max-w-2xs w-full";
  const baseButtonStyles =
    "p-4 rounded-lg flex items-center gap-4 hover:bg-opacity-90 transition-colors cursor-pointer w-full justify-center";
  const baseIconStyles = "size-5 shrink-0";

  const variantStyles = {
    amber: "bg-amber-50 text-amber-800 hover:bg-amber-100",
    blue: "bg-blue-50 text-blue-800 hover:bg-blue-100",
    green: "bg-green-50 text-green-800 hover:bg-green-100",
  };

  return (
    <div className={`${baseContainerStyles} ${className}`}>
      <div
        className={`${baseButtonStyles} ${variantStyles[variant]}`}
        onClick={onClick}
      >
        <RefreshCw className={baseIconStyles} />
        {text}
      </div>
    </div>
  );
};

const AiAssistantChat = ({
  isText = false,
  isLoading = false,
  isTooLong = false,
  handleConfirmRevertMessage,
  unAcceptedMessage = "",
  makeAiRequest,
}) => {
  const textClip = 70;
  const [text, setText] = useState("");

  return (
    <div className="shadow-lg w-full rounded-lg max-w-xs justify-center flex flex-col relative px-2 pb-2 items-center text-sm border min-h-80">
      <div className="absolute top-0 border-b w-full p-2 bg-gray-50 rounded-t-lg">
        <h4 className="text-center text-lg">KI-Assistent</h4>
      </div>
      {!isText && !unAcceptedMessage && !isLoading && (
        <div className="text-muted-foreground bg-gray-50 p-4 rounded-lg flex items-center gap-4 w-full justify-center max-w-2xs">
          Gebe links einen Text ein um ihn mit dem KI-Assistenten zu bearbeiten.
        </div>
      )}
      {isLoading && unAcceptedMessage && (
        <div className="p-2 rounded-lg flex items-center border gap-2 bg-slate-50">
          <div className="overflow-hidden max-w-3xs wrap-break-word text-sm text-muted-foreground">
            <div className="text-black mb-1 font-medium">
              Text wird generiert...
            </div>
            {unAcceptedMessage.substring(0, textClip)}
            {unAcceptedMessage.length > textClip ? "..." : ""}
          </div>
          <div className="flex items-center shrink-0 gap-0 ml-auto w-[72px] justify-center">
            <Loader2 className="animate-spin size-5 text-muted-foreground" />
          </div>
        </div>
      )}

      {isTooLong && !unAcceptedMessage && !isLoading && (
        <SuggestionCard
          variant="blue"
          text="Text auf das Zeichenlimit kürzen"
          onClick={() => {
            makeAiRequest(
              "Kürze den Text auf das Zeichenlimit von 2000 Zeichen."
            );
          }}
        />
      )}
      {isText && !unAcceptedMessage && !isLoading && (
        <SuggestionCard
          text="Text zu einem Zeitungsartikel umformulieren"
          onClick={() => {
            makeAiRequest("Formuliere den Text zu einem Zeitungsartikel um.");
          }}
        />
      )}

      {unAcceptedMessage && !isLoading && (
        <div className="p-2 rounded-lg flex items-center border gap-2">
          <div className="overflow-hidden max-w-3xs wrap-break-word text-sm text-muted-foreground">
            <div className="text-black mb-1 font-medium">
              Änderungen speichern?
            </div>
            {unAcceptedMessage.substring(0, textClip)}
            {unAcceptedMessage.length > textClip ? "..." : ""}
          </div>
          <div className="flex items-center shrink-0 gap-0 ml-auto">
            <Button
              size="icon"
              variant="ghost"
              className="text-green-800 hover:text-green-700 hover:bg-green-100 "
              onClick={() => handleConfirmRevertMessage(true)}
            >
              <Check />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-red-800 hover:text-red-700 hover:bg-red-50"
              onClick={() => handleConfirmRevertMessage(false)}
            >
              <X />
            </Button>
          </div>
        </div>
      )}

      <div className="flex gap-2 w-full absolute bottom-0 left-0 p-2">
        <Input
          className="w-full"
          disabled={!isText || Boolean(unAcceptedMessage) || isLoading}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          size="icon"
          disabled={
            !isText || Boolean(unAcceptedMessage) || isLoading || !text.trim()
          }
          onClick={() => {
            if (isText && text.trim()) {
              makeAiRequest(text);
              setText("");
            }
          }}
        >
          {!isLoading && <Send />}
          {isLoading && <Loader2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
};

export default AiAssistantChat;
