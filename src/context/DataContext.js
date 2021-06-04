import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [forums, setForums] = useState([]);
  const [city, setCity] = useState([]);
  const [cities, setCities] = useState([]);
  const [listing, setListing] = useState([]);
  const [eating, setEating] = useState([]);
  const [doing, setDoing] = useState([]);
  const [seeing, setSeeing] = useState([]);
  const [shopping, setShopping] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/users/").then((users) => {
      setUsers(users.data);
    });
    axios.get("/cities/").then((cities) => {
      setCities(cities.data);
    });

    axios.get("/forumComment/").then((comments) => {
      setComments(comments.data);
    });

    axios.get("/listing/").then((lists) => {
      setListing(lists.data);
      var eat = [];
      var doing = [];
      var see = [];
      var shop = [];
      lists.data.forEach((list) => {
        if (list.category === "Eat") eat.push(list);
        if (list.category === "Do") doing.push(list);
        if (list.category === "See") see.push(list);
        if (list.category === "Shop") shop.push(list);
      });
      setEating(eat);
      setDoing(doing);
      setSeeing(see);
      setShopping(shop);
    });
    axios.get("/forums/").then((forums) => {
      setForums(forums.data);
    });
    axios.get("/city/").then((city) => {
      setCity(city.data);
    });
    setLoading(false);
  }, []);

  function deleteElement(arr, element) {
    var index = arr.indexOf(element);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }

  function updateElement(arr, element, updated) {
    var index = arr.indexOf(element);
    if (index > -1) {
      arr[index] = updated;
    }
  }

  function addElement(arr, element) {
    var index = arr.length + 1;
    arr[index] = element;
  }

  const value = {
    users,
    forums,
    listing,
    city,
    cities,
    eating,
    doing,
    seeing,
    shopping,
    comments,
    deleteElement,
    updateElement,
    addElement,
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
}
