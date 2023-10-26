import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../service/api";

const Update = () => {
  const [restaurant, setRestaurants] = useState({
    name: "",
    type: "",
    Img: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { restaurantId } = useParams();
  console.log(restaurantId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestaurants((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(`${URL}/Restaurants/${restaurantId}`);

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const res = await api.get(
          `/Restaurants/${restaurantId}`,
        );
        setRestaurants(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllRestaurants();
  }, [restaurantId]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await api.put(
        `/RestaurantShil3aiinu/${restaurantId}`,
        restaurant
      );
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Update Restaurant</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder={restaurant.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            placeholder={restaurant.type}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ImageURL">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="Img"
            name="Img"
            placeholder={restaurant.Img}
            onChange={handleInputChange}
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
            Update Restaurant
          </button>
        </div>
      </form>
      <div className="mt-3 text-center">
        {" "}
        {/* ใช้ margin-top สำหรับเว้นระยะห่างขึ้น */}
        <Link to="/" className="btn btn-secondary">
          Back to Restaurants
        </Link>
      </div>
    </div>
  );
};

export default Update;
