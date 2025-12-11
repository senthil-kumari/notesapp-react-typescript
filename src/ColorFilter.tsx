import { Button, Dropdown } from "react-bootstrap";
import { NOTE_COLORS } from "./utils/colors";

type ColorFilterProps = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

export default function ColorFilter({
  selectedColor,
  setSelectedColor,
}: ColorFilterProps) {
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="color-filter">
          {selectedColor ? (
            <span
              style={{
                width: 100,
                display: "inline-block",
                height: 20,
                backgroundColor: selectedColor,
              }}
            />
          ) : (
            "Filter by color"
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {NOTE_COLORS.map((color) => (
            <Dropdown.Item
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  width: "100%",
                  height: 20,
                  backgroundColor: color,
                }}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
        <Button
          className="pl-2"
          variant="outline"
          onClick={() => setSelectedColor("")}
        >
          🔄️
        </Button>
      </Dropdown>
    </>
  );
}
