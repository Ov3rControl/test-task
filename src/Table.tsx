import React, { CSSProperties, memo } from "react";
import { CarType } from "./types";

type Props = {
  cars: CarType[];
  height: number;
  currentItemIndex: number;
  itemHeight: number;
};

const flex1 = { flex: 1 };
const headerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
  marginBottom: 20,
  height: 20,
};

export const CarsTable = memo(({ cars, height, itemHeight }: Props) => (
  <div style={{ height: height + 280 }}>
    <div>
      <div style={headerStyle}>
        <div style={flex1}>Model</div>
        <div style={flex1}>Horse Power</div>
        <div style={flex1}>Price</div>
      </div>
    </div>
    <div>
      {cars.map((car) => (
        <RenderItem car={car} itemHeight={itemHeight} key={car.id} />
      ))}
    </div>
  </div>
));

interface CarItemProps {
  car: CarType;
  itemHeight: number;
}

const RenderItem = memo(
  ({ car, itemHeight }: CarItemProps) => (
    <div
      style={{
        transform: `translate3d(0, ${car.index * itemHeight}px, 0)`,
        display: "flex",
        textAlign: "center",
      }}
    >
      <div style={flex1}>{car.model}</div>
      <div style={flex1}>{car.horsepower}</div>
      <div style={flex1}>{car.price}</div>
    </div>
  ),
  (prevProps, nextProps) => {
    return prevProps.car.id === nextProps.car.id;
  }
);
