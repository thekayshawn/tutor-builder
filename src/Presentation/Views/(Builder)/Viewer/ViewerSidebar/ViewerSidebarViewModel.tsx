import * as React from "react";
import ViewerContext from "../ViewerContext";
import { useParams } from "react-router-dom";
import LearningMaterialService from "../../../../../Repos/Services/LearningMaterialService";

type Props = {
  children: React.ReactElement;
};

export default function ViewerSidebarViewModel({ children }: Props) {
  const { id: materialID } = useParams<{ id?: string }>();
  const { state, setState } = React.useContext(ViewerContext);

  React.useEffect(() => {
    const controller = new AbortController();
    const learningMaterialService = new LearningMaterialService();

    learningMaterialService.getPages({});

    return () => controller.abort();
  }, [materialID]);

  console.log({ state });

  return children;
}
