import { Button } from "@components/ui/button";
import { Dialog, DialogTrigger } from "@components/ui/dialog";
import useTranslationPrefix from "@/hooks/useTranslationPrefix/useTranslationPrefix";
import CreateGameServerModal from "./CreateGameServerModal";

export default function CreateGameServer() {
  const { t } = useTranslationPrefix("components.CreateGameServer");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{t("openButton")}</Button>
      </DialogTrigger>
      <CreateGameServerModal />
    </Dialog>
  );
}
