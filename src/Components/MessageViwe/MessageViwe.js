import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Message from "../Message/Message";
import SendMessage from "../../assets/icons/send.svg";
import arrow from "../../assets/icons/arrow.png";
import "./MessageViwe.scss";

const MessageViwe = ({
  contacts,
  addMessage,
  me,
  displayOn,
  windowWidth,
  displayOk,
  displayOff,
}) => {
  const [history, setMessage] = useState({
    message: "",
  });
  const [randomeMessage, setRandomeMessage] = useState({
    id: uuidv4(),
    message: "",
  });

  const message = contacts.history.map((e) => e);

  let valueJoke;
  const joke = async () =>
    await axios({
      method: "get",
      url: "https://api.chucknorris.io/jokes/random?category=music",
    }).then((response) => response.data);

  joke().then((response) => (valueJoke = response.value));
  const handleChange = (e) => {
    const { value } = e.target;
    setMessage((e) => ({ ...e, message: value }));
  };

  const handleSubmit = (e) => {
    if (history.message.length > 0) {
      e.preventDefault();
      addMessage(history);
    }
    setMessage((el) => ({ ...el, message: "" }));
    setTimeout(() => {
      setRandomeMessage((el) => ({ ...el, message: valueJoke }));
    }, 6000);
    console.log(randomeMessage)
  };
  
  useEffect(() => {
    if (randomeMessage.message !== "") {
        addMessage(randomeMessage);
    }
  }, [randomeMessage]);

  

  return (
    <div className={windowWidth < 740 ? "messagesOff"  && displayOff : ""}>
      <div className={"messages"}>
        <div className="receiver">
          <picture className="image-block">
            <img
              className="receiver-image"
              src={contacts.image}
              alt="profile_image"
            />
          </picture>
          <span className="receiver-name">{contacts.name}</span>
          {windowWidth < 740 && (
            <img
              src={arrow}
              width="40px"
              height="40px"
              className="bak-btn"
              alt="bak_btn"
              onClick={() => displayOn(false)}
            />
          )}
        </div>
        <div className="history">
          <Message message={message} contacts={contacts} me={me} />
        </div>
        <div className="send">
          <form className="input-message" onSubmit={handleSubmit}>
            <img
              className="send-img"
              onClick={handleSubmit}
              src={SendMessage}
              alt="send_message_image"
            />
            <input
              type="text"
              value={history.message}
              onChange={handleChange}
              className="send-message"
              placeholder="Type your message"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageViwe;

MessageViwe.propTypes = {
  contacts: PropTypes.shape({
    history: PropTypes.array.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  me: PropTypes.string.isRequired,
};
