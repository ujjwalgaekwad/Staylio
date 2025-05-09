import { hotelFacilities } from "@/config/hotelOptions";

type Props = {
  selectedFacilities: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-2 text-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Facilities</h2>
      <div className="space-y-2">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className="flex items-center space-x-3 text-gray-600"
          >
            <input
              type="checkbox"
              value={facility}
              checked={selectedFacilities.includes(facility)}
              onChange={onChange}
              className="form-checkbox h-4 w-4 text-yellow-500"
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesFilter;
