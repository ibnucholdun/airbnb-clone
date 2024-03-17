import { Suspense } from "react";
import ListingCard from "./components/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import prisma from "./lib/db";
import SkeletonCard from "./components/SkeletonCard";
import NoItems from "./components/NoItems";

type Props = {
  searchParams?: {
    filter?: string;
  };
};

const getData = async ({ searchParams }: Props) => {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
    },
  });

  return data;
};

export default function Home({ searchParams }: Props) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <Suspense fallback={<SkeletonLoading />} key={searchParams?.filter}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

const ShowItems = async ({ searchParams }: Props) => {
  const data = await getData({ searchParams: searchParams });

  return (
    <>
      {data.length === 0 ? (
        <NoItems />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              price={item.price as number}
              imagePath={item.photo as string}
              location={item.country as string}
            />
          ))}
        </div>
      )}
    </>
  );
};

const SkeletonLoading = () => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};
