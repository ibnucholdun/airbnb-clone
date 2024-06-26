/* eslint-disable @next/next/no-img-element */
import React from "react";
import prisma from "../../lib/db";
import Image from "next/image";
import useCountries from "@/app/lib/getCountries";
import { Separator } from "@/components/ui/separator";
import CategoryShowcase from "@/app/components/CategoryShowcase";
import HomeMap from "@/app/components/HomeMap";
import SelectCalender from "@/app/components/SelectCalender";
import { createReservation } from "@/app/action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import { unstable_noStore as noStore } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airbnb Clone - Home",
};

type Props = {
  params: {
    id: string;
  };
};

const getData = async (homeId: string) => {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      id: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      photo: true,
      country: true,
      Reservation: {
        where: {
          homeId: homeId,
        },
      },
      user: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
};
const HomeRoute: React.FC<Props> = async ({ params }) => {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>

      <div className="relative h-[500px]">
        <Image
          alt="Image of Home"
          src={`https://fvnqkiognfnhyqbtxice.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>
      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3 ">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex  gap-x-2 text-muted-foreground mt-2">
            <p className="">{data?.guests} Guests</p> *{" "}
            <p>{data?.bedrooms} Bedrooms</p> *{" "}
            <p>{data?.bathrooms} Bathrooms</p>
          </div>
          <div className="flex items-center mt-6">
            <img
              src={
                data?.user?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-10 h-10 rounded-full"
            />

            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.user?.firstName}</h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>
          <Separator className="my-6" />

          <CategoryShowcase categoryName={data?.categoryName as string} />

          <Separator className="my-6" />

          <p className="text-muted-foreground">{data?.description}</p>

          <Separator className="my-6" />

          <HomeMap locationValue={country?.value as string} />
        </div>

        <form action={createReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalender reservation={data?.Reservation} />
          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default HomeRoute;
