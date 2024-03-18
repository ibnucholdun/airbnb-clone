import Image from "next/image";
import Link from "next/link";
import React from "react";
import useCountries from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFormFavoriteButton } from "./SubmitButtons";
import { addToFavorite, deleteFormFavorite } from "../action";

type Props = {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList?: boolean;
  favoriteId?: string;
  homeId?: string;
  pathname?: string;
};

const ListingCard: React.FC<Props> = ({
  imagePath,
  description,
  location,
  price,
  userId,
  isInFavoriteList,
  favoriteId,
  homeId,
  pathname,
}) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://fvnqkiognfnhyqbtxice.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="image of House"
          fill
          className="rounded-lg h-full object-cover "
        />

        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={deleteFormFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathname" value={pathname} />
                <DeleteFormFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathname" value={pathname} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> Night
        </p>
      </Link>
    </div>
  );
};

export default ListingCard;
