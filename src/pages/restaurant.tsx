import { useState, useEffect } from "react";
import Card from "../component/card";
import api from "../service/api"
import FirstLoading from '../isLoading/isFirstLoading';
import * as LoadingData from '../isLoading/Anime1.json'

interface resType {
  id: number;
  name: string;
  type: string;
  Img: string;
  // Add other properties of the restaurant here
}

const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<resType[]>([]);
  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับการโหลดข้อมูล

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        const res = await api.get<resType[]>(`/Restaurants`);
        console.log(`${URL}/Restaurants`);
        setLoading(false); // เมื่อข้อมูลโหลดเสร็จแล้วเปลี่ยนค่า state ให้เป็น false
        setRestaurants(res.data);
      } catch (error) {
        setLoading(false); // เมื่อข้อมูลโหลดเสร็จแล้วเปลี่ยนค่า state ให้เป็น false
        console.error(error);
      }
    };

    // Call the fetchAllRestaurants function to fetch data when the component mounts
    fetchAllRestaurants();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        {loading ? (
          <FirstLoading animation = {LoadingData}/>
        ) :(
          <>
            <h1 className="text-center mt-3">Restaurant List</h1>
            <div id="restaurants" className="row justify-content-center mt-2">
              {restaurants.map((restaurant) => (
                <div className="restaurant-card col-md-4 mb-4" key={restaurant.id}>
                  <Card restaurant={restaurant} />
                </div>
              ))}
            </div>
          </>
        )}
    </div>
  );
};

export default RestaurantList;
