import * as React from "react";

export default function useApiEffect(todo: Function, deps: any[]) {
  React.useEffect(() => {
    const controller = new AbortController();

    todo();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
