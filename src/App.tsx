import React, { useEffect, useState } from "react";

import "./App.css";
import CardList from "./components/card-list";
import Filters from "./components/filters";
import Pagination from "./components/pagination";
import { StolenCase } from "./entities/stolen-case";
import { fetchStolenBikesService } from "./services/bikes.service";

const CITY = "Berlin";

function App() {
  const [cases, setCases] = useState<StolenCase[]>([] as StolenCase[]);
  const [casesCount, setCasesCount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchStolenBikes = ({
    page,
    perPage,
    description,
  }: {
    page: number;
    perPage?: number;
    description?: string;
  }) => {
    setIsLoading(true);
    fetchStolenBikesService(page, CITY, perPage, description)
      .then(({ bikes, count }) => {
        setCases(bikes);
        setCasesCount(count);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchStolenBikes({ page, perPage, description });
  }, []);

  return (
    <div className="app">
      <header className="header">
        <figure>
          <img src="/logo.png" alt="logo" />
        </figure>
        <h1>Departamento de policía de {CITY}</h1>
      </header>
      <Filters
        onSubmit={(perPage, description) => {
          setPage(1);
          setPerPage(perPage);
          setDescription(description);
          fetchStolenBikes({ page, perPage, description });
        }}
      />
      <div className="content">
        {isLoading && (
          <div className="loading">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {hasError && <div className="loading">Opps, algo salió mal...</div>}
        {!isLoading && !hasError && !cases.length && (
          <div className="no-items">No hay resultados...</div>
        )}
        {!isLoading && !hasError && !!cases.length && (
          <>
            <div className="count">Total: {casesCount || 0}</div>
            <CardList cases={cases} />
            <Pagination
              currentPage={page}
              perPage={perPage}
              casesCount={casesCount}
              onChangePage={(p) => {
                setPage(p);
                fetchStolenBikes({ page, perPage, description });
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
