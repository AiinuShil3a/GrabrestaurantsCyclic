import { useState, useEffect } from "react";
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

interface resType {
  id: number;
  name: string;
  type: string;
  Img: string;
  // Add other properties of the restaurant here
}

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<resType[]>([]);

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const res = await axios.get<resType[]>(`${URL}/Restaurants`, config);
        console.log(`${URL}/Restaurants`);

        setRestaurants(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchAllRestaurants function to fetch data when the component mounts
    fetchAllRestaurants();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="text-center mt-3">Restaurant List</h1>{" "}
      {/* ใช้ mt-3 เพื่อเพิ่ม margin-top 3 หน่วย */}
      <div id="restaurants" className="row justify-content-center mt-2">
        {restaurants.map((restaurant) => (
          <div className="restaurant-card col-md-4 mb-4" key={restaurant.id}>
            <Card restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
