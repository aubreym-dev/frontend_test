"use client";

import { useState, useEffect, Fragment } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import Modal from "./modal";

//Types
import { User } from "./types/user";
import { Todo } from "./types/todo";
import { Cat } from "./types/cat";

//API
import { API, catAPI } from "./api/api";

const Gallery = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    try {
      const result = await API.get("users");
      if (result.status === 200) {
        setUsersList(result.data);
      }
    }
    catch (error) {
      alert(String(error))
    }
  };

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="user-gallery">
      <h1 className="heading">Users</h1>
      {usersList.length === 0 &&
        <h2 className="loading">Loading users...</h2>
      }
      <div className="items">
        {usersList.map((user, index) => (
          <div
            className="item user-card"
            key={index}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              <Avatar
                size={96}
                name={user.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
            </div>
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.name} ({selectedUser.username})
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="fields">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name">{selectedUser.company.name}</div>
                    <div className="catchphrase">
                      {selectedUser.company.catchPhrase}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
      <Todos />
      <Cats />
    </div>
  );
};

function Todos() {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    try {
      const result = await API.get("todos");
      if (result.status === 200) {
        setTodoList(result.data.slice(0, 9));
      }
    }
    catch (error) {
      alert(String(error))
    }
  }

  return (
    <Fragment>
      <h1 className="heading-todo">Todos</h1>
      {todoList.length === 0 &&
        <h2 className="loading">Loading todos...</h2>
      }
      <div className="items">
        {todoList.map((todo, index) => (
          <div
            className="item user-card"
            key={index}
          >
            <div className="info">
              <div className="name">{todo.title}</div>
              <div className="company">Completed: {String(todo.completed)}</div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

function Cats() {
  const [catList, setCatList] = useState<Cat[]>([]);

  useEffect(() => {
    getCats();
  }, [])

  const getCats = async () => {
    try {
      const result = await catAPI.get("images/search?limit=10");
      if (result.status === 200) {
        setCatList(result.data);
      }
    }
    catch (error) {
      alert(String(error))
    }
  }

  return (
    <Fragment>
      <h1 className="heading-cat">Cats</h1>
      {catList.length === 0 &&
        <h2 className="loading">Loading cats...</h2>
      }
      <div className="items">
        {catList.map((cat, index) => (
          <div
            className="item user-card"
            key={index}
          >
            <div className="body">
              <img
                className="img"
                src={cat.url}
                alt={cat.id}
                height={100}
                width={100}
              />
            </div>
            <div className="info">
              <h3>{`Cat ${index + 1}`}</h3>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default Gallery;
