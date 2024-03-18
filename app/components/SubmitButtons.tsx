"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";

type Props = {};

export const CreationSubmit = (props: Props) => {
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

export const AddToFavoriteButton = (props: Props) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant={"outline"}
          size="icon"
          disabled
          className="bg-primary-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size="icon"
          type="submit"
          className="bg-primary-foreground">
          <Heart className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export const DeleteFormFavoriteButton = (props: Props) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant={"outline"}
          size="icon"
          disabled
          className="bg-primary-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant={"outline"}
          size="icon"
          type="submit"
          className="bg-primary-foreground">
          <Heart className="h-4 w-4 text-primary" fill="#E21C49" />
        </Button>
      )}
    </>
  );
};

export const ReservationSubmitButton = (props: Props) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Please wait...
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Make a Reservation
        </Button>
      )}
    </>
  );
};
