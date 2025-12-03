import { DialogTitle } from "@components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@components/ui/field";
import { Input } from "@components/ui/input";
import { useForm } from "@tanstack/react-form";
import type { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { FORM_ID, type PartialCreateServerSettings } from "../CreateGameServerModal";

const formSchema = z.object({
  game: z.string().min(1, "Please select a game."),
});

interface Props {
  serverSettings: PartialCreateServerSettings;
  setCreateServerSettings: Dispatch<SetStateAction<PartialCreateServerSettings>>;
  setValidForNextStep: Dispatch<SetStateAction<boolean>>;
}

export default function Step1({
  serverSettings,
  setCreateServerSettings,
  setValidForNextStep,
}: Props) {
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      game: serverSettings.gameUuid ?? "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setCreateServerSettings((prev) => ({ ...prev, gameUuid: value.game }));
      setValidForNextStep(true);
    },
  });

  return (
    <>
      <DialogTitle>{t("components.CreateGameServer.steps.step1.title")}</DialogTitle>
      <div className="my-4 space-y-2">
        <form
          id={FORM_ID}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <FieldSet>
              <form.Field name="game">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor="game-selection">
                        {t("components.CreateGameServer.steps.step1.gameSelection.title")}
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Select a game"
                      />
                      <FieldDescription>
                        {t("components.CreateGameServer.steps.step1.gameSelection.description")}
                      </FieldDescription>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldSet>
          </FieldGroup>
        </form>
      </div>
    </>
  );
}
