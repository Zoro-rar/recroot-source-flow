
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

const TalentPipeline = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Talent Pipeline</h1>
        <p className="text-muted-foreground mt-1">Manage your saved searches and candidate pools</p>
      </div>

      <Tabs defaultValue="searches" className="space-y-4">
        <TabsList>
          <TabsTrigger value="searches">Saved Searches</TabsTrigger>
          <TabsTrigger value="loops">Custom Talent Loops</TabsTrigger>
        </TabsList>
        <TabsContent value="searches">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Saved Searches</CardTitle>
                  <CardDescription>
                    Access your previously saved search criteria
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p className="mb-4">No saved searches yet</p>
                <Button asChild>
                  <a href="/sourcing/talent-search">Create Your First Search</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loops">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Custom Talent Loops</CardTitle>
                  <CardDescription>
                    Create and manage custom candidate pools
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Loop
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <p>No custom talent loops created yet</p>
              </div>
            </CardContent>
          </Card>

          {/* New Loop Form (would be in a dialog or separate page in full implementation) */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Create New Talent Loop</CardTitle>
              <CardDescription>
                Define a custom group of candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loopName">Loop Name</Label>
                  <Input id="loopName" placeholder="E.g., Senior React Developers" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loopDescription">Description (Optional)</Label>
                  <Input id="loopDescription" placeholder="Description of this talent loop" />
                </div>
                <Button>Create Loop</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TalentPipeline;
