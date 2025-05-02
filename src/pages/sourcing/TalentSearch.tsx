
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Search, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { candidatesAPI } from "@/lib/api-client";
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

const TalentSearch = () => {
  const [booleanQuery, setBooleanQuery] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [range, setRange] = useState("25");
  const [externalSearch, setExternalSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleBooleanSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!booleanQuery.trim()) {
      toast({
        variant: 'destructive',
        title: 'Search query required',
        description: 'Please enter a boolean search query',
      });
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      // Build search parameters
      const searchParams: Record<string, string> = {
        q: booleanQuery
      };
      
      if (country) searchParams.country = country;
      if (state) searchParams.state = state;
      if (zipcode) searchParams.zipcode = zipcode;
      if (range) searchParams.range = range;
      
      const result = await candidatesAPI.searchCandidates(searchParams);
      setSearchResults(result.data || []);
      
      toast({
        title: `Search Results`,
        description: `Found ${result.data.length} candidates matching your criteria`,
      });
    } catch (error) {
      console.error('Boolean search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleNormalSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobTitle && !education && !skills) {
      toast({
        variant: 'destructive',
        title: 'Search criteria required',
        description: 'Please enter at least one search criteria',
      });
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    
    try {
      // Build search parameters for normal search
      const searchParams: Record<string, string> = {};
      
      if (jobTitle) searchParams.position = jobTitle;
      if (education) searchParams.education = education;
      if (skills) searchParams.skills = skills;
      if (country) searchParams.country = country;
      if (state) searchParams.state = state;
      if (zipcode) searchParams.zipcode = zipcode;
      if (range) searchParams.range = range;
      
      const result = await candidatesAPI.searchCandidates(searchParams);
      setSearchResults(result.data || []);
      
      toast({
        title: `Search Results`,
        description: `Found ${result.data.length} candidates matching your criteria`,
      });
    } catch (error) {
      console.error('Normal search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Talent Search</h1>
        <p className="text-muted-foreground mt-1">Find candidates using powerful search tools</p>
      </div>

      <Tabs defaultValue="boolean" className="space-y-4">
        <TabsList>
          <TabsTrigger value="boolean">Boolean Search</TabsTrigger>
          <TabsTrigger value="normal">Normal Search</TabsTrigger>
        </TabsList>
        <TabsContent value="boolean">
          <Card>
            <CardHeader>
              <CardTitle>Boolean Search</CardTitle>
              <CardDescription>
                Use AND, OR, NOT operators and quotes for precise searching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBooleanSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="booleanQuery">Search query</Label>
                  <Textarea 
                    id="booleanQuery"
                    placeholder='Example: "Software Engineer" AND (React OR Angular) NOT "Junior"'
                    className="min-h-24"
                    value={booleanQuery}
                    onChange={(e) => setBooleanQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <select 
                        id="country"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="">Select a country</option>
                        <option value="US">United States</option>
                        <option value="IN">India</option>
                        <option value="CA">Canada</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <select 
                        id="state"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="">Select a state</option>
                        {country === 'US' && (
                          <>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                          </>
                        )}
                        {country === 'IN' && (
                          <>
                            <option value="MH">Maharashtra</option>
                            <option value="KA">Karnataka</option>
                            <option value="TN">Tamil Nadu</option>
                            <option value="HR">Haryana</option>
                          </>
                        )}
                        {country === 'CA' && (
                          <>
                            <option value="ON">Ontario</option>
                            <option value="BC">British Columbia</option>
                            <option value="QC">Quebec</option>
                            <option value="AB">Alberta</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="zipcode">Zipcode & Range</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="zipcode" 
                          placeholder="Zipcode" 
                          value={zipcode}
                          onChange={(e) => setZipcode(e.target.value)}
                        />
                        <select 
                          id="range"
                          className="flex h-10 w-1/3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          value={range}
                          onChange={(e) => setRange(e.target.value)}
                        >
                          <option value="10">10 miles</option>
                          <option value="25">25 miles</option>
                          <option value="50">50 miles</option>
                          <option value="100">100 miles</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="externalSearch" 
                    checked={externalSearch} 
                    onCheckedChange={setExternalSearch}
                  />
                  <Label htmlFor="externalSearch">
                    Search external databases (Monster, Dice, CareerBuilder, LinkedIn)
                  </Label>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button type="submit" disabled={isSearching}>
                    <Search className="mr-2 h-4 w-4" />
                    {isSearching ? 'Searching...' : 'Search'}
                  </Button>
                  <Button type="button" variant="outline">
                    Save Search
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="normal">
          <Card>
            <CardHeader>
              <CardTitle>Normal Search</CardTitle>
              <CardDescription>
                Fill in the fields to search for candidates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNormalSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">I am looking for a</Label>
                  <Input 
                    id="jobTitle" 
                    placeholder="Job title (e.g. Software Engineer)" 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">With education in</Label>
                  <Input 
                    id="education" 
                    placeholder="Education (e.g. Computer Science)" 
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Having skills</Label>
                  <Input 
                    id="skills" 
                    placeholder="Skills (e.g. React, Node.js, Python)" 
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="countryNormal">Country</Label>
                      <select 
                        id="countryNormal"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="">Select a country</option>
                        <option value="US">United States</option>
                        <option value="IN">India</option>
                        <option value="CA">Canada</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="stateNormal">State</Label>
                      <select 
                        id="stateNormal"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="">Select a state</option>
                        {country === 'US' && (
                          <>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                          </>
                        )}
                        {country === 'IN' && (
                          <>
                            <option value="MH">Maharashtra</option>
                            <option value="KA">Karnataka</option>
                            <option value="TN">Tamil Nadu</option>
                            <option value="HR">Haryana</option>
                          </>
                        )}
                        {country === 'CA' && (
                          <>
                            <option value="ON">Ontario</option>
                            <option value="BC">British Columbia</option>
                            <option value="QC">Quebec</option>
                            <option value="AB">Alberta</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="zipcodeNormal">Zipcode & Range</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="zipcodeNormal" 
                          placeholder="Zipcode" 
                          value={zipcode}
                          onChange={(e) => setZipcode(e.target.value)}
                        />
                        <select 
                          id="rangeNormal"
                          className="flex h-10 w-1/3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          value={range}
                          onChange={(e) => setRange(e.target.value)}
                        >
                          <option value="10">10 miles</option>
                          <option value="25">25 miles</option>
                          <option value="50">50 miles</option>
                          <option value="100">100 miles</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="externalSearchNormal" 
                    checked={externalSearch} 
                    onCheckedChange={setExternalSearch}
                  />
                  <Label htmlFor="externalSearchNormal">
                    Search external databases (Monster, Dice, CareerBuilder, LinkedIn)
                  </Label>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button type="submit" disabled={isSearching}>
                    <Search className="mr-2 h-4 w-4" />
                    {isSearching ? 'Searching...' : 'Search'}
                  </Button>
                  <Button type="button" variant="outline">
                    Save Search
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {searchResults.length} candidates matching your criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            {searchResults.length === 0 ? (
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
                    {searchResults.map((candidate) => (
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
      )}
    </div>
  );
};

export default TalentSearch;
