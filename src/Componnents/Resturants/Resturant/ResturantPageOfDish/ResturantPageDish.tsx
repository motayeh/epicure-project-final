import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DishInterface from "../../Interfaces/InterfaceDish";
import DishData from "./../../../../Data/CardsData/DishData.json";
import Checkbox from "@mui/material/Checkbox";
import { getEnvironmentData } from "worker_threads";
import {
  DataofDishContainer,
  DishName,
  GetData,
  HeroOfDish,
  OptionContainer,
  Options,
} from "./DishPageStyled";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { KeyObject } from "crypto";
import { keyframes } from "styled-components";
import { SigntuerDish } from "../../../Home/HomeStyle";
import axios, { Axios } from "axios";
import DishOptions from "../../Interfaces/SideDishes";
///i didnt finish this part its working partically
const ResturantPageDish = () => {
  const { id2 } = useParams();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const list = DishData as DishInterface[];
  const restid = { ID: Number(id2) };
  const dat = useRef<any[]>([]);
  const [Dishes, setDishes] = useState<any[]>([]);

  useEffect(() => {
    getResturant();
  }, []);
  const getResturant = async () => {
    await axios
      .post("http://localhost:3001/api/restaurants/restaurantPage", restid)
      .then((res) => {
        const dish = res.data;

        console.log(dish);
        dat.current = dish;

        setDishes(res.data);
        console.log(dat);
      });
  };
  console.log(Dishes);
  const getEnvironmentData = () => {
    return Dishes.filter((data) => data.ID === Number(id2));
  };

  const getOption = () => {
    return list.find((option) => option.ID === Number(id2));
  };

  return (
    <>
      {Dishes.map((Data) => {
        return (
          <>
            <HeroOfDish src={Data.dishes[Number(id2)].DishImage} />
            <DataofDishContainer>
              <DishName>{Data.DishName}</DishName>
            </DataofDishContainer>

            {getOption()?.Sides.options.map((option) => {
              return (
                <>
                  {option.title}
                  {option.values.map((value) => {
                    return (
                      <>
                        <OptionContainer>
                          <Options
                            name={option.name}
                            type={option.type}
                            value={value}
                          />
                          {value}
                        </OptionContainer>
                      </>
                    );
                  })}
                </>
              );
            })}
            <GetData></GetData>
          </>
        );
      })}
    </>
  );

  // return (
  //   <FormControl>
  //     <FormLabel id="demo-radio-buttons-group-label">Side Dish</FormLabel>

  //     <RadioGroup
  //       aria-labelledby="demo-radio-buttons-group-label"
  //       name="radio-buttons-group"
  //     >
  //       <FormControlLabel
  //         value={sidesExpander(s.Sides)}
  //         control={<Radio />}
  //         label={sidesExpander(s.Sides)}
  //       />
  //     </RadioGroup>
  //   </FormControl>
  // );
};
export default ResturantPageDish;
