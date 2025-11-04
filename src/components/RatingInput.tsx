import { Star } from 'lucide-react';
import { Label } from './ui/label';

interface RatingInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon?: string;
}

export function RatingInput({ label, value, onChange, icon }: RatingInputProps) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </Label>
      <div className="flex gap-2" role="radiogroup" aria-label={label}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md transition-transform hover:scale-110"
            aria-label={`${rating} estrelas`}
            aria-checked={value === rating}
            role="radio"
          >
            <Star
              className={`w-10 h-10 ${
                rating <= value
                  ? 'fill-secondary text-secondary'
                  : 'fill-muted text-muted'
              }`}
            />
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Avaliação: {value}/5
      </p>
    </div>
  );
}
