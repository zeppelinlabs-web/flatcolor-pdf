import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export interface MarginConfig {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface MarginControlsProps {
  margins: MarginConfig;
  onChange: (margins: MarginConfig) => void;
}

const MarginControls = ({ margins, onChange }: MarginControlsProps) => {
  const handleMarginChange = (key: keyof MarginConfig, value: number) => {
    onChange({ ...margins, [key]: value });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Page Margins</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium">Top</Label>
              <span className="text-xs text-muted-foreground">{margins.top}mm</span>
            </div>
            <Slider
              value={[margins.top]}
              onValueChange={(value) => handleMarginChange("top", value[0])}
              min={5}
              max={30}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium">Right</Label>
              <span className="text-xs text-muted-foreground">{margins.right}mm</span>
            </div>
            <Slider
              value={[margins.right]}
              onValueChange={(value) => handleMarginChange("right", value[0])}
              min={5}
              max={30}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium">Bottom</Label>
              <span className="text-xs text-muted-foreground">{margins.bottom}mm</span>
            </div>
            <Slider
              value={[margins.bottom]}
              onValueChange={(value) => handleMarginChange("bottom", value[0])}
              min={5}
              max={30}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium">Left</Label>
              <span className="text-xs text-muted-foreground">{margins.left}mm</span>
            </div>
            <Slider
              value={[margins.left]}
              onValueChange={(value) => handleMarginChange("left", value[0])}
              min={5}
              max={30}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            💡 Adjust margins to add more or less space around content (5-30mm)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarginControls;
