import { DialogTitle } from "@components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { useTranslation } from "react-i18next";

export default function Step1() {
  const { t } = useTranslation();

  return (
    <>
      <DialogTitle>{t("components.CreateGameServer.steps.step1.title")}</DialogTitle>
      <div className="my-4 space-y-2">
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel htmlFor="template-selection">
                {t("components.CreateGameServer.steps.step1.gameSelection.title")}
              </FieldLabel>
              <Input id="template-selection" placeholder="Select a game" required />
              <FieldDescription>
                {t("components.CreateGameServer.steps.step1.gameSelection.description")}
              </FieldDescription>
            </Field>
          </FieldSet>
        </FieldGroup>
      </div>
    </>
  );
}
