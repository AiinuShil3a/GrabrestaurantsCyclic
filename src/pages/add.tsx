import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const URL = import.meta.env.VITE_BASE_URL;
const Username = import.meta.env.VITE_BASE_USERNAME;
const Password = import.meta.env.VITE_BASE_PASSWORD;

const config = {
  auth: {
    username: Username,
    password: Password,
  },
};

interface RestaurantType {
  name: string;
  type: string;
  Img: string;
}

const AddRestaurant: React.FC = () => {
  const [newRestaurant, setNewRestaurant] = useState<RestaurantType>({
    name: "",
    type: "",
    Img: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRestaurant((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${URL}/RestaurantShil3aiinu`, newRestaurant, config);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const clearRestaurantsAction = () => {
    setNewRestaurant({
      name: "",
      type: "",
      Img: "",
    });
    setError(false);
  }

  return (
    <div className="container mt-4">
      <h1>Add Restaurant</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={newRestaurant.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            onChange={handleInputChange}
            value={newRestaurant.type}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ImageURL">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="Img"
            name="Img"
            onChange={handleInputChange}
            value={newRestaurant.Img}
          />
        </div>
        <br />
        {error && (
          <div className="alert alert-danger">
            An error occurred. Please try again later.
          </div>
        )}
        <br />
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Restaurant
          </button>
        </div>
      </form>
      <div className="mt-3 text-center">
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={clearRestaurantsAction}
        >
          Clear Restaurant
        </button>
      </div>
    </div>
  );
};

export default AddRestaurant;
