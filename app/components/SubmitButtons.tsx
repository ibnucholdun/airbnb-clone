"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {};

const CreationSubmit = (props: Props) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button size="lg" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button size="lg" type="submit">
          Next
        </Button>
      )}
    </>
  );
};

export default CreationSubmit;
