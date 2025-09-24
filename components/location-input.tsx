
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, MapPin, Navigation } from 'lucide-react';
import { toast } from 'sonner';
import { useGeolocation } from '@/hooks/useGeolocation';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = "e.g., Baku, Azerbaijan"
}) => {
  const [isManualInput, setIsManualInput] = useState(false);
  const { isLoading, error, getCurrentLocation } = useGeolocation();

  const handleDetectLocation = async () => {
    try {
      const location = await getCurrentLocation();
      if (location) {
        onChange(location.formatted);
        toast.success('Location detected successfully!');
      }
    } catch (err) {
      toast.error('Failed to detect location. Please enter manually.');
      console.log(err);
      setIsManualInput(true);
    }
  };

  const handleManualToggle = () => {
    setIsManualInput(!isManualInput);
    if (!isManualInput) {
      onChange('');
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>
      
      <div className="flex gap-2">
        <Input
          id="location"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || (!isManualInput && isLoading)}
          placeholder={placeholder}
          className="flex-1 dark:bg-neutral-800 dark:text-white"
        />
        
        {!isManualInput ? (
          <Button
            type="button"
            onClick={handleDetectLocation}
            disabled={disabled || isLoading}
            variant="outline"
            className="whitespace-nowrap"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4" />
            )}
            <span className="sr-only">Detect Location</span>
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleManualToggle}
            disabled={disabled}
            variant="outline"
          >
            <MapPin className="h-4 w-4" />
            <span className="sr-only">Use Current Location</span>
          </Button>
        )}
      </div>

      {!isManualInput && (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={handleManualToggle}
            variant="link"
            className="h-auto p-0 text-sm text-muted-foreground"
            disabled={disabled}
          >
            Enter location manually
          </Button>
        </div>
      )}

      {error && !isManualInput && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default LocationInput;