import { SignIn } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";

export default function page() {
  return <SignUp afterSignUpUrl={process.env.SIGNIN_URL}/>;
}
