import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import React from "react";

type Props = {
  locationValue: string;
};

const HomeMap: React.FC<Props> = ({ locationValue }) => {
  const LazyMap = dynamic(() => import("./Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  return <LazyMap locationValue={locationValue} />;
};

export default HomeMap;
