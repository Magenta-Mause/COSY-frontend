
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { DialogHeader } from "../dialog";
import { cn } from "@/lib/utils";


const GenericModal = (props: {
  header: string;
  subheader?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  modalClassName?: string;
  modalContentClassName?: string;
  children: ReactNode;
}) => {
  const { t } = useTranslation();

  

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className={cn("bg-primary-modal-background w-100", props.modalClassName)}>
        <DialogHeader>
          <DialogTitle className="text-3xl">{props.header}</DialogTitle>
          <DialogDescription className="text-lg -my-5">{props.subheader}</DialogDescription>
        </DialogHeader>
          <div className={cn("", props.modalContentClassName)}>
            {props.children}
          </div>
        </DialogContent>
    </Dialog>

  )
};

export default GenericModal;
