"use client";

import HTML from "./HTML.jsx";
import CenteredWindow from "../CenteredWindow";
import { useAmusementPark } from "./useAmusementPark";

export default function AmusementPark() {
  useAmusementPark();

  return (
    <>
      <HTML />
      <CenteredWindow />
    </>
  );
}
