import Authform from "@/components/Auth";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Authform mode="signup" />
    </div>
  );
}
