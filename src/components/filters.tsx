import { FC, useState } from "react";
import { useForm } from "react-hook-form";

interface FiltersProps {
  onSubmit: (perPage: number, description: string) => void;
}

const Filters: FC<FiltersProps> = ({ onSubmit }) => {
  const [perPage, setPerPage] = useState(10);
  const { register, handleSubmit } = useForm();
  const onSubmitFilters = (data: any) => {
    onSubmit(perPage, data.description);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitFilters)} className="filters">
      <input
        {...register("description")}
        type="text"
        className="description form-control mx-2"
        placeholder="Search case description"
      />
      <input
        {...register("startDate")}
        type="date"
        name="start"
        disabled={true}
        className="start-date form-control disabled mx-2"
      />
      <input
        {...register("endDate")}
        type="date"
        name="end"
        disabled={true}
        className="end-date form-control disabled mx-2"
      />
      <div className="dropdown mx-2">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {perPage}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {[10, 25, 50, 100].map((i) => (
            <li key={`page-${i}`} onClick={() => setPerPage(i)}>
              <a className="dropdown-item" href="#">
                {i}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button type="submit" className="button btn btn-primary mx-2">
        Find cases
      </button>
    </form>
  );
};

export default Filters;
