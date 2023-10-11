import { useState, useEffect } from 'react';
import axios from 'axios';
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
    <div>
      <h1>Restaurant List</h1>
        <div id="restaurants" className="row"> {/* เพิ่ม className "row" */}
          {restaurants.map((restaurant) => (
            <div className='restaurant-card' key={restaurant.id}> {/* เพิ่ม className "restaurant-card" */}
              <Card restaurant={restaurant} />
            </div>
          ))}
        </div>
    </div>
  );
};

export default RestaurantList;
