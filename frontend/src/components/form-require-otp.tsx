import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSessionStore } from "@/context/use-session-store";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { use2fa } from "@/hooks/use-2fa";

function FormRequireOtp() {
  const navigate = useNavigate();
  const { currentUser } = useSessionStore();
  const { setOtp, verify } = use2fa();
  if (!currentUser) {
    return <Navigate to="/signin" />;
  }
  const handleSubmit = async () => {
    await verify();
    navigate("/");
  };
  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-6 py-6">
        <CardContent>
          <InputOTP maxLength={6} onChange={(v) => setOtp(v)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-2/3 mx-auto">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default FormRequireOtp;
