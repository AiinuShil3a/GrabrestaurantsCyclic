import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';
import '../assets/cardInline.css'
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_BASE_USERNAME;
const PASSWORD = import.meta.env.VITE_BASE_PASSWORD;
const config = {
    auth: {
        username: USERNAME,
        password: PASSWORD,
    },
};

interface restaurantsType {
    id: number;
    name: string;
    type: string;
    Img: string;
    // Add other properties of the restaurant here
}



const cardStyle = {
    width: '18rem',
    margin: '0 auto', // จัดการาร์ดอยู่กึงกลางตามแนวนอน
    marginTop: '1rem', // เพิ่มระยะห่างด้านบนของการ์ด
    marginBottom: '1rem', // เพิ่มระยะห่างด้านล่างของการ์ด
};

const cardImages = {
    height: '10rem',
};

// ...
const Card: React.FC<{ restaurant: restaurantsType }> = ({ restaurant }) => {

    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);


    const deleteClick = async () => {
        const confirmDelete = window.confirm("คุณต้องการลบร้านอาหารนี้หรือไม่?");
        if (confirmDelete) {
            setIsDeleting(true);

            try {
                await axios.delete(`${URL}/RestaurantShil3aiinu/${restaurant.id}`, config);
                setIsDeleted(true); // กำหนดว่ารายการถูกลบแล้ว
            } catch (error) {
                console.error(error);
            } finally {
                setIsDeleting(false);
            }
        }
    };


    return (
        <MDBCard className="mx-auto mt-3 mb-3" style={cardStyle}>
            {isDeleted ? null : ( // ถ้ารายการถูกลบแล้วให้ไม่แสดงการ์ด
                <>
                    <MDBCardImage src={restaurant.Img} style={cardImages} position='top' alt={restaurant.name} />
                    <MDBCardBody>
                        <MDBCardTitle>{restaurant.name}</MDBCardTitle>
                        <MDBCardText>
                            Type: {restaurant.type}
                        </MDBCardText>
                        <div className="d-flex justify-content-between">
                            <Link to={`/Edit/${restaurant.id}`}>
                                <MDBBtn color="warning" size="sm">
                                    Edit
                                </MDBBtn>
                            </Link>
                            <MDBBtn color="danger" size="sm" onClick={deleteClick} disabled={isDeleting || isDeleted}>
                                {isDeleting ? "กำลังลบ..." : "Delete"}
                            </MDBBtn>
                        </div>
                    </MDBCardBody>
                </>
            )}
        </MDBCard>
    )

}


export default Card;
