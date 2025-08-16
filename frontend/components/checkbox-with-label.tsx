import { useId } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxWithLabel({
  title,
  description,
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  title: string;
  description?: string;
}) {
  const id = useId();
  return (
    <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
      <Checkbox
        onCheckedChange={(checked: boolean) => {
          onChange(checked);
        }}
        checked={value}
        id={id}
        className="order-1 after:absolute after:inset-0"
        aria-describedby={`${id}-description`}
      />
      <div className="grid grow gap-2">
        <Label htmlFor={id}>{title}</Label>
        <p id={`${id}-description`} className="text-muted-foreground text-xs">
          {description}
        </p>
      </div>
    </div>
  );
}
