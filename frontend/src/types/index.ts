import { FieldValues, Path } from "react-hook-form";
import { Method } from "axios";

export type RequestProps<TBody> = {
  url: string;
  method: Method;
  body?: TBody;
};

export type RequestResponse<T> =
  | { success: true; data: T }
  | { success: false; errors: ErrorResponse };

export type ErrorResponse = { message: string }[];

export const enum EHttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export type Field<K extends FieldValues> = {
  name: Path<K>;
  type: "password-strength" | string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
};

export const enum EAuthForms {
  SIGNUP = "signup",
  SIGNIN = "signin",
  FORGOT_PASSWORD = "forgot-pasword",
  RESET_PASSWORD = "reset-password",
  CHANGE_PASSWORD = "change-password",
  OTP_FORM = "otp-form",
}

export type BaseModalProps = {
  open: boolean;
  closeModal: () => Promise<void> | void;
};

export const enum EModalTypes {
  MODAL_ADD_AGENT = "modal-add-agent",
  MODAL_ENABLE_2FA = "modal-enable-2fa",
  MODAL_DISABLE_2FA = "modal-disable-2fa",
}

export type ModalPropsMap = {
  [EModalTypes.MODAL_ADD_AGENT]: null;
  [EModalTypes.MODAL_ENABLE_2FA]: {
    qrCode: string;
  };
  [EModalTypes.MODAL_DISABLE_2FA]: null;
  default: Record<string, any> | null;
};

export type ModalPropInferer =
  | {
      activeModal: EModalTypes.MODAL_ADD_AGENT;
      modalProps?: ModalPropsMap[EModalTypes.MODAL_ADD_AGENT];
    }
  | {
      activeModal: EModalTypes.MODAL_ENABLE_2FA;
      modalProps: ModalPropsMap[EModalTypes.MODAL_ENABLE_2FA];
    }
  | {
      activeModal: EModalTypes.MODAL_DISABLE_2FA;
      modalProps?: ModalPropsMap[EModalTypes.MODAL_DISABLE_2FA];
    }
  | {
      activeModal: "default";
      modalProps?: ModalPropsMap["default"];
    };
