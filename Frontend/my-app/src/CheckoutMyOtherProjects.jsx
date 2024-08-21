import React from "react";
import { motion } from "framer-motion";
import classes from "./rest.module.css";
import { FaTimes } from "react-icons/fa";
function CheckoutMyOtherProjects(props) {
  function handleClick() {
    window.location = "https://chess-1-y1t4.onrender.com";
  }
  return (
    <>
      <div
        style={{
          width: "80%",
          backgroundColor: "#2c2b29",
          borderRadius: "0.4rem",
          zIndex: 99932981,
          fontSize: "1.5rem",
          marginTop: "10px",
          position: "relative",
        }}
        className="d-flex text-center flex-column justify-content-center align-items-center border text-light py-5"
      >
        <div
          style={{ position: "absolute", top: 0, width: "100%" }}
          className="d-flex justify-content-end"
        >
          <motion.button
            onClick={() => props.setShowCheckOutMyOtherProjects(false)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            exit={{ scale: 1 }}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
            }}
            className="m-2"
          >
            <FaTimes />
          </motion.button>
        </div>
        <div className={`my-3 ${classes.courierPrimeRegular}`}>
          Check out my other projects!
        </div>
        <motion.button
          onClick={handleClick}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          exit={{ scale: 1 }}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <svg width="5rem" height="5rem" display="block" viewBox="1 1 43 43">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <g
                fill="none"
                fillRule="evenodd"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path
                  fill="#000"
                  d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"
                ></path>
                <path
                  fill="#000"
                  d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4.003 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.994-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.992 2.5-3c1 0 1 3 1 3"
                ></path>
                <path
                  fill="#FFF"
                  stroke="#FFF"
                  d="M9.5 25.5a.5.5 0 11-1 0 .5.5 0 111 0z"
                ></path>
                <path
                  fill="#FFF"
                  stroke="#FFF"
                  strokeWidth="1.5"
                  d="M14.933 15.75a.5 1.5 30 11-.866-.5.5 1.5 30 11.866.5z"
                ></path>
                <path
                  fill="#FFF"
                  stroke="none"
                  d="M24.55 10.4l-.45 1.45.5.15c3.15 1 5.65 2.49 7.9 6.75S35.75 29.06 35.25 39l-.05.5h2.25l.05-.5c.5-10.06-.88-16.85-3.25-21.34-2.37-4.49-5.79-6.64-9.19-7.16l-.51-.1z"
                ></path>
              </g>
            </svg>
          </svg>
        </motion.button>
      </div>
    </>
  );
}

export default CheckoutMyOtherProjects;
