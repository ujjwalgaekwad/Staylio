import { typesOfHotels } from "@/config/hotelOptions";

type Props = {
  selectedHotelType: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypeFilter = ({ selectedHotelType, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-2 text-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Hotel Types</h2>
      <div className="space-y-2">
        {typesOfHotels.map((hoteType) => (
          <label
            key={hoteType}
            className="flex items-center space-x-3 text-gray-600"
          >
            <input
              type="checkbox"
              value={hoteType}
              checked={selectedHotelType.includes(hoteType)}
              onChange={onChange}
              className="form-checkbox h-4 w-4 text-yellow-500"
            />
            <span>{hoteType}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HotelTypeFilter;
