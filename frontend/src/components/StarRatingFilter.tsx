type Props = {
  selected: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selected, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-2 text-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Star Ratings</h2>
      <div className="space-y-2">
        {["1", "2", "3", "4", "5"].map((star) => (
          <label
            key={star}
            className="flex items-center space-x-3 text-gray-600"
          >
            <input
              type="checkbox"
              value={star}
              checked={selected.includes(star)}
              onChange={onChange}
              className="form-checkbox h-4 w-4 text-yellow-500"
            />
            <span>
              {star} Star{star !== "1" && "s"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StarRatingFilter;
