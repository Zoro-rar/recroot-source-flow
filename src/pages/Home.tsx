
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  BarChart,
  Database,
  FileText,
  Search,
  Settings,
  Users,
} from "lucide-react";

const Home = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Welcome to Recroot ATS</h1>
        <p className="text-muted-foreground mt-2">
          Manage your candidates, jobs, and hiring process in one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Database Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              My Database
            </CardTitle>
            <CardDescription>
              Add, search, and view candidate profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/database/new-candidate">
                  <FileText className="mr-2 h-4 w-4" /> New Candidate
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/database/search-candidate">
                  <Search className="mr-2 h-4 w-4" /> Search Candidate
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/database/view-candidate">
                  <Users className="mr-2 h-4 w-4" /> View Candidates
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sourcing Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Sourcing
            </CardTitle>
            <CardDescription>
              Find and manage talent pools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/sourcing/talent-search">
                  <Search className="mr-2 h-4 w-4" /> Talent Search
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/sourcing/talent-pipeline">
                  <Users className="mr-2 h-4 w-4" /> Talent Pipeline
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Jobs
            </CardTitle>
            <CardDescription>
              Manage job postings and applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-24 text-muted-foreground">
              Coming Soon
            </div>
          </CardContent>
        </Card>

        {/* Analytics Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Analytics
            </CardTitle>
            <CardDescription>
              Track recruitment metrics and KPIs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/analytics/candidates">
                  <Users className="mr-2 h-4 w-4" /> Candidates
                </Link>
              </Button>
              <div className="text-center text-sm text-muted-foreground py-2">
                More analytics features coming soon
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
            <CardDescription>
              Configure your ATS system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/settings/connect">
                  <Database className="mr-2 h-4 w-4" /> Connect
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start" disabled>
                <Link to="/settings/financials">
                  <BarChart className="mr-2 h-4 w-4" /> Financials (Coming Soon)
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
