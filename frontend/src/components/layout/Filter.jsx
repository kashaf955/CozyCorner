import { useState } from "react";
import Slider from "@mui/material/Slider";

const Filter = ({ price, onPriceChange }) => {
  const [localPrice, setLocalPrice] = useState(price ?? [0, 25000]);

  const handleChange = (_event, newPrice) => {
    setLocalPrice(newPrice);
    onPriceChange?.(newPrice);
  };

  return (
    <aside className="w-full shrink-0 md:w-56 lg:w-64">
      <div className="rounded-lg border border-white/10 bg-[#15201c] p-5">
        <h3 className="mb-4 font-display text-lg text-mist">Filters</h3>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-mist-70">Price</p>
          <p className="text-xs text-mist-70">
            ${localPrice[0]} — ${localPrice[1]}
          </p>
          <Slider
            value={localPrice}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={25000}
            step={100}
            sx={{
              color: "#3d6b54",
              "& .MuiSlider-thumb": {
                backgroundColor: "#e8f0ec",
              },
              "& .MuiSlider-rail": {
                opacity: 0.35,
              },
            }}
          />
        </div>
      </div>
    </aside>
  );
};

export default Filter;
