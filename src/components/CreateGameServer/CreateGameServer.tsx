import { Button } from "@components/ui/button";
import { Dialog, DialogTrigger } from "@components/ui/dialog";
import { useTranslation } from "react-i18next";
import CreateGameServerModal from "./CreateGameServerModal";

export default function createGameServer() {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{t("components.CreateGameServer.openButton")}</Button>
      </DialogTrigger>
      <CreateGameServerModal />
    </Dialog>
  );
}
