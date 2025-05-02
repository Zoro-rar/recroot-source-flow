
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { candidatesAPI } from "@/lib/api-client";
import { Eye, Search, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

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

const ViewCandidate = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();

  const fetchCandidates = async (page = 1) => {
    setLoading(true);
    try {
      const result = await candidatesAPI.getAllCandidates(page, 10);
      setCandidates(result.data || []);
      setTotalCandidates(result.total || 0);
      setTotalPages(Math.ceil((result.total || 0) / 10));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load candidates. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">View Candidates</h1>
          <p className="text-muted-foreground mt-1">Manage your candidate database</p>
        </div>
        <div className="bg-muted px-4 py-2 rounded-lg">
          <span className="text-sm font-medium">Total Candidates: </span>
          <span className="text-lg font-bold">{totalCandidates}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link to="/database/new-candidate">
            <FileSearch className="mr-2 h-4 w-4" />
            Add New Candidate
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/database/search-candidate">
            <Search className="mr-2 h-4 w-4" />
            Search Candidates
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Candidate Database</CardTitle>
          <CardDescription>
            All candidates you've added to your database
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-2">Loading candidates...</p>
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="mb-4">No candidates in your database yet</p>
              <Button asChild>
                <Link to="/database/new-candidate">Add Your First Candidate</Link>
              </Button>
            </div>
          ) : (
            <>
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

              {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                  <nav>
                    <ul className="flex items-center gap-1">
                      <li>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fetchCandidates(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li key={page}>
                          <Button
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => fetchCandidates(page)}
                          >
                            {page}
                          </Button>
                        </li>
                      ))}
                      <li>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fetchCandidates(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewCandidate;
