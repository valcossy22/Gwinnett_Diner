import React, { useState, useContext } from "react";
import MenuCards from "./MenuCards";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Context } from "../context";
import { menuItems } from "../data";
import Image from "next/image";

const menuCards = (filteredItems) => {
  
  return filteredItems.map((item) => (
    <Col key={item.title} className="flex justify-center items-center ">
      <MenuCards
        variants={item.variants ? item.variants : false}
        title={item.title}
        price={item.price}
        desc={item.desc}
        img={item.img}
        local={item.location}
        type={item.type}
        sides={item.sides}
      />
    </Col>
  ));
};
const loadMenu = (location, type) => {
  const items = menuItems.filter((item) => {
    return (
      item.type === type &&
      (item.location === "all" || item.location === location)
    );
  });
  return menuCards(items);
};

export default function Menu() {
  const { location } = useContext(Context);

  return (
    <Container>
      <h1 className="text-center my-3">Menu</h1>
      {location && location !='Mountain Park' ? (
        <h5 className="text-center pb-1">
          (
          <Image
            src="/images/star.png"
            alt={`unique to ${location}`}
            width="25%"
            height="25%"
            className="inline translate-y-1 "
          />
          <div className="inline">=unique to {location} location)</div>
        </h5>
      ) : (
        ""
      )}
      <h2 className="text-center pt-16" id="combo">
        Combos
      </h2>
      <Row>{loadMenu(location, "combo")}</Row>
      <h2 className="text-center pt-16" id="side">
        Sides
      </h2>
      <Row>{loadMenu(location, "side")}</Row>
      <h2 className="text-center pt-16" id="dessert">
        Desserts
      </h2>
      <Row>{loadMenu(location, "dessert")}</Row>
    </Container>
  );
}
