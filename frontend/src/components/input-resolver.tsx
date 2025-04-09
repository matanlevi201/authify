import InputDefault from "./input-default";
import InputPasswordStrength from "./input-password-strength";
import InputPassword from "./input-password";

function InputResolver({ input }: { input: any }) {
  switch (input.type) {
    case "password":
      return (
        <InputPassword
          key={input.name}
          label={input.label}
          name={input.name}
          placeholder={input.placeholder}
        />
      );
    case "password-strength":
      return (
        <InputPasswordStrength
          key={input.name}
          label={input.label}
          name={input.name}
          placeholder={input.placeholder}
        />
      );
    default:
      return (
        <InputDefault
          key={input.name}
          label={input.label}
          name={input.name}
          placeholder={input.placeholder}
        />
      );
  }
}

export default InputResolver;
