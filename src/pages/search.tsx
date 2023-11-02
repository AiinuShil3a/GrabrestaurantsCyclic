import React, { useState } from "react";
import axios from "axios";
import Card from "../component/card";

const URL = import.meta.env.VITE_BASE_URL;
const Username = import.meta.env.VITE_BASE_USERNAME;
const Password = import.meta.env.VITE_BASE_PASSWORD;

const config = {
  auth: {
    username: Username,
    password: Password,
  },
};
interface Restaurant {
  id: number;
  name: string;
  type: string;
  Img: string;
}

const SearchMenu: React.FC = () => {
  const [keyword, setKeyword] = useState<string>(""); // State to store the keyword
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // State to store the fetched restaurants

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(`${URL}/Restaurants`, config);
        const filteredRestaurants = response.data.filter(
          (restaurant: Restaurant) =>
            restaurant.name.toLowerCase().includes(keyword.toLowerCase())
        );
        setRestaurants(filteredRestaurants); // Set filtered results
      } catch (error) {
        console.error("An error occurred", error);
      }
    }
  };

  return (
    <div>
      <h1>Restaurant Search</h1>
      <div>
        <input
          type="text"
          placeholder="Search for a restaurant"
          value={keyword}
          onChange={handleChange}
          onKeyPress={handleSearch}
        />

        <div id="restaurants" className="row">
          {restaurants.map((restaurant) => (
            <div className="restaurant-card" key={restaurant.id}>
              <Card restaurant={restaurant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;
