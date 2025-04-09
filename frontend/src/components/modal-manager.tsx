import { useModalsStore } from "@/context/use-modals-store";
import { ModalEnable2FA } from "./modal-enable-2fa";
import { ModalDisable2FA } from "./modal-disable-2fa";
import { EModalTypes } from "@/types";

export function ModalManager() {
  const { closeModal, settings } = useModalsStore();

  const { activeModal, modalProps } = settings;

  return (
    <>
      {activeModal === EModalTypes.MODAL_ENABLE_2FA && (
        <ModalEnable2FA open={true} closeModal={closeModal} {...modalProps} />
      )}
      {activeModal === EModalTypes.MODAL_DISABLE_2FA && (
        <ModalDisable2FA open={true} closeModal={closeModal} />
      )}
    </>
  );
}
