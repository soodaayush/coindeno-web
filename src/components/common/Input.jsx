import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className="pt-0">
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        step={props.step}
        ref={ref}
        name={props.name}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        className={props.className}
      />
    </div>
  );
});

export default Input;
