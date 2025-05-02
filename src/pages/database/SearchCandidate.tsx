
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Eye } from "lucide-react";
import { candidatesAPI } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

interface Candidate {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  currentPosition?: string;
  location?: string;
  skills?: string[];
  status: string;
  createdAt: string;
}

const SearchCandidate = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [isSearching, setIsSearching] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        variant: 'destructive',
        title: 'Search query required',
        description: 'Please enter a search term',
      });
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      // Build search parameters based on search type
      const searchParams: Record<string, string> = {};
      
      if (searchBy === "name") {
        searchParams.q = searchQuery;
      } else if (searchBy === "email") {
        searchParams.email = searchQuery;
      } else if (searchBy === "phone") {
        searchParams.phone = searchQuery;
      } else if (searchBy === "authorization") {
        searchParams.authorization = searchQuery;
      }
      
      const result = await candidatesAPI.searchCandidates(searchParams);
      setCandidates(result.data || []);
      
      toast({
        title: `Search Results`,
        description: `Found ${result.data.length} candidates matching your criteria`,
      });
    } catch (error) {
      console.error('Search error:', error);
      setCandidates([]);
    } finally {
      setIsSearching(false);
    }
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

            <Button type="submit" className="w-full sm:w-auto" disabled={isSearching}>
              <Search className="mr-2 h-4 w-4" /> {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
          <CardDescription>
            {hasSearched 
              ? `Found ${candidates.length} candidates matching your criteria` 
              : 'Candidates matching your search criteria will appear here'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!hasSearched ? (
            <div className="text-center text-muted-foreground py-12">
              Start searching to see results
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              No candidates found matching your search criteria
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Position</th>
                    <th className="text-left py-3 px-4">Location</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate._id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">
                        {candidate.firstName} {candidate.lastName}
                      </td>
                      <td className="py-3 px-4">
                        {candidate.currentPosition || 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        {candidate.location || 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs
                          ${candidate.status === 'hired' ? 'bg-green-100 text-green-800' :
                            candidate.status === 'interviewing' ? 'bg-blue-100 text-blue-800' :
                              candidate.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                          }`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/candidates/${candidate._id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchCandidate;
