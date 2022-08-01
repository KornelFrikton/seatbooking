import React from "react";

function Input(props) {
  const handleForm = (e) => {
    e.preventDefault();
    props.setForm(true);
  };

  const handlePercent = (e) => {
    props.handlePercent(parseInt(e.target.value));
  };

  const handleBooking = (e) => {
    props.handleBooking(parseInt(e.target.value));
  };

  return (
    <form action="#" method="GET" onSubmit={handleForm} required>
      <div>
        <label>
          Please set the percent of the reserved seats (minimum 20%):
          <input
            type="number"
            min="20"
            max="100"
            value={props.percent}
            onChange={handlePercent}
          ></input>{" "}
          %
        </label>
      </div>
      <div>
        <label>
          Please set the number of the requested seats (minimum for 2,
          maximum for 8 persons): 
          <input
            type="number"
            min="2"
            max="8"
            value={props.booked}
            onChange={handleBooking}
          ></input>
        </label>
      </div>
      <div>
        <input type="submit" value="Find the best seats" />
      </div>
    </form>
  );
}

export default Input;
