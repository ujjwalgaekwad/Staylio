type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ onPageChange, page, pages }: Props) => {
  const totalPages = [];
  for (let i = 1; i <= pages; i++) {
    totalPages.push(i);
  }
  
  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {totalPages.map((number, index) => (
          <li
            key={index}
            className={`px-2 py-1 ${page === number ? "bg-gray-300" : ""}`}
          >
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
