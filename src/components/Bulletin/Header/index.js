import React from "react";
import PropTypes from "prop-types";
import { FlexItem } from "..";

const BulletinHeader = ({ dataLength }) => {
  return (
    <div
      className={`hidden p-2 bg-gray-300 md:flex md:flex-row md:justify-between items-center w-full`}
    >
      <FlexItem
        className={`text-red-500 text-xl font-bold`}
        size={5}
      >{`Event Count ${dataLength}`}</FlexItem>
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
  );
};

BulletinHeader.propTypes = {};

export default BulletinHeader;
