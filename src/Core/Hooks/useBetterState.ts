import * as React from "react";

export default function useBetterState<T>(
  initialValue: T
): [T, (key: keyof T, value: unknown) => void] {
  const [state, setState] = React.useState(initialValue);

  return [
    state,
    function (key: keyof T, value: unknown) {
      setState({ ...state, [key]: value });
    },
  ];
}
