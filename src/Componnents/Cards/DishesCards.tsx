import {
  AllResturantsCard,
  ArrowRouter,
  ArrowToResturants,
  ResturantsRouter,
  ResturantsTitle,
} from "../Home/HomeStyle";
import axios from "axios";
import {
  AllCardsInside,
  CardContainer,
  CardDescreption,
  CardImage,
  CardsLayout,
  CardStyled,
  DishPrice,
  DishType,
} from "./CardsStyle";
import Arrow from "../../assets/Arrow.svg";
import FoodType from "./FoodType";
import DishData from "../../Data/CardsData/DishData.json";
import React, { useEffect } from "react";

const DishCard = () => {
  const [dishes, setDishes] = React.useState<any>([]);
  useEffect(() => {
    getDishes();
  }, []);
  const getDishes = async () => {
    await axios.get("http://localhost:3001/api/dish/allDishes").then((res) => {
      const dish = res.data;

      setDishes(dish);
    });
  };

  return (
    <>
      <CardStyled>
        <ResturantsTitle>Signature Dish Of:</ResturantsTitle>
        <AllCardsInside>
          {dishes.map((dish: any) => {
            return (
              <CardContainer key={dish.ID}>
                <CardImage src={dish.DishImage} />
                <CardsLayout>
                  {dish.DishName}
                  <CardDescreption>{dish.DishDescreption}</CardDescreption>
                  <DishType src={FoodType(dish.FoodType)} alt="" />
                  <DishPrice>{dish.Price}</DishPrice>
                </CardsLayout>
              </CardContainer>
            );
          })}
        </AllCardsInside>
      </CardStyled>
      <AllResturantsCard>
        <ResturantsRouter to="/homePage_restaurants_All">
          All Resturants
        </ResturantsRouter>
        <ArrowRouter to="/homePage_restaurants_All">
          <ArrowToResturants src={Arrow} alt="" />
        </ArrowRouter>
      </AllResturantsCard>
    </>
  );
};
export default DishCard;
