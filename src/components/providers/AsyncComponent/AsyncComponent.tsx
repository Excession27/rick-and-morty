import React from "react";
import { FC, ReactElement } from "react";

interface IAsyncComponent {
  status: "loading" | "idle" | "error" | "success";
  component: ReactElement;
  skeleton?: ReactElement;
}

const AsyncComponent: FC<IAsyncComponent> = ({
  status,
  component,
  skeleton,
}) => {
  if (status === "loading") {
    return skeleton || <p>"Loading..."</p>;
  } else if (status === "error") {
    return <p className=" text-lg font-bold">No characters found.</p>;
  }

  return component;
};

export default AsyncComponent;
