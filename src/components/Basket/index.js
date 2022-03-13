import React from "react";
import { useSelector } from "react-redux";

const Basket = () => {
  const selectBasket = (state) => state.basket;
  const { basket } = useSelector(selectBasket);
  const total = basket.reduce((a, b) => a * Number(b.rate), 1).toFixed(2);
  const basketContent = basket.map((item) => (
    <div
      className="flex flex-col xl:flex-row justify-between align-middle border-b-2"
      key={item.code}
    >
      <div>{item.mbs}</div>
      <div>{`Kod:${item.code}`}</div>
      <div>{`${item.match}`}</div>
      <div>{`Oran:${item.rate}`}</div>
      <div>{`MBS:${item.mbs}`}</div>
    </div>
  ));
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex items-center">
      <div
        className={`${
          open ? "!flex" : "hidden"
        } h-full w-full !fixed flex-col mb-12 bg-slate-300 md:mb-0 md:right-0 md:absolute md:bottom-8 md:w-2/5 md:h-2/5 p-4 overflow-y-auto`}
      >
        {basketContent}
        <div
          className={`w-full left-4 fixed p-2 bottom-0 mt-8 md:w-2/5 md:right-0 md:left-auto md:bottom-0 flex-col bg-slate-300`}
        >
          Toplam Oran :{total}
        </div>
      </div>
      <div className="top-1/2 right-4 absolute flex">
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className={`bg-gray-800  inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
        >
          Selected Matchs
          <b className="absolute bg-red-500 text-white -top-4 -right-4 p-1 rounded-full">
            {basket.length}
          </b>
        </button>
      </div>
    </div>
  );
};

export default Basket;
