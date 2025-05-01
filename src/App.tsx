
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout/layout";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NewCandidate from "./pages/database/NewCandidate";
import SearchCandidate from "./pages/database/SearchCandidate";
import ViewCandidate from "./pages/database/ViewCandidate";
import TalentSearch from "./pages/sourcing/TalentSearch";
import TalentPipeline from "./pages/sourcing/TalentPipeline";
import CandidateAnalytics from "./pages/analytics/Candidates";
import ComingSoon from "./pages/analytics/ComingSoon";
import Connect from "./pages/settings/Connect";
import MyProfile from "./pages/profile/MyProfile";
import Subscriptions from "./pages/profile/Subscriptions";
import Wallpaper from "./pages/profile/Wallpaper";
import Contact from "./pages/profile/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />

              {/* Database Routes */}
              <Route path="/database/new-candidate" element={<NewCandidate />} />
              <Route path="/database/search-candidate" element={<SearchCandidate />} />
              <Route path="/database/view-candidate" element={<ViewCandidate />} />

              {/* Sourcing Routes */}
              <Route path="/sourcing/talent-search" element={<TalentSearch />} />
              <Route path="/sourcing/talent-pipeline" element={<TalentPipeline />} />

              {/* Analytics Routes */}
              <Route path="/analytics/candidates" element={<CandidateAnalytics />} />
              <Route path="/analytics/jobs" element={<ComingSoon title="Jobs Analytics" description="Track job posting and application metrics" />} />
              <Route path="/analytics/submissions" element={<ComingSoon title="Submissions Analytics" description="Monitor candidate submission metrics" />} />
              <Route path="/analytics/interviews" element={<ComingSoon title="Interview Analytics" description="Track interview scheduling and outcomes" />} />
              <Route path="/analytics/hires" element={<ComingSoon title="Hiring Analytics" description="Analyze your hiring performance metrics" />} />
              
              {/* Settings Routes */}
              <Route path="/settings/connect" element={<Connect />} />
              <Route path="/settings/financials" element={<ComingSoon title="Financials" description="Manage your earnings and billing information" />} />
              
              {/* Profile Routes */}
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/wallpaper" element={<Wallpaper />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
