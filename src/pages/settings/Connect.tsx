
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Database } from "lucide-react";

const Connect = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Connect</h1>
        <p className="text-muted-foreground mt-1">
          Integrate with external job boards and databases
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <img 
                src="https://media.monster.com/assets/images/header_logo.png" 
                alt="Monster" 
                className="h-6 mr-2" 
              />
              Monster
            </CardTitle>
            <CardDescription>
              Connect to Monster's candidate database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Not connected</span>
              <Button>Connect</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <img 
                src="https://www.dice.com/binaries/content/gallery/dice/site-pictures/dice-logo-white.png" 
                alt="Dice" 
                className="h-6 mr-2" 
              />
              Dice
            </CardTitle>
            <CardDescription>
              Connect to Dice's tech talent database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Not connected</span>
              <Button>Connect</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <img 
                src="https://www.careerbuilder.com/assets/homepage/logo-1200x630.jpg" 
                alt="CareerBuilder" 
                className="h-6 mr-2" 
              />
              CareerBuilder
            </CardTitle>
            <CardDescription>
              Connect to CareerBuilder's resume database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Not connected</span>
              <Button>Connect</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <img 
                src="https://cdn-cookiestatement.vivian.com/logo.svg" 
                alt="Vivian" 
                className="h-6 mr-2" 
              />
              Vivian
            </CardTitle>
            <CardDescription>
              Connect to Vivian's healthcare professional database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Not connected</span>
              <Button>Connect</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <img 
                src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" 
                alt="LinkedIn" 
                className="h-6 mr-2" 
              />
              LinkedIn
            </CardTitle>
            <CardDescription>
              Connect to LinkedIn's professional network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Not connected</span>
              <Button>Connect</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-6 w-6 mr-2" />
              Custom API
            </CardTitle>
            <CardDescription>
              Connect to your own custom API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Not connected</span>
              <Button>Configure</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Connect;
