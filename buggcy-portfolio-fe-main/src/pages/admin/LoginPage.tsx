import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdminStore } from "../../store/adminStore";
import { forgotPassword } from "../../services/auth";
import { usePublicSettingsQuery } from "../../services/queries";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import logo from "../../assets/black-logo.png";

export default function LoginPage() {
  const { isAuthenticated, login } = useAdminStore();
  const navigate = useNavigate();
  const { data: settings } = usePublicSettingsQuery();
  const [darkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/admin"), 500);
    } else {
      setError(result.error || "Invalid email or password. Please try again.");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!forgotEmail.trim()) {
      setError("Please enter your email address");
      return;
    }

    setForgotLoading(true);
    try {
      const result = await forgotPassword(forgotEmail);
      setSuccess(result.message);
      setForgotEmail("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send reset link. Please try again.",
      );
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg shadow-black/5 p-8">
          {/* Logo inside card */}
          <div className="text-center mb-6">
            <img
              src={
                (darkMode && settings?.darkLogoUrl) || settings?.logoUrl || logo
              }
              alt={settings?.siteName || "Buggcy"}
              className={`h-16 w-auto object-contain mx-auto ${
                darkMode && !settings?.logoUrl && !settings?.darkLogoUrl
                  ? "brightness-0 invert"
                  : ""
              }`}
            />
          </div>

          {!showForgot ? (
            <>
              <div className="mb-6">
                <h1 className="text-xl font-bold text-foreground">
                  Welcome back
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Sign in to your admin account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertCircle
                      size={16}
                      className="text-destructive shrink-0 mt-0.5"
                    />
                    <span className="text-destructive text-sm leading-relaxed">
                      {error}
                    </span>
                  </div>
                )}

                {success && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-green-500/10 border border-green-500/20">
                    <CheckCircle2
                      size={16}
                      className="text-green-500 shrink-0 mt-0.5"
                    />
                    <span className="text-green-600 dark:text-green-400 text-sm leading-relaxed">
                      {success}
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="admin@buggcy.com"
                      required
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                      className="w-full pl-10 pr-11 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgot(true);
                      setError("");
                      setSuccess("");
                    }}
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="mb-6">
                <button
                  onClick={() => {
                    setShowForgot(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to login
                </button>
                <h1 className="text-xl font-bold text-foreground">
                  Reset password
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-4">
                {error && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertCircle
                      size={16}
                      className="text-destructive shrink-0 mt-0.5"
                    />
                    <span className="text-destructive text-sm leading-relaxed">
                      {error}
                    </span>
                  </div>
                )}

                {success && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-green-500/10 border border-green-500/20">
                    <CheckCircle2
                      size={16}
                      className="text-green-500 shrink-0 mt-0.5"
                    />
                    <span className="text-green-600 dark:text-green-400 text-sm leading-relaxed">
                      {success}
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="admin@buggcy.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {forgotLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Buggcy Admin Panel &mdash; Secure Access Only
        </p>
      </div>
    </div>
  );
}
