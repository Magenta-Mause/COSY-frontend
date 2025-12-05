import { DialogDescription, DialogTitle } from "@components/ui/dialog";
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

const formSchema = z.object({
  template: z.string().min(1, "Please select a template."),
  serverName: z.string().min(1, "Please enter a server name."),
});

interface Props {
  serverSettings: PartialCreateServerSettings;
  setCreateServerSettings: Dispatch<SetStateAction<PartialCreateServerSettings>>;
  setValidForNextStep: Dispatch<SetStateAction<boolean>>;
}

export default function Step2({
  serverSettings,
  setCreateServerSettings,
  setValidForNextStep,
}: Props) {
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      template: serverSettings.template ?? "",
      serverName: serverSettings.serverName ?? "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setCreateServerSettings((prev) => ({
        ...prev,
        template: value.template,
        serverName: value.serverName,
      }));
      setValidForNextStep(true);
    },
  });

  return (
    <>
      <DialogTitle>{t("components.CreateGameServer.steps.step2.title")}</DialogTitle>
      <DialogDescription>
        {t("components.CreateGameServer.steps.step2.description")}
      </DialogDescription>

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
              <form.Field name="template">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor="template-selection">
                        {t("components.CreateGameServer.steps.step2.templateSelection.title")}
                      </FieldLabel>{" "}
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Select a template"
                      />
                      <FieldDescription>
                        {t("components.CreateGameServer.steps.step2.templateSelection.description")}
                      </FieldDescription>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="serverName">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor="server-name">
                        {t("components.CreateGameServer.steps.step2.serverNameSelection.title")}
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="My Game Server"
                      />
                      <FieldDescription>
                        {t(
                          "components.CreateGameServer.steps.step2.serverNameSelection.description",
                        )}
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
