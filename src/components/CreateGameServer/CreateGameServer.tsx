import { Button } from "@components/ui/button";
import { Dialog, DialogTrigger } from "@components/ui/dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CreateGameServerModal from "./CreateGameServerModal";

export default function createGameServer() {
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{t("components.CreateGameServer.openButton")}</Button>
      </DialogTrigger>
      <CreateGameServerModal setModalOpen={setModalOpen} />
    </Dialog>
  );
}
