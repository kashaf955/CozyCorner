import Slider from "@mui/material/Slider";
import { useState } from "react";
import { useSelector } from "react-redux";

const CATEGORIES = ["Decoration", "Fashion", "Home", "Beauty", "Sports"];

const Filter = ({ price = [0, 25000], onPriceChange, onCategoryChange }) => {
  return (
    <aside className="w-full shrink-0 md:w-56 lg:w-64">
      <div className="rounded-lg border border-white/10 bg-[#15201c] p-5">
        <h3 className="mb-4 font-display text-lg text-mist">Filters</h3>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-mist-70">Price</p>
          <p className="text-xs text-mist-70">
            ${price[0]} — ${price[1]}
          </p>
          <Slider
            value={price}
            onChange={(_event, newPrice) => onPriceChange?.(newPrice)}
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
      <div className="mt-4">
        <h3 className="mb-4 font-display text-lg text-mist">Category</h3>
        <ul className="flex flex-col gap-2">
          {CATEGORIES.map((category) => (
            <li key={category}>
              <label>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={(e) => onCategoryChange?.(e.target.value)}
                />
                <span className="text-sm font-medium text-mist-70 ml-2">{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Filter;
