import React from 'react'
import moment from 'moment'
import PropTypes from "prop-types";

import "./ContactList.scss"



const ContactList = ({ contacts, openMessage,displayOn,displayOk,windowWidth }) => {
    
    const timestampToDate = (timestamp) => {
        return moment(timestamp).format("MMM Do YY");
      }
    contacts.sort((a,b) => (b.history.map(e=>(e.date))[0] - a.history.map(e=>(e.date))[0]))

    return (
        <div className={windowWidth < 740 && displayOk}>
            <h2  className="title">Chats</h2>
            <ul className="list">
                {contacts.map(contact => (
                    <li className="contact" key={contact.id} onClick={() => (openMessage(contact),windowWidth < 740 && displayOn(contact.id))}>
                    <picture className="image-block">
                        <img
                            className="contact-image"
                            src={contact.image}
                            alt="contact_image"
                        />
                    </picture>
                    <div className="contact-box">
                        <div className="contact-description">
                            <span>{contact.name}</span>
                            <span className="contact-description__message">
                                { contact.history[contact.history.length-1] ? contact.history.map(e => (e.message))[0] : " " }
                            </span>
                        </div>
                        <p className="contact-description__date">
                            { contact.history[contact.history.length-1] ? contact.history.map(e => (timestampToDate(e.date)))[[0]] : " " }
                        </p>
                    </div>
                 </li>
                ))}
        </ul>
        </div >
    )
}

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        history: PropTypes.arrayOf(PropTypes.shape({
            message: PropTypes.string,
            date: PropTypes.number
        })).isRequired,
    })).isRequired,
    openMessage: PropTypes.func.isRequired,
  };