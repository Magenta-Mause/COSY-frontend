import { DialogDescription, DialogTitle } from "@components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { useTranslation } from "react-i18next";

export default function Step2() {
  const { t } = useTranslation();

  return (
    <>
      <DialogTitle>{t("components.CreateGameServer.steps.step2.title")}</DialogTitle>
      <DialogDescription>
        {t("components.CreateGameServer.steps.step2.description")}
      </DialogDescription>

      <div className="my-4 space-y-2">
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="template-selection">
                {t("components.CreateGameServer.steps.step2.templateSelection.title")}
              </FieldLabel>
              <Input id="template-selection" placeholder="Select a template" required />
              <FieldDescription>
                {t("components.CreateGameServer.steps.step2.templateSelection.description")}
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="server-name">
                {t("components.CreateGameServer.steps.step2.serverNameSelection.title")}
              </FieldLabel>
              <Input id="server-name" placeholder="My Game Server" required />
              <FieldDescription>
                {t("components.CreateGameServer.steps.step2.serverNameSelection.description")}
              </FieldDescription>
            </Field>
          </FieldSet>
        </FieldGroup>
      </div>
    </>
  );
}
