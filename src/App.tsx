import React, { useMemo, useEffect, useState } from "react";
import { useNoOfItemsToRender, useWindowPosition } from "./hook";
import { CarsTable } from "./Table";
import { CarType } from "./types";

function App() {
  const [cars, setCars] = useState<CarType[]>();
  const itemsNumber = useNoOfItemsToRender();
  const scrollPosition = useWindowPosition();
  const itemHeight = 40;
  const currentItemIndex = Math.round(scrollPosition / itemHeight);
  const data = useMemo(() => {
    const firstItemPosition = Math.max(currentItemIndex - 2, 0);
    const lastItemPosition = Math.min(
      itemsNumber + firstItemPosition,
      cars?.length ?? 0
    );

    return cars?.slice(firstItemPosition, lastItemPosition);
  }, [currentItemIndex, itemsNumber, cars]);

  const tableHeight = (cars?.length || 0) * itemHeight;

  useEffect(() => {
    fetch("https://private-anon-e2eacaecd1-carsapi1.apiary-mock.com/cars")
      .then((res) => res.json())
      .then((result) => {
        // @ts-ignore
        setCars(result.map((result, index) => ({ ...result, index })));
      });
  }, []);

  return (
    <div className="App">
      {data && (
        <CarsTable
          itemHeight={itemHeight}
          currentItemIndex={currentItemIndex}
          height={tableHeight}
          cars={data}
        />
      )}
    </div>
  );
}

export default App;
