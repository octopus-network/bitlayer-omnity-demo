import React from "react";

export function DepositButton({ deposit }) {
  return (
      <div className="form-group">
        <input 
          className="btn btn-primary" 
          type="submit" 
          value="Deposit" 
          onClick={(event) => {
            event.preventDefault();
            deposit();
          }}
        />
      </div>
  );
}
