import React, { useContext } from "react";
import { ComponentContext } from "../reducers/component/componentReducer";
import { DataContext } from "./../context";
import { Actions } from "./../reducers/component/types";

export function ListContentEdit({ context }) {
  const [{ selectedComponent }, dispatch] = useContext(
    !!context ? context : ComponentContext
  );
  const { data } = useContext(DataContext);
  const { options } = selectedComponent;

  return (
    <div>
      <div className="govuk-checkboxes govuk-form-group">
        <div className="govuk-checkboxes__item">
          <input
            className="govuk-checkboxes__input"
            id="field-options-type"
            name="options.type"
            value="numbered"
            type="checkbox"
            checked={options.type === "numbered"}
            onChange={() =>
              dispatch({
                type: Actions.EDIT_OPTIONS_TYPE,
                payload: options.type === "numbered" ? undefined : "numbered",
              })
            }
          />
          <label
            className="govuk-label govuk-checkboxes__label"
            htmlFor="field-options-type"
          >
            Numbered
          </label>
        </div>
      </div>
    </div>
  );
}
