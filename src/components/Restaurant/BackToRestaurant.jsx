import {useNavigate} from "react-router-dom";

const BackToRestaurant = ({restaurantId}) => {
    const navigate = useNavigate();
    return (
        <div className="my-14">
            <div
                className={"flex gap-3 items-center text-white bg-black restaurantBack_width  cursor-pointer h-2/4 px-5 py-2 rounded-xl"}
                onClick={() => navigate(`/restaurant/${restaurantId}`)}>
                <ion-icon name="arrow-back-circle"></ion-icon>
                Back to restaurant
            </div>
        </div>
    );
};

export default BackToRestaurant;