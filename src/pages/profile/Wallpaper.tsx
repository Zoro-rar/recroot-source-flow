
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Upload } from "lucide-react";

const wallpapers = [
  { id: "default", name: "Default", image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&w=300&q=80" },
  { id: "blue", name: "Blue Gradient", image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?auto=format&fit=crop&w=300&q=80" },
  { id: "mountain", name: "Mountain", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80" },
  { id: "geometric", name: "Geometric", image: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&w=300&q=80" },
  { id: "dark", name: "Dark Texture", image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=300&q=80" },
  { id: "forest", name: "Forest", image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=300&q=80" },
];

const Wallpaper = () => {
  const [selectedWallpaper, setSelectedWallpaper] = useState("default");
  const [customWallpaper, setCustomWallpaper] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState(false);

  const handleCustomWallpaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomWallpaper(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveWallpaper = () => {
    console.log("Selected wallpaper:", selectedWallpaper);
    console.log("Custom wallpaper:", customWallpaper);
    // Here you would save the wallpaper selection to your backend
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Wallpaper</h1>
        <p className="text-muted-foreground mt-1">
          Customize your application background
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Wallpaper</CardTitle>
          <CardDescription>
            Choose from pre-set wallpapers or upload your own
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <RadioGroup 
              value={uploadMode ? "custom" : selectedWallpaper} 
              onValueChange={(value) => {
                if (value === "custom") {
                  setUploadMode(true);
                } else {
                  setUploadMode(false);
                  setSelectedWallpaper(value);
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {wallpapers.map((wallpaper) => (
                <div key={wallpaper.id} className="space-y-2">
                  <div className={`
                    border-2 rounded-md overflow-hidden aspect-video cursor-pointer
                    ${(selectedWallpaper === wallpaper.id && !uploadMode) ? "border-primary" : "border-transparent"}
                  `}>
                    <img 
                      src={wallpaper.image}
                      alt={wallpaper.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={wallpaper.id} id={wallpaper.id} />
                    <Label htmlFor={wallpaper.id}>{wallpaper.name}</Label>
                  </div>
                </div>
              ))}

              <div className="space-y-2">
                <div className={`
                  border-2 rounded-md overflow-hidden aspect-video cursor-pointer bg-muted flex items-center justify-center
                  ${uploadMode ? "border-primary" : "border-transparent"}
                `}>
                  {customWallpaper ? (
                    <img 
                      src={customWallpaper}
                      alt="Custom wallpaper"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Upload custom image</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Custom</Label>
                </div>
              </div>
            </RadioGroup>

            {uploadMode && (
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-1">
                      Drag and drop image here
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to browse (JPG, PNG)
                    </p>
                    <input
                      type="file"
                      id="wallpaper-upload"
                      accept="image/jpeg,image/png"
                      className="hidden"
                      onChange={handleCustomWallpaperUpload}
                    />
                    <label htmlFor="wallpaper-upload">
                      <Button className="cursor-pointer">Select Image</Button>
                    </label>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recommended image size: 1920x1080px (16:9 aspect ratio)
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={saveWallpaper}>Save Wallpaper</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See how your selected wallpaper will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden h-64">
            {uploadMode && customWallpaper ? (
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${customWallpaper})` }}
              >
                <div className="w-full h-full flex items-center justify-center backdrop-blur-sm bg-black/30">
                  <div className="bg-background/90 p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold mb-2">Recroot ATS</h3>
                    <p>Custom wallpaper preview</p>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${wallpapers.find(w => w.id === selectedWallpaper)?.image})` }}
              >
                <div className="w-full h-full flex items-center justify-center backdrop-blur-sm bg-black/30">
                  <div className="bg-background/90 p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold mb-2">Recroot ATS</h3>
                    <p>Wallpaper preview</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallpaper;
