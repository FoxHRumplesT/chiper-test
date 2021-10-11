import React, { useEffect, useState } from "react";
import "./App.css";
import Filters from "./components/filters";
import Pagination from "./components/pagination";

interface StolenCase {
  title: string;
  thumb: string;
  date_stolen: number;
  stolen_location: string;
  description: string;
}

function App() {
  const [cases, setCases] = useState<StolenCase[]>([] as StolenCase[]);
  const [casesCount, setCasesCount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(1);

  const fetchStolenBikes = () => {
    setIsLoading(true);
    let searchUrl = `https://bikeindex.org:443/api/v3/search?page=${page}&per_page=${perPage}&location=Berlin&distance=1&stolenness=stolen`;
    let countUrl = `https://bikeindex.org:443/api/v3/search/count?location=Berlin&distance=1&stolenness=stolen`;
    if (description) {
      searchUrl = searchUrl + `&query=${description}`;
      countUrl = countUrl + `&query=${description}`;
    }
    Promise.all([fetch(searchUrl), fetch(countUrl)])
      .then(async ([bikes, count]) => {
        if (!bikes.ok || !count.ok) {
          throw new Error("Not 2xx response");
        } else {
          return {
            bikesResponse: await bikes.json(),
            countResponse: await count.json(),
          };
        }
      })
      .then(({ bikesResponse, countResponse }) => {
        setCases(bikesResponse.bikes || []);
        setCasesCount(countResponse.stolen || []);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const totalPages = () => {
    return Math.ceil(casesCount / perPage);
  };

  useEffect(() => {
    fetchStolenBikes();
  }, [page, description]);

  return (
    <div className="app">
      <header className="header">
        <figure>
          <img src="/logo.png" alt="logo" />
        </figure>
        <h1>Police department of Berlin</h1>
      </header>
      <Filters
        onSubmit={(perPage, description) => {
          setPerPage(perPage);
          setDescription(description);
        }}
      />
      <div className="content">
        {isLoading && <div className="loading">Cargando...</div>}
        {hasError && <div className="loading">Opps, algo salió mal...</div>}
        {!isLoading && !hasError && !cases.length && (
          <div className="no-items">No hay resultados...</div>
        )}
        {!isLoading && !hasError && !!cases.length && (
          <>
            <div className="count">Total: {casesCount || 0}</div>
            <ul className="card-list">
              {cases.map((bike, i) => (
                <li key={`${bike.date_stolen}-${i}`}>
                  <div className="card-item">
                    <figure>
                      <img src={bike.thumb} className="img" />
                    </figure>
                    <div className="texts">
                      <div className="name">{bike.title}</div>
                      <div className="description">
                        {bike.description ? bike.description : "No description"}
                      </div>
                      <div className="description">
                        {bike.stolen_location
                          ? bike.stolen_location
                          : "No location"}
                      </div>
                      <div className="dates">
                        {new Date(bike.date_stolen).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Pagination
              currentPage={page}
              totalPages={totalPages()}
              onChangePage={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
