import { File } from "lucide-react";
import React from "react";

type Props = {};

const NoItems = (props: Props) => {
  return (
    <div className="flex min-h-[400px] items-center justify-center flex-col rounded-md border border-dashed p-7 text-center animate-in fade-in-50 mt-10">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <File className="h-10 w-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">
        Sorry no listing found for category found...
      </h2>
      <p className="text-muted-foreground mt-2 text-center text-sm leading-6">
        Please check a other category or create your own listing!
      </p>
    </div>
  );
};

export default NoItems;
