import { NOTE_COLORS } from "./utils/colors";
import { Button } from "react-bootstrap";
type ColorPickerProps = {
  selectedColor: string;
  onChange: (color: string) => void;
};

export function ColorPicker({ selectedColor, onChange }: ColorPickerProps) {
  return (
    <div className="d-flex flex-wrap gap-2 mt-1">
      {NOTE_COLORS.map((color) => (
        <Button
          key={color}
          onClick={() => onChange(color)}
          className={`p-0 border ${
            selectedColor === color
              ? "border-dark border-2"
              : "border-secondary"
          }`}
          style={{
            backgroundColor: color,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
}
