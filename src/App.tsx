import React, { useEffect, useState } from "react";
import "./App.css";

interface StolenCase {
  title: string;
  thumb: string;
  date_stolen: number;
  description: string;
}

function App() {
  const [cases, setCases] = useState<StolenCase[]>([] as StolenCase[]);
  const [casesCount, setCasesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const fetchStolenBikes = () => {
    setIsLoading(true);
    Promise.all([
      fetch(
        `https://bikeindex.org:443/api/v3/search?page=${page}&per_page=${perPage}&location=Berlin&distance=1&stolenness=stolen`
      ),
      fetch(
        `https://bikeindex.org:443/api/v3/search/count?location=Berlin&distance=1&stolenness=stolen`
      ),
    ])
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
      .catch((error) => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const totalPages = () => {
    return Math.ceil(casesCount / perPage);
  };

  const pagesToShow = () => {
    return page === 1
      ? [page, 2, 3]
      : page === totalPages()
      ? [page + 2, page - 1, page]
      : [page - 1, page, page + 1];
  };

  useEffect(() => {
    fetchStolenBikes();
  }, [page]);

  return (
    <div className="app">
      <header className="header">
        <figure>
          <img src="/logo.png" alt="logo" />
        </figure>
        <h1>Police department of Berlin</h1>
      </header>
      <div className="filters">
        <input
          type="text"
          className="description form-control mx-2"
          placeholder="Search case description"
        />
        <input
          type="date"
          name="start"
          className="start-date form-control mx-2"
        />
        <input type="date" name="end" className="end-date form-control x-2" />
        <div className="dropdown">
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
        <button className="button btn btn-primary mx-2">Find cases</button>
      </div>
      <div className="content">
        {isLoading && <div className="loading">Cargando...</div>}
        {hasError && <div className="loading">Error...</div>}
        {!isLoading && !hasError && (
          <>
            <div className="count">Total: {casesCount}</div>
            <ul className="card-list">
              {cases.map((bike) => (
                <li key={bike.title}>
                  <div className="card-item">
                    <figure>
                      <img src={bike.thumb} className="img" />
                    </figure>
                    <div className="texts">
                      <div className="name">{bike.title}</div>
                      <div className="description">
                        {bike.description ? bike.description : "No description"}
                      </div>
                      <div className="dates">{bike.date_stolen}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pagination">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li
                    className={`page-item ${page === 1 ? "disabled" : ""}`}
                    onClick={() => setPage(1)}
                  >
                    <a className="page-link" href="#">
                      First
                    </a>
                  </li>
                  <li
                    className={`page-item ${page === 1 ? "disabled" : ""}`}
                    onClick={() => setPage(page - 1)}
                  >
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  {pagesToShow().map((p) => (
                    <li
                      key={`p-${p}`}
                      className={`page-item ${page === p ? "disabled" : ""}`}
                      onClick={() => setPage(p)}
                    >
                      <a className="page-link" href="#">
                        {p}
                      </a>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      page === totalPages() ? "disabled" : ""
                    }`}
                    onClick={() => setPage(page + 1)}
                  >
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                  <li
                    className={`page-item ${
                      page === totalPages() ? "disabled" : ""
                    }`}
                    onClick={() => setPage(totalPages())}
                  >
                    <a className="page-link" href="#">
                      last
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
