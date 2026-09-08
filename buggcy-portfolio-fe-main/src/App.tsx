import { useEffect } from "react";
import { Routes, Route, Outlet, useSearchParams } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { usePublicSettingsQuery } from "./services/queries";
import HomePage from "./pages/home/HomePage";
import AboutUsPage from "./pages/aboutus/AboutUsPage";
import ServicesPage from "./pages/services/ServicesPage";
import ServiceSlugDetailPage from "./pages/services/ServiceSlugDetailPage";
import ContactPage from "./pages/contact/ContactPage";
import ProjectAssistantPage from "./pages/project-assistant/ProjectAssistantPage";
import BlogPage from "./pages/blog/BlogPage";
import BlogDetailPage from "./pages/blog/BlogDetailPage";
import CaseStudiesPage from "./pages/blog/CaseStudiesPage";
import TechGuidesPage from "./pages/blog/TechGuidesPage";
import CareersPage from "./pages/careers/CareersPage";
import CareerDetailPage from "./pages/careers/CareersDetailPage";
import CareerApplicationPage from "./pages/careers/CareerApplicationPage";
import IndustriesPage from "./pages/industries/IndustriesPage";
import IndustryDetailPage from "./pages/industries/IndustryDetailPage";
import SuccessStoriesPage from "./pages/success-stories/SuccessStoriesPage";
import SuccessStoryDetailPage from "./pages/success-stories/SuccessStoryDetailPage";
import NotFoundPage from "./pages/common/NotFoundPage";
import PrivacyPolicyPage from "./pages/common/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/common/TermsOfServicePage";
import CookiesPolicyPage from "./pages/common/CookiesPolicyPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ToastContainer from "./components/ui/ToastContainer";

// Admin
import AdminLayout from "./pages/admin/AdminLayout";
import RequirePermission from "./components/admin/RequirePermission";
import LoginPage from "./pages/admin/LoginPage";
import ResetPasswordPage from "./pages/admin/ResetPasswordPage";
import DashboardPage from "./pages/admin/DashboardPage";
import BlogListPage from "./pages/admin/blogs/BlogListPage";
import BlogFormPage from "./pages/admin/blogs/BlogFormPage";
import CareerListPage from "./pages/admin/careers/CareerListPage";
import CareerFormPage from "./pages/admin/careers/CareerFormPage";
import ServiceListPage from "./pages/admin/services/ServiceListPage";
import ServiceFormPage from "./pages/admin/services/ServiceFormPage";
import IndustryListPage from "./pages/admin/industries/IndustryListPage";
import IndustryFormPage from "./pages/admin/industries/IndustryFormPage";
import SuccessStoryListPage from "./pages/admin/success-stories/SuccessStoryListPage";
import SuccessStoryFormPage from "./pages/admin/success-stories/SuccessStoryFormPage";
import ContactSubmissionsPage from "./pages/admin/contact-submissions/ContactSubmissionsPage";
import ApplicationsPage from "./pages/admin/applications/ApplicationsPage";
import LeadsDashboardPage from "./pages/admin/LeadsDashboardPage";

// User Management
import AdminUserListPage from "./pages/admin/users/AdminUserListPage";
import AdminUserFormPage from "./pages/admin/users/AdminUserFormPage";
import SettingsPage from "./pages/admin/settings/SettingsPage";

function PublicLayout() {
  const { data: settings } = usePublicSettingsQuery();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get("preview") === "1";

  useEffect(() => {
    if (!settings?.faviconUrl) return;
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = settings.faviconUrl;
  }, [settings?.faviconUrl]);

  return (
    <>
      {!isPreview && <Navbar />}
      <main>
        <Outlet />
      </main>
      {!isPreview && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/10 selection:text-primary">
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        {/* Admin - no Navbar/Footer */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route
            path="blogs"
            element={
              <RequirePermission permission="blogs">
                <BlogListPage />
              </RequirePermission>
            }
          />
          <Route
            path="blogs/new"
            element={
              <RequirePermission permission="blogs">
                <BlogFormPage />
              </RequirePermission>
            }
          />
          <Route
            path="blogs/:id/edit"
            element={
              <RequirePermission permission="blogs">
                <BlogFormPage />
              </RequirePermission>
            }
          />
          <Route
            path="careers"
            element={
              <RequirePermission permission="careers">
                <CareerListPage />
              </RequirePermission>
            }
          />
          <Route
            path="careers/new"
            element={
              <RequirePermission permission="careers">
                <CareerFormPage />
              </RequirePermission>
            }
          />
          <Route
            path="careers/:id/edit"
            element={
              <RequirePermission permission="careers">
                <CareerFormPage />
              </RequirePermission>
            }
          />
          <Route
            path="services"
            element={
              <RequirePermission permission="services">
                <ServiceListPage />
              </RequirePermission>
            }
          />
          <Route
            path="services/new"
            element={
              <RequirePermission permission="services">
                <ServiceFormPage />
              </RequirePermission>
            }
          />
          <Route
            path="services/:id/edit"
            element={
              <RequirePermission permission="services">
                <ServiceFormPage />
              </RequirePermission>
            }
          />
          <Route
            path="industries"
            element={
              <RequirePermission permission="industries">
                <IndustryListPage />
              </RequirePermission>
            }
          />
          <Route
            path="industries/new"
            element={
              <RequirePermission permission="industries">
                <IndustryFormPage />
              </RequirePermission>
            }
          />
          <Route
            path="industries/:id/edit"
            element={
              <RequirePermission permission="industries">
                <IndustryFormPage />
              </RequirePermission>
            }
          />
          <Route
            path="success-stories"
            element={
              <RequirePermission permission="success-stories">
                <SuccessStoryListPage />
              </RequirePermission>
            }
          />
          <Route
            path="success-stories/new"
            element={
              <RequirePermission permission="success-stories">
                <SuccessStoryFormPage />
              </RequirePermission>
            }
          />
          <Route
            path="success-stories/:id/edit"
            element={
              <RequirePermission permission="success-stories">
                <SuccessStoryFormPage />
              </RequirePermission>
            }
          />
          <Route
            path="contact-submissions"
            element={
              <RequirePermission permission="contact-submissions">
                <ContactSubmissionsPage />
              </RequirePermission>
            }
          />
          <Route
            path="applications"
            element={
              <RequirePermission permission="applications">
                <ApplicationsPage />
              </RequirePermission>
            }
          />
          {/* User management stays admin-only; enforced by the sidebar's
              admin-role check and the backend's @Roles(Role.ADMIN) guard. */}
          <Route path="users" element={<AdminUserListPage />} />
          <Route path="users/new" element={<AdminUserFormPage />} />
          <Route path="users/:id/edit" element={<AdminUserFormPage />} />
          <Route
            path="settings"
            element={
              <RequirePermission permission="settings">
                <SettingsPage />
              </RequirePermission>
            }
          />
          <Route path="project-leads" element={<LeadsDashboardPage />} />
        </Route>

        {/* Public - with Navbar/Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route
            path="/services/slug/:slug"
            element={<ServiceSlugDetailPage />}
          />
          <Route path="/services/:slug" element={<ServiceSlugDetailPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industries/:slug" element={<IndustryDetailPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route
            path="/success-stories/:slug"
            element={<SuccessStoryDetailPage />}
          />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/blog/case-studies" element={<CaseStudiesPage />} />
          <Route path="/blog/ai-guides" element={<TechGuidesPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:id" element={<CareerDetailPage />} />
          <Route
            path="/careers/:id/apply"
            element={<CareerApplicationPage />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/project-assistant" element={<ProjectAssistantPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}
