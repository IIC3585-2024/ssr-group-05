import Authform from "@/components/Auth";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Authform mode="login" />
    </div>
  );
}
