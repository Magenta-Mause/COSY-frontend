import KeyValueInput from "@components/CreateGameServer/KeyValueInput";
import { DialogDescription, DialogTitle } from "@components/ui/dialog";
import { useTranslation } from "react-i18next";
import * as z from "zod";

import GenericGameServerCreationInputField, {
  InputType,
} from "../GenericGameServerCreationInputField";
import GenericGameServerCreationPage from "../GenericGameServerCreationPage";

export default function Step3() {
  const { t } = useTranslation();

  return (
    <GenericGameServerCreationPage>
      <DialogTitle>{t("components.CreateGameServer.steps.step3.title")}</DialogTitle>
      <DialogDescription>
        {t("components.CreateGameServer.steps.step3.description")}
      </DialogDescription>

      <div className="grid grid-cols-2 gap-4">
        <GenericGameServerCreationInputField
          attribute="dockerImageName"
          validator={z.string().min(1)}
          placeholder="nginx"
          label={t("components.CreateGameServer.steps.step3.dockerImageSelection.title")}
          description={t(
            "components.CreateGameServer.steps.step3.dockerImageSelection.description",
          )}
        />

        <GenericGameServerCreationInputField
          attribute="dockerImageTag"
          validator={z.string().min(1)}
          placeholder="latest"
          label={t("components.CreateGameServer.steps.step3.imageTagSelection.title")}
          description={t("components.CreateGameServer.steps.step3.imageTagSelection.description")}
        />
      </div>

      <GenericGameServerCreationInputField
        attribute="port"
        validator={z.number().min(1).max(65535)}
        placeholder="4433"
        label={t("components.CreateGameServer.steps.step3.portSelection.title")}
        description={t("components.CreateGameServer.steps.step3.portSelection.description")}
        type={InputType.NUMBER}
      />

      <KeyValueInput
        attribute="environmentVariables"
        fieldLabel={t(
          "components.CreateGameServer.steps.step3.environmentVariablesSelection.title",
        )}
        fieldDescription={t(
          "components.CreateGameServer.steps.step3.environmentVariablesSelection.description",
        )}
        placeHolderKeyInput="KEY"
        placeHolderValueInput="VALUE"
        keyValidator={z.string().min(1)}
        valueValidator={z.string().min(1)}
      />

      <GenericGameServerCreationInputField
        attribute="executionCommand"
        validator={z.string().min(1)}
        placeholder="./start.sh"
        label={t("components.CreateGameServer.steps.step3.executionCommandSelection.title")}
        description={t(
          "components.CreateGameServer.steps.step3.executionCommandSelection.description",
        )}
      />

      <KeyValueInput
        attribute="volumeMounts"
        fieldLabel={t("components.CreateGameServer.steps.step3.hostPathSelection.title")}
        fieldDescription={t(
          "components.CreateGameServer.steps.step3.hostPathSelection.description",
        )}
        placeHolderKeyInput="Host Path"
        placeHolderValueInput="Container Path"
        keyValidator={z.string().min(1)}
        valueValidator={z.string().min(1)}
      />
    </GenericGameServerCreationPage>
  );
}
