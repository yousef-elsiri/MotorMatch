import Navbar from "../Navbar";
import "./Browse.css";
import { BsSliders2 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import Cars_card from "../Cars_card";
import "../FeaturedCars.css";
import carsData from "../../services/carsApi";
import latestCarsData from "../../services/latestCarsApi";
import MotorMatchFooter from "../MotorMatchFooter";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Browse({ theme, setTheme }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const brands = ["Porsche", "Tesla", "BMW", "Mercedes-Benz", "Audi", "Ford"];

  const years = ["2020", "2021", "2022", "2023"];

  const allCars = [...carsData, ...latestCarsData];

  const urlSearch = searchParams.get("search") || "";

  const [selectedBrands, setSelectedBrands] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedYears, setSelectedYears] = useState([]);

  const [searchInput, setSearchInput] = useState(urlSearch);
  const [appliedSearch, setAppliedSearch] = useState(urlSearch);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const carsPerPage = 6;

  const getPriceNumber = (price) => {
    if (typeof price === "number") {
      return price;
    }

    return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
  };

  const getBrandMatch = (car, selectedBrand) => {
    const title = car.title?.toLowerCase() || "";
    const brand = selectedBrand.toLowerCase();

    if (brand === "mercedes-benz") {
      return title.includes("mercedes") || title.includes("mercedes-benz");
    }

    return title.includes(brand);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((item) => item !== brand);
      }

      return [...prev, brand];
    });

    setCurrentPage(1);
  };

  const handleYearChange = (year) => {
    setSelectedYears((prev) => {
      if (prev.includes(year)) {
        return prev.filter((item) => item !== year);
      }

      return [...prev, year];
    });

    setCurrentPage(1);
  };

  const handleSearch = () => {
    setAppliedSearch(searchInput);
    setCurrentPage(1);

    if (searchInput.trim()) {
      setSearchParams({
        search: searchInput.trim(),
      });
    } else {
      setSearchParams({});
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      const search = appliedSearch.trim().toLowerCase();

      const matchesSearch =
        !search ||
        car.title?.toLowerCase().includes(search) ||
        car.location?.toLowerCase().includes(search);

      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.some((brand) => getBrandMatch(car, brand));

      const carPrice = getPriceNumber(car.price);

      const matchesMinPrice = minPrice === "" || carPrice >= Number(minPrice);

      const matchesMaxPrice = maxPrice === "" || carPrice <= Number(maxPrice);

      const matchesYear =
        selectedYears.length === 0 || selectedYears.includes(String(car.year));

      return (
        matchesSearch &&
        matchesBrand &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesYear
      );
    });
  }, [
    allCars,
    appliedSearch,
    selectedBrands,
    minPrice,
    maxPrice,
    selectedYears,
  ]);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const lastCar = currentPage * carsPerPage;
  const firstCar = lastCar - carsPerPage;

  const currentCars = filteredCars.slice(firstCar, lastCar);

  const handleReset = () => {
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setSelectedYears([]);
    setSearchInput("");
    setAppliedSearch("");

    setCurrentPage(1);

    setSearchParams({});
  };

  const handlePageChange = (page) => {
    setLoading(true);

    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 500);
  };

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />

      <div className="Browse_container">
        <h1 id="Browse_title">Marketplace</h1>

        <h1 id="Browse_title_2">Browse cars</h1>

        <p id="Browse_description">
          {filteredCars.length} results match your filters. Refine to discover
          your perfect match.
        </p>
      </div>

      <div className="parent_Browse_container">
        <div className="Filters_container">
          <h1 id="Filters_title">
            <span>
              <BsSliders2 />
            </span>{" "}
            Filters
            <span id="Filters_reset" onClick={handleReset}>
              Reset
            </span>
          </h1>

          <div className="Filters_container_car_list">
            <h1 id="Filters_car_list">Brand</h1>

            <div className="brands">
              {brands.map((brand) => (
                <label key={brand} className="brand-item">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />

                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div id="line"></div>

          {/* PRICE */}

          <div className="Price_range">
            <h1 id="Price_range_title">Price range</h1>

            <div className="Price_range_inputs">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div id="line"></div>

          <div className="Year_range">
            <h1 id="Year_range_title">Year range</h1>

            <div className="Year_range_buttons">
              {years.map((year) => (
                <button
                  key={year}
                  className={
                    selectedYears.includes(year)
                      ? "button_year active"
                      : "button_year"
                  }
                  onClick={() => handleYearChange(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          <div id="line"></div>
          <div className="Location_range">
            <h1 id="Location_range_title">Location range</h1>

            <div className="Location_range_inputs">
              <label htmlFor="City">City</label>

              <select id="City">
                <option>Any City</option>
              </select>

              <label htmlFor="State">State</label>

              <select id="State">
                <option>Any State</option>
              </select>
            </div>
          </div>

          <div id="line"></div>

          <div className="search_container_car_list">
            <button id="search_button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        <div className="search_container_car_list_2">
          <div className="container_search_browese">
            <div className="search-box">
              <CiSearch />

              <input
                type="text"
                placeholder="Search within results"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
            </div>

            <div className="price_search">
              <input
                type="number"
                placeholder="Price"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="search_search">
              <button id="search_button_2" onClick={handleSearch}>
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="browse_content">
            <h1 id="browse_content_title">Browse all cars:</h1>

            <div className="browse_grid">
              {loading ? (
                Array.from({
                  length: 6,
                }).map((_, index) => (
                  <div key={index} className="browse_skeleton"></div>
                ))
              ) : currentCars.length === 0 ? (
                <p className="no-results">
                  <span>🚗</span> No results found.
                </p>
              ) : (
                currentCars.map((car) => (
                  <Cars_card
                    key={car.id}
                    id={car.id}
                    title={car.title}
                    price={car.price}
                    year={car.year}
                    location={car.location}
                    image={car.image}
                  />
                ))
              )}
            </div>

            {filteredCars.length > 0 && (
              <p className="showing_text">
                Showing {firstCar + 1}-{Math.min(lastCar, filteredCars.length)}{" "}
                of {filteredCars.length}
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={currentPage === page ? "active" : "..."}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div id="line"></div>

      <MotorMatchFooter />
    </>
  );
}

export default Browse;
