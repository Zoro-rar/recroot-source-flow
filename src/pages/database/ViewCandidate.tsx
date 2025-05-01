
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ViewCandidate = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">View Candidates</h1>
          <p className="text-muted-foreground mt-1">Manage your candidate database</p>
        </div>
        <div className="bg-muted px-4 py-2 rounded-lg">
          <span className="text-sm font-medium">Total Candidates: </span>
          <span className="text-lg font-bold">0</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Candidate Database</CardTitle>
          <CardDescription>
            All candidates you've added to your database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p className="mb-4">No candidates in your database yet</p>
            <Button asChild>
              <a href="/database/new-candidate">Add Your First Candidate</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewCandidate;
