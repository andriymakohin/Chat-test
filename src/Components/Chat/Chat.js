import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactList from "../ContactList/ContactList";
import MessageVeiwe from "../MessageViwe/MessageViwe";
import Modal from "../Modal/Modal";
import ProfileImage from "../../image/santa.png";
import SearchImage from "../../assets/icons/search.svg";
import UserLogOut from "../../assets/icons/hiclipart.png";
import { contactsHistory, modalLogout } from "../../redux/slice";

import "./Chat.scss";

const Chat = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contact);
  const { user, modal } = useSelector((state) => state.session);
  const [newContacts, setNewContact] = useState(contacts.map((e) => e)[0]);
  const [query, setQuery] = useState("");
  const [displayOk, setDisplayOk] = useState("");
  const [displayOff, setDisplayOff] = useState("");

  const changeFilter = (e) => {
    const name = e.target.value;
    setQuery(name);
  };

  const filterName = (arr, filter) => {
    return arr.filter((el) =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const addMessage = (message) => {
    const data = Date.now();
    let history;
    history = [
      {
        ...message,
        date: data,
      },
      ...newContacts.history,
    ];
    setNewContact((c) => ({ ...c, history: history }));
  };

  useEffect(() => {
    dispatch(contactsHistory(newContacts));
  }, [newContacts, dispatch]);

  const openMessage = (contactId) => {
    let newContacts = contactId;
    setNewContact(newContacts);
  };

  const openModal = () => {
    dispatch(modalLogout(true));
  };
  const windowWidth = document.documentElement.clientWidth;

  const displayOn = (e) => {
    if (e) {
      setDisplayOk("on");
      setDisplayOff("off");
    } else {
      setDisplayOk("off");
      setDisplayOff("on");
    }
  };

  return (
    <div className="chat">
      {modal && <Modal />}
      <div className="left-block">
        <div className="left-block__top">
          <picture className="image-block">
            <img
              className="user-image"
              src={user.photo ? user.photo : ProfileImage}
              alt="profile_image"
            />
          </picture>
          {/* <button >LogOut</button> */}
          <img
            className="user-logout"
            onClick={() => dispatch(openModal)}
            src={UserLogOut}
            width="50px"
            height="50px"
            alt="user_logout"
          ></img>
          <p className="user-name">{user.name}</p>
          <div className={"search"}>
            <img
              className="search-image"
              src={SearchImage}
              alt="search_image"
            />
            <input
              className="filter"
              type="text"
              placeholder="Search or start new chat"
              value={query}
              onChange={changeFilter}
            />
          </div>
        </div>
        <div className="left-block__bottom">
          <ContactList
            windowWidth={windowWidth}
            displayOk={displayOk}
            displayOn={displayOn}
            openMessage={openMessage}
            contacts={filterName(contacts, query)}
          />
        </div>
      </div>
      <MessageVeiwe
        windowWidth={windowWidth}
        displayOk={displayOk}
        displayOff={displayOff}
        displayOn={displayOn}
        contacts={newContacts}
        me={user.photo ? user.photo : ProfileImage}
        addMessage={addMessage}
      />
    </div>
  );
};

export default Chat;
