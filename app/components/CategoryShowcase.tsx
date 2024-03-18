import React from "react";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";

type Props = {
  categoryName: string;
};

const CategoryShowcase: React.FC<Props> = ({ categoryName }) => {
  const category = categoryItems.find(
    (category) => category.name === categoryName
  );

  return (
    <div className="flex items-center">
      <Image
        src={category?.imageUrl as string}
        alt="Category Image"
        width={44}
        height={44}
      />
      <div className="flex flex-col ml-4">
        <h3 className="font-medium ">{category?.title}</h3>
        <p className="text-sm text-muted-foreground">{category?.description}</p>
      </div>
    </div>
  );
};

export default CategoryShowcase;
