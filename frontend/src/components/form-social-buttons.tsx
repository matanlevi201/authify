import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { AppleIcon, GoogleIcon } from "./icons";

function FormSocialButtons() {
  const { googleSignup } = useAuth();
  return (
    <div className="flex flex-col w-full gap-4">
      <CardDescription>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </CardDescription>
      <Button variant="outline" className="w-full">
        <AppleIcon />
        Apple
      </Button>
      <Button variant="outline" className="w-full" onClick={googleSignup}>
        <GoogleIcon />
        Google
      </Button>
    </div>
  );
}

export default FormSocialButtons;
