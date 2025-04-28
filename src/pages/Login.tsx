
import { LoginForm } from "@/components/auth/LoginForm";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20">
      <div className="mb-8 text-center">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-navy">
            <div className="text-white text-2xl font-serif">L</div>
          </div>
        </div>
        <h1 className="text-3xl font-serif font-bold text-navy">LegalEase</h1>
        <p className="text-muted-foreground">AI-Powered Legal Document Management</p>
      </div>
      <LoginForm />
    </div>
  );
}
