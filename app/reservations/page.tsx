import React from "react";
import NoItems from "../components/NoItems";
import ListingCard from "../components/ListingCard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airbnb Clone - Reservations",
};

type Props = {};

const getData = async (userId: string) => {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          price: true,
          description: true,
          country: true,
          Favorite: {
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });

  return data;
};

const ReservationsRoute = async (props: Props) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {data.length === 0 ? (
        <NoItems
          title="Hey you dont have any Reservations"
          description="Please add a reservation to see it right here..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
          {data.map((item: any) => (
            <ListingCard
              key={item.Home.id}
              description={item.Home.description as string}
              location={item.Home.country as string}
              pathname="/favorites"
              homeId={item.Home.id as string}
              imagePath={item.Home.photo as string}
              price={item.Home.price as number}
              userId={user.id}
              favoriteId={item.Home.Favorite[0]?.id as string}
              isInFavoriteList={
                (item.Home.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReservationsRoute;
