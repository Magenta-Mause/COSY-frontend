import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@components/ui/dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LoginBanner from "../LoginBanner/LoginBanner";
import LoginForm from "../LoginDialog/LoginForm";

const LoginDisplay = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="w-full flex justify-center absolute bottom-10 right-10">
        <LoginBanner setOpen={setOpen} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-primary-modal-background text- w-100">
          <DialogTitle className="text-3xl">{t("signIn.signIn")}</DialogTitle>
          <DialogDescription className="text-lg -my-5">{t("signIn.desc")}</DialogDescription>
          <LoginForm
            loginCallback={() => {
              setOpen(false);
            }}
            isPending={false}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginDisplay;
