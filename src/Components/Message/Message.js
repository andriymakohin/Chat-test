import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./Message.scss";

const Message = ({ message, contacts, me }) => {
  const timestampToDate = (timestamp) => {
    return moment(timestamp).format("LLL");
  };
  message.sort((a, b) => a.date - b.date);

  return (
    <div className="messages-block">
      {message.map((messag) => (
        <div key={messag.date} className={messag.id ? "message" : "my-message"}>
          <img
            className={"message-image"}
            src={messag.id ? contacts.image : me}
            alt="contact_image"
          />
          <div className="message-info">
            <p>{messag.message}</p>
            <p className="message-info__date">{timestampToDate(messag.date)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;

Message.propTypes = {
  contacts: PropTypes.shape({
    image: PropTypes.string.isRequired,
  }).isRequired,
  message: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.number.isRequired,
      message: PropTypes.string,
    })
  ).isRequired,
};
