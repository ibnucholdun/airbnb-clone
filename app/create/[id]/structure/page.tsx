import { createCategoryPage } from "@/app/action";
import CreationBottomBar from "@/app/components/CreationBottomBar";
import SelectedCategory from "@/app/components/SelectedCategory";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const StructureRoute: React.FC<Props> = ({ params }) => {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describes your Home?
        </h2>
      </div>

      <form className="" action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectedCategory />
        <CreationBottomBar />
      </form>
    </>
  );
};

export default StructureRoute;
