import { Button } from "@components/ui/button";
import { DialogContent, DialogFooter } from "@components/ui/dialog";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Step1 from "./CreationSteps/Step1";
import Step2 from "./CreationSteps/Step2";
import Step3 from "./CreationSteps/Step3";

export const FORM_ID = "create-game-server-form";

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

function createStepKey(step: number) {
  return `CreateGameServerModalStep${step + 1}`;
}

interface CreateServerSettings {
  gameUuid: string;
  serverName: string;
  template: string;
  dockerImageName: string;
  dockerImageTag: string;
  port: number;
  executionCommand: string;
  environmentVariables?: Array<{ key: string; value: string }>;
  volumeMounts?: Array<{ hostPath: string; containerPath: string }>;
}

export interface PartialCreateServerSettings extends Partial<CreateServerSettings> {}

export default function CreateGameServerModal({ setModalOpen }: Props) {
  const { t } = useTranslation();

  const [createServerSettings, setCreateServerSettings] = useState<PartialCreateServerSettings>({});
  const [validForNextStep, setValidForNextStep] = useState(false);
  const [step, setStep] = useState(0);
  const CREATION_STEPS = [
    <Step1
      key={createStepKey(0)}
      serverSettings={createServerSettings}
      setCreateServerSettings={setCreateServerSettings}
      setValidForNextStep={setValidForNextStep}
    />,
    <Step2
      key={createStepKey(1)}
      serverSettings={createServerSettings}
      setCreateServerSettings={setCreateServerSettings}
      setValidForNextStep={setValidForNextStep}
    />,
    <Step3
      key={createStepKey(2)}
      serverSettings={createServerSettings}
      setCreateServerSettings={setCreateServerSettings}
      setValidForNextStep={setValidForNextStep}
    />,
  ];

  const [isLastStep, setIsLastStep] = useState(false);
  useEffect(() => {
    setIsLastStep(step === CREATION_STEPS.length - 1);
  }, [step, CREATION_STEPS.length]);

  const handleNextStep = () => {
    if (!validForNextStep) return;

    if (isLastStep) {
      console.log(createServerSettings);
      setModalOpen(false);
    }

    console.log(createServerSettings);

    setValidForNextStep(false);
    setStep((step + 1) % CREATION_STEPS.length);
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      {CREATION_STEPS[step]}
      <DialogFooter>
        <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 0}>
          {t("components.CreateGameServer.backButton")}
        </Button>
        <Button
          type="submit"
          onClick={handleNextStep}
          form={FORM_ID}
          className={
            isLastStep
              ? "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500"
              : ""
          }
        >
          {isLastStep
            ? t("components.CreateGameServer.createServerButton")
            : t("components.CreateGameServer.nextStepButton")}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
