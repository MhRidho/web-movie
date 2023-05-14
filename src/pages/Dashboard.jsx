import React, { useEffect, useState } from "react";
import { getMovies, searchMovies } from "../helpers/api.js";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [inputSearch, setInputSearch] = useState("");

  const PopularMovie = () => {
    return movies.map((movie, i) => {
      return (
        <div
          key={i}
          className="w-56 h-[400px] bg-white rounded-lg shadow-xl flex justify-center flex-col border items-center hover:scale-105 transition-all pb-4"
        >
          <h2 className="mt-14 text-lg font-bold h-56 text-center">
            {movie.title}
          </h2>
          <img
            src={`${import.meta.env.VITE_BASEIMGURL}${movie.poster_path}`}
            alt="..."
            className="w-56 h-72"
          />
          <span className="mt-1 italic text-sm">
            release: {movie.release_date}
          </span>
          <p className="h-32 mb-10 text-red-700 underline">
            {movie.vote_average}
          </p>
        </div>
      );
    });
  };

  useEffect(() => {
    getMovies(page).then((result) => {
      setMovies(result);
    });
  }, [page]);

  const handleSearch = async (e) => {
    const q = e.target.value;
    setInputSearch(q);
    if (q.length > 3) {
      const query = await searchMovies(q);
      setMovies(query.results);
    }
  };

  const delTSearch = () => {
    setInputSearch("");
  };

  const addPage = () => {
    setPage(page + 1);
    getMovies({ page });
  };

  const removePage = () => {
    setPage(page - 1);
    getMovies({ page });
  };

  return (
    <section className="py-16 px-24 bg-slate-800">
      <div className="container mx-auto">
        <div className="flex flex-wrap flex-col justify-center items-center">
          <h1 className="text-white text-center text-2xl font-bold mb-7">
            Website Movie
          </h1>
          <div className="p-1 bg-white flex items-center">
            <input
              type="text"
              placeholder="search movie"
              className="p-3 focus:outline-none"
              onChange={handleSearch}
              value={inputSearch}
            />
            <span
              className="cursor-pointer mr-2 text-lg text-slate-500"
              onClick={delTSearch}
            >
              x
            </span>
          </div>
          <div className="flex flex-wrap gap-10 justify-center mt-16 mb-24">
            <PopularMovie />
          </div>
          <div className="flex flex-wrap gap-5 items-center mb-10">
            <button
              disabled={page === 0}
              onClick={removePage}
              className="py-2 px-6 rounded-lg bg-green-400 text-slate-800 font-bold hover:opacity-80"
            >
              prev
            </button>
            <span className="font-bold text-white w-16 h-16 rounded-full items-center flex justify-center border-yellow-500 border-2">
              {page}
            </span>
            <button
              onClick={addPage}
              className="py-2 px-6 rounded-lg bg-green-400 text-slate-800 font-bold hover:opacity-80"
            >
              next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
