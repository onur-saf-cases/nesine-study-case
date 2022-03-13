import { addToBasket, removeFromBasket } from "@/redux/slices/basketSlice";
import events from "@/db/bulten_data.json";
import { store } from "@/redux/store";
import { BetTypes } from "../../../src/enums";

const data = Object.values(events.Events);
test("Add a match's bet to basket", () => {
  const match = data[0];
  const bets = Object.values(match.OCG);
  const ms = bets.find((bet) => bet.ID == BetTypes.MS);
  const ms_home = 0;
  const ms_1 = ms?.OC?.[ms_home].O ?? nullChar;
  const slice = {
    code: match.C,
    match: match.N,
    mbs: ms?.OC?.[ms_home]?.MBS,
    type: BetTypes.MS,
    action: ms_home,
    rate: ms_1,
  };
  store.dispatch(addToBasket(slice));
  const { basket } = store.getState().basket;
  expect(basket.length).toBe(1);
  expect(basket[0].code).toBe(match.C);
  expect(basket[0].match).toBe(match.N);
  expect(basket[0].mbs).toBe(ms?.OC?.[ms_home]?.MBS);
  expect(basket[0].type).toBe(BetTypes.MS);
  expect(basket[0].action).toBe(ms_home);
  expect(basket[0].rate).toBe(ms_1);
});
test("Check if a match's bet to basket already exist", () => {
  const { basket } = store.getState().basket;
  const match = data[0];
  const bets = Object.values(match.OCG);
  const ms = bets.find((bet) => bet.ID == BetTypes.MS);
  const ms_home = 0;
  const ms_1 = ms?.OC?.[ms_home].O ?? nullChar;
  const slice = {
    code: match.C,
    match: match.N,
    mbs: ms?.OC?.[ms_home]?.MBS,
    type: BetTypes.MS,
    action: ms_home,
    rate: ms_1,
  };
  const checkBasketItemIsExist = (item) => item.code == slice.code;
  const basketItem = basket.find(checkBasketItemIsExist);
  expect(basketItem).toEqual(slice);
});

test("Remove item from basket if added is already exist", () => {
  const { basket } = store.getState().basket;
  const match = data[0];
  const bets = Object.values(match.OCG);
  const ms = bets.find((bet) => bet.ID == BetTypes.MS);
  const ms_home = 0;
  const ms_1 = ms?.OC?.[ms_home].O ?? nullChar;
  const slice = {
    code: match.C,
    match: match.N,
    mbs: ms?.OC?.[ms_home]?.MBS,
    type: BetTypes.MS,
    action: ms_home,
    rate: ms_1,
  };
  const checkBasketItemIsExist = (item) => item.code == slice.code;
  const basketItem = basket.find(checkBasketItemIsExist);
  if (basketItem) {
    store.dispatch(removeFromBasket(basketItem.code));
    const { basket } = store.getState().basket;
    expect(basket).not.toContainEqual(slice);
  }
});

test("Add item if match is already exist but action is different", () => {
  const { basket } = store.getState().basket;
  const match = data[0];
  const bets = Object.values(match.OCG);
  const ms = bets.find((bet) => bet.ID == BetTypes.MS);
  const ms_home = 0;
  const ms_away = 2;

  const ms_1 = ms?.OC?.[ms_home].O ?? nullChar;
  const slice1 = {
    code: match.C,
    match: match.N,
    mbs: ms?.OC?.[ms_home]?.MBS,
    type: BetTypes.MS,
    action: ms_home,
    rate: ms_1,
  };
  store.dispatch(addToBasket(slice1));
  const slice2 = {
    code: match.C,
    match: match.N,
    mbs: ms?.OC?.[ms_away]?.MBS,
    type: BetTypes.MS,
    action: ms_away,
    rate: ms_1,
  };

  const checkBasketItemIsExist = (item) => item.code == slice2.code;
  const basketItem = basket.find(checkBasketItemIsExist);
  if (basketItem) {
    store.dispatch(removeFromBasket(basketItem.code));
    const { basket } = store.getState().basket;
    expect(basket).not.toContainEqual(basketItem);
  }

  if (slice1.action !== slice2.action) {
    store.dispatch(addToBasket(slice2));
    const { basket } = store.getState().basket;
    expect(basket).toContainEqual(slice2);
  }
});
