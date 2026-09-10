import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const CATEGORIES = ["Decoration", "Fashion", "Home", "Beauty", "Sports"];

const Filter = ({ price = [0, 25000], onPriceChange, onCategoryChange, ratings, onRatingsChange }) => {
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
      <div className="mt-4">
        <Typography component="legend" className="text-sm font-medium text-mist-70">Ratings</Typography>
        <Slider
          value={ratings}
          onChange={(_event, newRatings) => onRatingsChange?.(newRatings)}
          valueLabelDisplay="auto"
          min={0}
          max={5}
          step={0.1}
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
