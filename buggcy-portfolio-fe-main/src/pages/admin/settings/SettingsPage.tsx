import { useEffect, useState } from "react";
import ImageUpload from "../../../components/admin/ImageUpload";
import { useSettingsQuery, useUpdateSettings } from "../../../services/queries";
import type { SiteSettings } from "../../../types";

type SettingsForm = Omit<SiteSettings, "id">;

const emptyForm: SettingsForm = {
  siteName: "",
  logoUrl: "",
  darkLogoUrl: "",
  faviconUrl: "",
  address: "",
  city: "",
  country: "",
  phone: "",
  secondaryPhone: "",
  email: "",
  supportEmail: "",
  workingHours: "",
  officeTwoCity: "",
  officeTwoCountry: "",
  officeTwoAddress: "",
  officeTwoPhone: "",
  facebookUrl: "",
  twitterUrl: "",
  linkedinUrl: "",
  instagramUrl: "",
  youtubeUrl: "",
  metaDescription: "",
};

function inputCls(hasError?: boolean) {
  return `w-full px-4 py-2.5 rounded-lg border ${
    hasError ? "border-destructive" : "border-border"
  } bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`;
}

function labelCls() {
  return "block text-sm font-medium text-foreground mb-1.5";
}

export default function SettingsPage() {
  const { data: existing, isLoading } = useSettingsQuery();
  const updateSettings = useUpdateSettings();

  const [form, setForm] = useState<SettingsForm>(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existing) {
      const { id: _id, ...rest } = existing;
      // DB returns null for any field that was never set — turn those
      // into "" so they don't get sent back as null and fail validation.
      const sanitized = Object.fromEntries(
        Object.entries(rest).map(([key, value]) => [key, value ?? ""]),
      ) as SettingsForm;
      setForm({ ...emptyForm, ...sanitized });
    }
  }, [existing]);

  const update = (key: keyof SettingsForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const fieldError = (key: keyof SettingsForm) =>
    fieldErrors[key] ? (
      <p className="text-destructive text-xs mt-1">{fieldErrors[key]}</p>
    ) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setFieldErrors({});
    try {
      await updateSettings.mutateAsync(form);
      setSuccess("Settings updated successfully");
    } catch (err) {
      const fieldList = (err as { fieldErrors?: string[] })?.fieldErrors;
      if (fieldList && fieldList.length > 0) {
        const map: Record<string, string> = {};
        fieldList.forEach((line) => {
          const [field, ...rest] = line.split(": ");
          map[field] = rest.join(": ") || "Invalid input";
        });
        setFieldErrors(map);
        setError("Please fix the highlighted fields below");
      } else {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    }
  };

  if (isLoading) {
    return <p className="text-muted-foreground">Loading settings...</p>;
  }

  return (
    <div className="max-w-3xl space-y-6">
      <p className="text-muted-foreground">
        Manage your site's logo, address, and contact details
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 rounded-lg bg-green-500/10 text-green-600 text-sm">
            {success}
          </div>
        )}

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">Branding</h3>

          <div>
            <ImageUpload
              label="Logo"
              value={form.logoUrl}
              onChange={(url) => update("logoUrl", url)}
              folder="website/settings"
            />
            {fieldError("logoUrl")}
          </div>
          <div>
            <ImageUpload
              label="Dark Mode Logo"
              value={form.darkLogoUrl}
              onChange={(url) => update("darkLogoUrl", url)}
              folder="website/settings"
            />
            {fieldError("darkLogoUrl")}
          </div>
          <div>
            <ImageUpload
              label="Favicon"
              value={form.faviconUrl}
              onChange={(url) => update("faviconUrl", url)}
              folder="website/settings"
            />
            {fieldError("faviconUrl")}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">Address</h3>
          <div>
            <label className={labelCls()}>Street Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="123 Main Street"
              className={inputCls(!!fieldErrors.address)}
            />
            {fieldError("address")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls()}>City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="Lahore"
                className={inputCls(!!fieldErrors.city)}
              />
              {fieldError("city")}
            </div>
            <div>
              <label className={labelCls()}>Country</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                placeholder="Pakistan"
                className={inputCls(!!fieldErrors.country)}
              />
              {fieldError("country")}
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">
            Contact Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls()}>Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+92 300 1234567"
                className={inputCls(!!fieldErrors.phone)}
              />
              {fieldError("phone")}
            </div>

            <div>
              <label className={labelCls()}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="info@buggcy.com"
                className={inputCls(!!fieldErrors.email)}
              />
              {fieldError("email")}
            </div>
          </div>
          <div>
            <label className={labelCls()}>Working Hours</label>
            <input
              type="text"
              value={form.workingHours}
              onChange={(e) => update("workingHours", e.target.value)}
              placeholder="Mon - Fri, 9:00 AM - 6:00 PM"
              className={inputCls(!!fieldErrors.workingHours)}
            />
            {fieldError("workingHours")}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">
            Second Office (optional)
          </h3>
          <p className="text-sm text-muted-foreground -mt-3">
            Shown alongside your main office on the "About Us" page. Leave blank
            to hide it.
          </p>
          <div>
            <label className={labelCls()}>Street Address</label>
            <input
              type="text"
              value={form.officeTwoAddress}
              onChange={(e) => update("officeTwoAddress", e.target.value)}
              placeholder="Beryllvegen 98, 9022 Oslo"
              className={inputCls(!!fieldErrors.officeTwoAddress)}
            />
            {fieldError("officeTwoAddress")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls()}>City</label>
              <input
                type="text"
                value={form.officeTwoCity}
                onChange={(e) => update("officeTwoCity", e.target.value)}
                placeholder="Oslo"
                className={inputCls(!!fieldErrors.officeTwoCity)}
              />
              {fieldError("officeTwoCity")}
            </div>
            <div>
              <label className={labelCls()}>Country</label>
              <input
                type="text"
                value={form.officeTwoCountry}
                onChange={(e) => update("officeTwoCountry", e.target.value)}
                placeholder="Norway"
                className={inputCls(!!fieldErrors.officeTwoCountry)}
              />
              {fieldError("officeTwoCountry")}
            </div>
          </div>
          <div>
            <label className={labelCls()}>Phone</label>
            <input
              type="text"
              value={form.officeTwoPhone}
              onChange={(e) => update("officeTwoPhone", e.target.value)}
              placeholder="+47-93-923-306"
              className={inputCls(!!fieldErrors.officeTwoPhone)}
            />
            {fieldError("officeTwoPhone")}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-5">
          <h3 className="text-lg font-semibold text-foreground">
            Social Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls()}>Facebook URL</label>
              <input
                type="text"
                value={form.facebookUrl}
                onChange={(e) => update("facebookUrl", e.target.value)}
                className={inputCls(!!fieldErrors.facebookUrl)}
              />
              {fieldError("facebookUrl")}
            </div>
            <div>
              <label className={labelCls()}>Twitter / X URL</label>
              <input
                type="text"
                value={form.twitterUrl}
                onChange={(e) => update("twitterUrl", e.target.value)}
                className={inputCls(!!fieldErrors.twitterUrl)}
              />
              {fieldError("twitterUrl")}
            </div>
            <div>
              <label className={labelCls()}>LinkedIn URL</label>
              <input
                type="text"
                value={form.linkedinUrl}
                onChange={(e) => update("linkedinUrl", e.target.value)}
                className={inputCls(!!fieldErrors.linkedinUrl)}
              />
              {fieldError("linkedinUrl")}
            </div>
            <div>
              <label className={labelCls()}>Instagram URL</label>
              <input
                type="text"
                value={form.instagramUrl}
                onChange={(e) => update("instagramUrl", e.target.value)}
                className={inputCls(!!fieldErrors.instagramUrl)}
              />
              {fieldError("instagramUrl")}
            </div>
            <div>
              <label className={labelCls()}>YouTube URL</label>
              <input
                type="text"
                value={form.youtubeUrl}
                onChange={(e) => update("youtubeUrl", e.target.value)}
                className={inputCls(!!fieldErrors.youtubeUrl)}
              />
              {fieldError("youtubeUrl")}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={updateSettings.isPending}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50"
          >
            {updateSettings.isPending ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
