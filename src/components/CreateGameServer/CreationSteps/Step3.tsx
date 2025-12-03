import FieldKeyValueInput from "@components/FieldKeyValueInput/FieldKeyValueInput";
import { DialogDescription, DialogTitle } from "@components/ui/dialog";
import { Input } from "@components/ui/input";
import { useForm } from "@tanstack/react-form";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { FORM_ID, type PartialCreateServerSettings } from "../CreateGameServerModal";

const formSchema = z.object({
  dockerImage: z.string().min(1, "Please enter a Docker image."),
  imageTag: z.string().min(1, "Please enter an image tag."),
  port: z.number().min(1, "Please enter a valid port number."),
  executionCommand: z.string().min(1, "Please enter an execution command."),
});

interface Props {
  serverSettings: PartialCreateServerSettings;
  setCreateServerSettings: Dispatch<SetStateAction<PartialCreateServerSettings>>;
  setValidForNextStep: Dispatch<SetStateAction<boolean>>;
}

export default function Step3({
  serverSettings,
  setCreateServerSettings,
  setValidForNextStep,
}: Props) {
  const { t } = useTranslation();
  const [envVars, setEnvVars] = useState<Array<{ key: string; value: string }>>([]);
  const [volumeMounts, setVolumeMounts] = useState<Array<{ key: string; value: string }>>([]);

  const form = useForm({
    defaultValues: {
      dockerImage: serverSettings.dockerImageName ?? "",
      imageTag: serverSettings.dockerImageTag ?? "",
      port: serverSettings.port ?? 0,
      executionCommand: serverSettings.executionCommand ?? "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setCreateServerSettings((prev) => ({
        ...prev,
        dockerImageName: value.dockerImage,
        dockerImageTag: value.imageTag,
        port: Number(value.port),
        executionCommand: value.executionCommand,
      }));
      setValidForNextStep(true);
    },
  });

  return (
    <div className="w-full max-w-md">
      <DialogTitle>{t("components.CreateGameServer.steps.step3.title")}</DialogTitle>
      <DialogDescription>
        {t("components.CreateGameServer.steps.step3.description")}
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
              <div className="grid grid-cols-2 gap-4">
                <form.Field name="dockerImage">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          {t("components.CreateGameServer.steps.step3.dockerImageSelection.title")}
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="nginx"
                        />
                        <FieldDescription>
                          {t(
                            "components.CreateGameServer.steps.step3.dockerImageSelection.description",
                          )}
                        </FieldDescription>
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                </form.Field>
                <form.Field name="imageTag">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          {t("components.CreateGameServer.steps.step3.imageTagSelection.title")}
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="latest"
                        />
                        <FieldDescription>
                          {t(
                            "components.CreateGameServer.steps.step3.imageTagSelection.description",
                          )}
                        </FieldDescription>
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <form.Field name="port">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>
                          {t("components.CreateGameServer.steps.step3.portSelection.title")}
                        </FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(Number(e.target.value))}
                          aria-invalid={isInvalid}
                          placeholder="4433"
                        />
                        <FieldDescription>
                          {t("components.CreateGameServer.steps.step3.portSelection.description")}
                        </FieldDescription>
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    );
                  }}
                </form.Field>
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
              <form.Field name="executionCommand">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        {t(
                          "components.CreateGameServer.steps.step3.executionCommandSelection.title",
                        )}
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="./start.sh"
                      />
                      <FieldDescription>
                        {t(
                          "components.CreateGameServer.steps.step3.executionCommandSelection.description",
                        )}
                      </FieldDescription>
                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              </form.Field>
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
        </form>
      </div>
    </div>
  );
}
