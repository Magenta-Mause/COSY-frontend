import { Button } from "@components/ui/button";
import { useTranslation } from "react-i18next";

const LoginBanner = (props: { setOpen: (open: boolean) => void }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center gap-4 bg-primary-banner text-black text-3xl p-2 rounded-md border border-border">
      {t("signIn.question")}
      <Button className="h-[80%]" onClick={() => props.setOpen(true)}>
        {t("signIn.signIn")}
      </Button>
    </div>
  );
};

export default LoginBanner;
