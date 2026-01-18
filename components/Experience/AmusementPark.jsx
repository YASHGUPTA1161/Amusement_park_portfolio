"use client";

import HTML from "./HTML.jsx";
import { useAmusementPark } from "./useAmusementPark";

export default function AmusementPark() {
  useAmusementPark();

  return (
    <>
      <HTML />
    </>
  );
}
