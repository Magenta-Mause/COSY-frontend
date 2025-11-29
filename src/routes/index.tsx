import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {

  return (
    <div
      className="
      h-screen
      w-screen
      flex
      flex-row
      justify-center
      items-center
    "
    >

   </div>
  );
}

export default Index;
