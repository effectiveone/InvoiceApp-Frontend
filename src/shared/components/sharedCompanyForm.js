import React from "react";

function sharedCompanyForm({ addedInputs }) {
  return (
    <>
      {addedInputs &&
        addedInputs.map((input) => (
          <React.Fragment key={input.name}>
            <label htmlFor={input.name}>{input.label}:</label>
            <input
              type={input.type}
              name={input.name}
              id={input.name}
              value={formData[input.name]}
              onChange={handleInputChange}
            />
          </React.Fragment>
        ))}
    </>
  );
}

export default sharedCompanyForm;
