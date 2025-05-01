
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchCandidate = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, "by", searchBy);
    // Here you would implement the search functionality
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Search Candidates</h1>
        <p className="text-muted-foreground mt-1">Find candidates in your database</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Criteria</CardTitle>
          <CardDescription>
            Find candidates by name, email, phone, or work authorization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="searchBy">Search by</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={searchBy === "name" ? "default" : "outline"}
                  onClick={() => setSearchBy("name")}
                >
                  Name
                </Button>
                <Button
                  type="button"
                  variant={searchBy === "email" ? "default" : "outline"}
                  onClick={() => setSearchBy("email")}
                >
                  Email
                </Button>
                <Button
                  type="button"
                  variant={searchBy === "phone" ? "default" : "outline"}
                  onClick={() => setSearchBy("phone")}
                >
                  Phone
                </Button>
                <Button
                  type="button"
                  variant={searchBy === "authorization" ? "default" : "outline"}
                  onClick={() => setSearchBy("authorization")}
                >
                  Work Authorization
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="searchQuery">Search term</Label>
              <div className="relative">
                <Input
                  id="searchQuery"
                  placeholder={`Enter candidate ${searchBy}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>
            Candidates matching your search criteria will appear here
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground py-12">
          Start searching to see results
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchCandidate;
