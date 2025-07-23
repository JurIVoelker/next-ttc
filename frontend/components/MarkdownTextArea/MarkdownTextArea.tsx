import { Textarea } from "../ui/textarea";
import { FC } from "react";

interface MarkdownTextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const MarkdownTextArea: FC<MarkdownTextAreaProps> = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <Textarea
      placeholder="Hier kannst du deinen Artikel schreiben..."
      value={value}
      onChange={onChange}
      className="h-80 resize-none w-full"
      disabled={disabled}
    />
  );
};

export default MarkdownTextArea;
