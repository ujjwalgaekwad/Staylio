type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h1 className="text-md font-semibold mb-2">Select Price Range</h1>
      <div>
        <select
          className="px-4 py-2 border rounded-md"
          name="Price Filter"
          title="Price Filter"
          value={selectedPrice}
          onChange={(prev) =>
            onChange(
              prev.target.value ? parseInt(prev.target.value) : undefined
            )
          }
        >
          <option value="">Select Price Range</option>
          {[
            "1000",
            "2000",
            "3000",
            "4000",
            "5000",
            "6000",
            "7000",
            "8000",
            "9000",
            "10000",
            "12000",
            "15000",
            "20000",
          ].map((price, index) => (
            <option key={index} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PriceFilter;
