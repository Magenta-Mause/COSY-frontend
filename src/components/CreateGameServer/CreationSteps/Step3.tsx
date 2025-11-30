import FieldKeyValueInput from "@components/FieldKeyValueInput/FieldKeyValueInput";
import { DialogDescription, DialogTitle } from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

export default function Step3() {
  const { t } = useTranslation();
  const [envVars, setEnvVars] = useState<Array<{ key: string; value: string }>>([]);
  const [volumeMounts, setVolumeMounts] = useState<Array<{ key: string; value: string }>>([]);

  return (
    <div className="w-full max-w-md">
      <DialogTitle>{t("components.CreateGameServer.steps.step3.title")}</DialogTitle>
      <DialogDescription>
        {t("components.CreateGameServer.steps.step3.description")}
      </DialogDescription>
      <div className="my-4 space-y-2">
        <FieldGroup>
          <FieldSet>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="docker-image">
                  {t("components.CreateGameServer.steps.step3.dockerImageSelection.title")}
                </FieldLabel>
                <Input id="docker-image" placeholder="nginx" required />
                <FieldDescription>
                  {t("components.CreateGameServer.steps.step3.dockerImageSelection.description")}
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="image-tag">
                  {t("components.CreateGameServer.steps.step3.imageTagSelection.title")}
                </FieldLabel>
                <Input id="image-tag" placeholder="latest" required />
                <FieldDescription>
                  {t("components.CreateGameServer.steps.step3.imageTagSelection.description")}
                </FieldDescription>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="port-selection">
                  {t("components.CreateGameServer.steps.step3.portSelection.title")}
                </FieldLabel>
                <Input id="port-selection" placeholder="4433" required />
                <FieldDescription>
                  {t("components.CreateGameServer.steps.step3.portSelection.description")}
                </FieldDescription>
              </Field>
            </div>
            <FieldKeyValueInput
              placeHolderKeyInput="KEY"
              placeHolderValueInput="VALUE"
              separator="="
              fieldLabel={t(
                "components.CreateGameServer.steps.step3.environmentVariablesSelection.title",
              )}
              fieldDescription={t(
                "components.CreateGameServer.steps.step3.environmentVariablesSelection.description",
              )}
              values={envVars}
              setKeyValue={setEnvVars}
            />
            <Field>
              <FieldLabel htmlFor="execution-command">
                {t("components.CreateGameServer.steps.step3.executionCommandSelection.title")}
              </FieldLabel>
              <Input id="execution-command" placeholder="./start.sh" required />
              <FieldDescription>
                {t("components.CreateGameServer.steps.step3.executionCommandSelection.description")}
              </FieldDescription>
            </Field>
            <FieldKeyValueInput
              placeHolderKeyInput="Host Path"
              placeHolderValueInput="Container Path"
              separator=":"
              fieldLabel={t("components.CreateGameServer.steps.step3.hostPathSelection.title")}
              fieldDescription={t(
                "components.CreateGameServer.steps.step3.hostPathSelection.description",
              )}
              values={volumeMounts}
              setKeyValue={setVolumeMounts}
            />
          </FieldSet>
        </FieldGroup>
      </div>
    </div>
  );
}
