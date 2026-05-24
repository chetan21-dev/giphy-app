import React, { useEffect, useState } from "react";
import SecureAxios from "../../config/SecureAxios";
import { InputGroup, FormControl } from "react-bootstrap";
import PaginationBar from "../PaginationBar/PaginationBar";
import { API_KEY } from "../../constants/Giphy.data";
import '../Giphy/Giphy.css'

function Giphy() {
  const [data, setData] = useState([]);
  const [newGifs, setNewGifs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const [flag, setFlag] = useState(false);
  const [showError,setShowError] = useState(false);
  const runningItems = data.slice(firstItem, lastItem);
  const length_of_items = flag ? newGifs.length : data.length;
  const searchItems = newGifs.slice(firstItem, lastItem);

  useEffect(() => {
    const getData = async () => {
      try {
        const results = await SecureAxios.get("/trending", {
          params: {
            api_key: API_KEY,
            limit: 100,
          },
        });
        setData(results.data.data);
      } catch (err) {
      }
    };
    getData();
  }, []);

  useEffect(() => {
  const timer = setTimeout(() => {
    if (!search.trim()) {
      setNewGifs([]);
      setFlag(false);
      setShowError(false);
      return;
    }

    const searchData = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    setNewGifs(searchData);
    setFlag(true);
    setShowError(searchData.length === 0);
  }, 500); // debounce delay

  return () => clearTimeout(timer);
}, [search, data]);

const handleSearchChange = (event) => {
  setSearch(event.target.value)
}

  const pageSelected = (PageNo) => {
    setCurrentPage(PageNo);
  };
  return (
    <div className="giphy-container m-2">
      <InputGroup className="mb-3">
        <FormControl
          value={search}
          placeholder="Search giphy"
          aria-label="Search_gifs"
          aria-describedby="basic-addon2"
          onChange={handleSearchChange}
        />
      </InputGroup>
      {showError &&
      <div className="error-message">
        <p>No gifs found !</p>
      </div>}
      {flag
        ? searchItems.map((item, ind) => {
            return (
              <div key={ind}>
                <img src={item.images.fixed_height.url} alt={item.title} />
              </div>
            );
          })
        : runningItems.map((item, ind) => {
            return (
              <div key={ind}>
                <img src={item.images.fixed_height.url} alt={item.title} />
              </div>
            );
          })}
      {length_of_items > 10 && (
        <div className="pagination-bar-wrapper">
          <PaginationBar
            pageSelected={pageSelected}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={length_of_items}
          />
        </div>
      )}
    </div>
  );
}

export default Giphy;
