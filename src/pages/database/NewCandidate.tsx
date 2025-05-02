
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Upload, File } from "lucide-react";
import { candidatesAPI } from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const NewCandidate = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBulkFiles(Array.from(e.target.files));
    }
  };

  const handleSingleUpload = async () => {
    if (!selectedFile) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a resume file to upload',
      });
      return;
    }

    setIsUploading(true);
    try {
      const result = await candidatesAPI.uploadResume(selectedFile);
      toast({
        title: 'Resume Uploaded',
        description: 'Resume has been successfully uploaded',
      });
      // Navigate to view candidates page
      navigate('/database/view-candidate');
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleBulkUpload = async () => {
    if (bulkFiles.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No files selected',
        description: 'Please select resume files to upload',
      });
      return;
    }

    setIsUploading(true);
    try {
      // Process each file in the bulk upload array
      const promises = bulkFiles.map(file => candidatesAPI.uploadResume(file));
      await Promise.all(promises);
      
      toast({
        title: 'Resumes Uploaded',
        description: `${bulkFiles.length} resumes have been successfully uploaded`,
      });
      // Navigate to view candidates page
      navigate('/database/view-candidate');
    } catch (error) {
      console.error('Bulk upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, isBulk: boolean) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (isBulk) {
        setBulkFiles(Array.from(e.dataTransfer.files));
      } else {
        setSelectedFile(e.dataTransfer.files[0]);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">New Candidate</h1>
        <p className="text-muted-foreground mt-1">Add candidates to your database</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Resumes</CardTitle>
          <CardDescription>
            Add candidates by uploading their resumes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="single">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Single Upload</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="single" className="mt-6 space-y-4">
              <div 
                className={`border-2 border-dashed rounded-md p-10 text-center ${selectedFile ? 'border-primary' : ''}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, false)}
              >
                <div className="mx-auto flex flex-col items-center justify-center">
                  {selectedFile ? (
                    <>
                      <File className="h-10 w-10 text-primary mb-4" />
                      <p className="text-lg font-medium mb-1">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium mb-1">Drag and drop resume file</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        or click to browse (PDF, DOC, DOCX)
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button 
                    onClick={() => document.getElementById('resume-upload')?.click()}
                    variant={selectedFile ? 'secondary' : 'default'}
                  >
                    {selectedFile ? 'Change File' : 'Select File'}
                  </Button>
                </div>
              </div>
              {selectedFile && (
                <Button 
                  className="w-full" 
                  onClick={handleSingleUpload}
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Upload Resume'}
                </Button>
              )}
            </TabsContent>
            <TabsContent value="bulk" className="mt-6 space-y-4">
              <div 
                className={`border-2 border-dashed rounded-md p-10 text-center ${bulkFiles.length > 0 ? 'border-primary' : ''}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, true)}
              >
                <div className="mx-auto flex flex-col items-center justify-center">
                  {bulkFiles.length > 0 ? (
                    <>
                      <File className="h-10 w-10 text-primary mb-4" />
                      <p className="text-lg font-medium mb-1">{bulkFiles.length} files selected</p>
                      <ul className="text-sm text-muted-foreground mb-4 max-h-32 overflow-y-auto">
                        {bulkFiles.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium mb-1">Drag and drop multiple resume files</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        or click to browse (PDF, DOC, DOCX)
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    id="bulk-resume-upload"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    multiple
                    onChange={handleBulkFileChange}
                  />
                  <Button 
                    onClick={() => document.getElementById('bulk-resume-upload')?.click()}
                    variant={bulkFiles.length > 0 ? 'secondary' : 'default'}
                  >
                    {bulkFiles.length > 0 ? 'Change Files' : 'Select Files'}
                  </Button>
                </div>
              </div>
              {bulkFiles.length > 0 && (
                <Button 
                  className="w-full" 
                  onClick={handleBulkUpload}
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : `Upload ${bulkFiles.length} Resumes`}
                </Button>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCandidate;
