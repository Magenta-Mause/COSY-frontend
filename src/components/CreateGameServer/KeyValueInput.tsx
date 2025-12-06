import { Button } from "@components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@components/ui/field";
import { Input } from "@components/ui/input";
import { useCallback, useContext, useEffect, useState } from "react";
import type { ZodType } from "zod";
import { GameServerCreationContext, type GameServerCreationProps } from "./CreateGameServerModal";
import { GameServerCreationPageContext } from "./GenericGameServerCreationPage";

interface Props {
  attribute: keyof GameServerCreationProps;
  placeHolderKeyInput: string;
  placeHolderValueInput: string;
  fieldLabel: string;
  fieldDescription: string;
  keyValidator: ZodType;
  valueValidator: ZodType;
}

export default function KeyValueInput({
  attribute,
  placeHolderKeyInput,
  placeHolderValueInput,
  fieldLabel,
  fieldDescription,
  keyValidator,
  valueValidator,
}: Props) {
  const { setGameServerState } = useContext(GameServerCreationContext);
  const { setAttributeTouched, setAttributeValid } = useContext(GameServerCreationPageContext);

  const [envVariables, setEnvVariables] = useState<
    Array<{ uuid: string; valid: boolean; key?: string; value?: string }>
  >([{ uuid: crypto.randomUUID(), valid: true }]);

  const validateKeyValuePair = useCallback(
    (key?: string, value?: string) => {
      if (!key && !value) {
        return true;
      } else if (!key || !value) {
        return false;
      }

      const keyValid = (key: string) => keyValidator.safeParse(key).success;
      const valueValid = (value: string) => valueValidator.safeParse(value).success;

      return (keyValid(key) && valueValid(value)) || (!keyValid(key) && !valueValid(value));
    },
    [keyValidator, valueValidator],
  );

  useEffect(() => {
    setAttributeValid(
      attribute,
      envVariables.every((envVar) => envVar.valid),
    );
  }, [attribute, envVariables, setAttributeValid]);

  const changeCallback = useCallback(
    (key: "key" | "value", index: number) => (value: string) => {
      setEnvVariables((prev) =>
        prev.map((item, idx) =>
          idx === index
            ? {
                ...item,
                [key]: value,
                valid: validateKeyValuePair(
                  key === "key" ? value : item.key,
                  key === "value" ? value : item.value,
                ),
              }
            : item,
        ),
      );
      setAttributeTouched(attribute, true);
      setGameServerState(attribute)(
        envVariables
          .filter((envVar) => envVar.valid)
          .map((envVar, idx) => (idx === index ? { ...envVar, [key]: value } : envVar)) as {
          key: string;
          value: string;
        }[],
      );
    },
    [attribute, setAttributeTouched, setGameServerState, envVariables, validateKeyValuePair],
  );

  return (
    <Field>
      <FieldLabel htmlFor="key-value-input">{fieldLabel}</FieldLabel>

      <div className="grid grid-cols-2 gap-4">
        {envVariables.map((envVar, index) => (
          <>
            <Input
              id="key-value-input-key"
              placeholder={placeHolderKeyInput}
              value={envVar.key || ""}
              onChange={(e) => changeCallback("key", index)(e.target.value)}
            />
            <Input
              id="key-value-input-value"
              placeholder={placeHolderValueInput}
              value={envVar.value || ""}
              onChange={(e) => changeCallback("value", index)(e.target.value)}
            />
          </>
        ))}
      </div>
      <Button
        className="ml-2"
        onClick={() =>
          setEnvVariables((prev) => [...prev, { uuid: crypto.randomUUID(), valid: true }])
        }
      >
        Add
      </Button>
      <FieldDescription>{fieldDescription}</FieldDescription>
    </Field>
  );
}
