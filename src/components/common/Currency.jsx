import React from "react";

const Currency = (props) => {
  return (
    <div className="outline-none w-28">
      <select
        className="px-3 py-3 placeholder-black text-black bg-white 
        relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        name="currency"
        id="currency"
        onChange={props.onChangeHandler}
      >
        {props.currencies.map((c) => (
          <option value={c.key} key={c.key}>
            {c.name}
          </option>
        ))}

        {/* <option value="CAD" defaultValue>
          CAD
        </option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="INR">INR</option>
        <option value="USD">USD</option> */}
      </select>
    </div>
  );
};

export default Currency;
