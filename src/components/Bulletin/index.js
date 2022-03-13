import React from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import events from "../../../db/bulten_data.json";
import { BetTypes } from "../../enums";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket } from "../../redux/slices/basketSlice";
import BulletinHeader from "./Header";
export const useWindowResize = () => {
  const [size, setSize] = React.useState([0, 0]);
  React.useEffect(() => {
    if (window) {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }

      window.addEventListener("resize", updateSize);
      updateSize();
    }

    return () => {
      if (window) window.removeEventListener("resize", updateSize);
    };
  }, []);

  return size;
};

export const FlexItem = ({
  children,
  selected,
  onClick,
  size = 1,
  ...rest
}) => {
  const { className } = rest;
  return (
    <div
      onClick={onClick}
      className={`${className ? `${className} ` : ""}${
        selected ? "bg-yellow-200 " : ""
      }${typeof onClick === "function" ? "cursor-pointer " : ""}
      flex-grow ${
        size === 5 ? "basis-[20.83333333333333%]" : "basis-[4.166666666666667%]"
      }
      `}
    >
      {children}
    </div>
  );
};
const nullChar = "-";
const Row = ({ data, index, style, setSize, windowWidth }) => {
  const rowRef = React.useRef();
  const dispatch = useDispatch();
  const selectBasket = (state) => state.basket;
  const { basket } = useSelector(selectBasket);
  const row = data[index];

  const checkBasketItemIsExist = (item) => item.code == row.C;
  const basketItem = basket.find(checkBasketItemIsExist);

  const handleClick = (rowData) => {
    const checkBasketItemIsExist = (item) => item.code == rowData.code;
    const basketItem = basket.find(checkBasketItemIsExist);
    if (basketItem) {
      dispatch(removeFromBasket(rowData.code));
    }
    if (!basketItem || basketItem.action !== rowData.action) {
      dispatch(addToBasket(rowData));
    }
  };

  React.useEffect(() => {
    setSize(index, rowRef.current.getBoundingClientRect().height);
  }, [setSize, index, windowWidth]);
  const bets = Object.values(row.OCG);
  //Mac sonucu
  const ms = bets.find((bet) => bet.ID == BetTypes.MS);
  const ms_home = 0;
  const ms_away = 2;
  const ms_draw = 1;
  const ms_0 = ms?.OC?.[ms_draw].O ?? nullChar;
  const ms_1 = ms?.OC?.[ms_home].O ?? nullChar;
  const ms_2 = ms?.OC?.[ms_away]?.O ?? nullChar;
  const ms_mbs = ms?.OC?.[ms_home]?.MBS;
  //Çifte şans
  const cs = bets.find((bet) => bet.ID == BetTypes.CS);
  const cs_home_draw = 3;
  const cs_home_away = 4;
  const cs_away_draw = 5;
  const cs_10 = cs?.OC?.[cs_home_draw]?.O ?? nullChar;
  const cs_12 = cs?.OC?.[cs_home_away]?.O ?? nullChar;
  const cs_02 = cs?.OC?.[cs_away_draw]?.O ?? nullChar;
  //Alt üst
  const au = bets.find((bet) => bet.ID == BetTypes.AU);
  const au_under = 25;
  const au_over = 26;
  const au_a = au?.OC?.[au_under]?.O ?? nullChar;
  const au_u = au?.OC?.[au_over]?.O ?? nullChar;

  return (
    <div
      ref={rowRef}
      className={`px-1 flex flex-row md:flex-col justify-center ${
        index % 2 === 0 ? "bg-[#f8f8f0]" : ""
      }`}
      style={{ ...style }}
    >
      <div className={`flex flex-col md:flex-row w-full`}>
        <FlexItem size={5}>
          <b className="font-bold text-green-400">{index + 1}</b>
          <b className="font-bold text-red-500">{`${row.D} ${row.DAY} ${row.LN}`}</b>
        </FlexItem>
        <FlexItem>Yorumlar</FlexItem>
        <FlexItem></FlexItem>
        <FlexItem>1</FlexItem>
        <FlexItem>X</FlexItem>
        <FlexItem>2</FlexItem>
        <FlexItem>Alt</FlexItem>
        <FlexItem>Üst</FlexItem>
        <FlexItem>H1</FlexItem>
        <FlexItem>1</FlexItem>
        <FlexItem>X</FlexItem>
        <FlexItem>2</FlexItem>
        <FlexItem>H2</FlexItem>
        <FlexItem>1-X</FlexItem>
        <FlexItem>1-2</FlexItem>
        <FlexItem>X-2</FlexItem>
        <FlexItem>Var</FlexItem>
        <FlexItem>Yok</FlexItem>
        <FlexItem>+99</FlexItem>
      </div>
      <div className={`flex flex-col md:flex-row w-full`}>
        <FlexItem size={5}>{`${row.C} ${row.T} ${row.N} `}</FlexItem>
        <FlexItem>Yorumlar</FlexItem>
        <FlexItem>{ms_mbs}</FlexItem>
        <FlexItem
          selected={
            basketItem?.type == BetTypes.MS && basketItem?.action == ms_home
          }
          onClick={() =>
            handleClick({
              code: row.C,
              match: row.N,
              mbs: ms?.OC?.[ms_home]?.MBS,
              type: BetTypes.MS,
              action: ms_home,
              rate: ms_1,
            })
          }
        >
          {ms_1}
        </FlexItem>
        <FlexItem
          selected={
            basketItem?.type == BetTypes.MS && basketItem?.action == ms_draw
          }
          onClick={() =>
            handleClick({
              code: row.C,
              match: row.N,
              mbs: ms?.OC?.[ms_draw]?.MBS,
              type: BetTypes.MS,
              action: ms_draw,
              rate: ms_0,
            })
          }
        >
          {ms_0}
        </FlexItem>
        <FlexItem
          selected={
            basketItem?.type == BetTypes.MS && basketItem?.action == ms_away
          }
          onClick={
            ms_2 !== nullChar
              ? () =>
                  handleClick({
                    code: row.C,
                    match: row.N,
                    mbs: ms?.OC?.[ms_away]?.MBS,
                    type: BetTypes.MS,
                    action: ms_away,
                    rate: ms_2,
                  })
              : null
          }
        >
          {ms_2}
        </FlexItem>
        <FlexItem
          selected={
            basketItem?.type == BetTypes.AU && basketItem?.action == au_under
          }
          onClick={() =>
            handleClick({
              code: row.C,
              match: row.N,
              mbs: au?.OC?.[au_under]?.MBS,
              type: BetTypes.AU,
              action: au_under,
              rate: au_a,
            })
          }
        >
          {au_a}
        </FlexItem>
        <FlexItem
          selected={
            basketItem?.type == BetTypes.AU && basketItem?.action == au_over
          }
          onClick={() =>
            handleClick({
              code: row.C,
              match: row.N,
              mbs: au?.OC?.[au_over]?.MBS,
              type: BetTypes.AU,
              action: au_over,
              rate: au_u,
            })
          }
        >
          {au_u}
        </FlexItem>
        <FlexItem>-</FlexItem>
        <FlexItem>-</FlexItem>
        <FlexItem>-</FlexItem>
        <FlexItem>-</FlexItem>
        <FlexItem>-</FlexItem>
        <FlexItem
          selected={
            basketItem?.type == BetTypes.CS &&
            basketItem?.action == cs_home_draw
          }
          onClick={() =>
            handleClick({
              code: row.C,
              match: row.N,
              mbs: cs?.OC?.[cs_home_draw]?.MBS,
              type: BetTypes.CS,
              action: cs_home_draw,
              rate: cs_10,
            })
          }
        >
          {cs_10}
        </FlexItem>
        <FlexItem
          selected={
            basketItem?.type == BetTypes.CS &&
            basketItem?.action == cs_home_away
          }
          onClick={() =>
            handleClick({
              code: row.C,
              match: row.N,
              mbs: cs?.OC?.[cs_home_away]?.MBS,
              type: BetTypes.CS,
              action: cs_home_away,
              rate: cs_12,
            })
          }
        >
          {cs_12}
        </FlexItem>
        <FlexItem
          selected={
            basketItem?.type == BetTypes.CS &&
            basketItem?.action == cs_away_draw
          }
          onClick={() =>
            handleClick({
              code: row.C,
              match: row.N,
              mbs: cs?.OC?.[cs_away_draw]?.MBS,
              type: BetTypes.CS,
              action: cs_away_draw,
              rate: cs_02,
            })
          }
        >
          {cs_02}
        </FlexItem>
        <FlexItem>-</FlexItem>
        <FlexItem>-</FlexItem>
        <FlexItem>-</FlexItem>
      </div>
    </div>
  );
};

const Bulletin = () => {
  const data = Object.values(events.Events);
  const listRef = React.useRef();
  const sizeMap = React.useRef({});
  const setSize = React.useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    listRef.current.resetAfterIndex(index);
  }, []);
  const getSize = (index) => sizeMap.current[index] ?? 70;
  const [windowWidth] = useWindowResize();

  return (
    <>
      <BulletinHeader dataLength={data.length} />
      <AutoSizer>
        {({ height, width }) => (
          <List
            itemSize={getSize}
            ref={listRef}
            itemData={data}
            itemCount={data.length}
            height={height}
            width={width}
          >
            {({ data, index, style }) => (
              <div style={style}>
                <Row
                  data={data}
                  index={index}
                  setSize={setSize}
                  windowWidth={windowWidth}
                />
              </div>
            )}
          </List>
        )}
      </AutoSizer>
    </>
  );
};

export default Bulletin;
