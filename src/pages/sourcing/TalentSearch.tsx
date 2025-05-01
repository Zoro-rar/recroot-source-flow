
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

const TalentSearch = () => {
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="booleanQuery">Search query</Label>
                  <Textarea 
                    id="booleanQuery"
                    placeholder='Example: "Software Engineer" AND (React OR Angular) NOT "Junior"'
                    className="min-h-24"
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
                      >
                        <option value="">Select a state</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="zipcode">Zipcode & Range</Label>
                      <div className="flex gap-2">
                        <Input id="zipcode" placeholder="Zipcode" />
                        <select 
                          id="range"
                          className="flex h-10 w-1/3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  <Switch id="externalSearch" />
                  <Label htmlFor="externalSearch">
                    Search external databases (Monster, Dice, CareerBuilder, LinkedIn)
                  </Label>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                  <Button variant="outline">
                    Save Search
                  </Button>
                </div>
              </div>
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">I am looking for a</Label>
                  <Input id="jobTitle" placeholder="Job title (e.g. Software Engineer)" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">With education in</Label>
                  <Input id="education" placeholder="Education (e.g. Computer Science)" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Having skills</Label>
                  <Input id="skills" placeholder="Skills (e.g. React, Node.js, Python)" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="countryNormal">Country</Label>
                      <select 
                        id="countryNormal"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                      >
                        <option value="">Select a state</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="zipcodeNormal">Zipcode & Range</Label>
                      <div className="flex gap-2">
                        <Input id="zipcodeNormal" placeholder="Zipcode" />
                        <select 
                          id="rangeNormal"
                          className="flex h-10 w-1/3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  <Switch id="externalSearchNormal" />
                  <Label htmlFor="externalSearchNormal">
                    Search external databases (Monster, Dice, CareerBuilder, LinkedIn)
                  </Label>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                  <Button variant="outline">
                    Save Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TalentSearch;
