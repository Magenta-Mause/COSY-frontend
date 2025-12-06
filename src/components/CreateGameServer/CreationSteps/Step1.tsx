import GenericGameServerCreationInputField from "@components/CreateGameServer/GenericGameServerCreationInputField.tsx";
import GenericGameServerCreationPage from "@components/CreateGameServer/GenericGameServerCreationPage.tsx";
import { DialogTitle } from "@components/ui/dialog.tsx";
import { useTranslation } from "react-i18next";
import * as z from "zod";

const GameServerCreationGameNamePage = () => {
  const { t } = useTranslation();

  return (
    <GenericGameServerCreationPage>
      <DialogTitle>{t("components.CreateGameServer.steps.step1.title")}</DialogTitle>
      <GenericGameServerCreationInputField
        attribute="gameUuid"
        validator={z.string().min(1)}
        placeholder="Minecraft Server"
        label={t("components.CreateGameServer.steps.step1.gameSelection.title")}
        description={t("components.CreateGameServer.steps.step1.gameSelection.description")}
      />
    </GenericGameServerCreationPage>
  );
};

export default GameServerCreationGameNamePage;
