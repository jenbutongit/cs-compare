import React, { useContext } from "react";
import { ComponentTypes } from "@xgovformbuilder/model";
import { ComponentContext } from "./reducers/component/componentReducer";
import FieldEdit from "./field-edit";
import ListFieldEdit from "./components/fieldEditors/list-field-edit";
import { TextFieldEdit } from "./components/fieldEditors/text-field-edit";
import { MultilineTextFieldEdit } from "./multiline-text-field-edit";
import { FileUploadFieldEdit } from "./file-upload-field-edit";
import { NumberFieldEdit } from "./components/fieldEditors/number-field-edit";
import { DateFieldEdit } from "./components/fieldEditors/date-field-edit";
import { ParaEdit } from "./components/fieldEditors/para-edit";
import DetailsEdit from "./components/fieldEditors/details-edit";

const componentTypeEditors = {
  TextFieldEdit: TextFieldEdit,
  EmailAddressFieldEdit: TextFieldEdit,
  TelephoneNumberFieldEdit: TextFieldEdit,
  NumberFieldEdit: NumberFieldEdit,
  MultilineTextFieldEdit: MultilineTextFieldEdit,
  AutocompleteFieldEdit: ListFieldEdit,
  SelectFieldEdit: ListFieldEdit,
  RadiosFieldEdit: ListFieldEdit,
  CheckboxesFieldEdit: ListFieldEdit,
  ParaEdit: ParaEdit,
  HtmlEdit: ParaEdit,
  InsetTextEdit: ParaEdit,
  WarningTextEdit: ParaEdit,
  DetailsEdit: DetailsEdit,
  FlashCardEdit: ListFieldEdit,
  FileUploadFieldEdit,
  DatePartsFieldEdit: DateFieldEdit,
  ListEdit: ListFieldEdit,
};

function ComponentTypeEdit(props) {
  const { context = ComponentContext, page } = props;
  const { state } = useContext(context);
  const { selectedComponent } = state;
  const type = ComponentTypes.find(
    (t) => t.name === selectedComponent?.type ?? ""
  );

  const needsFieldInputs =
    type?.subType !== "content" || ["FlashCard", "List"].includes(type?.name);
  const TagName =
    componentTypeEditors[`${selectedComponent?.type}Edit`] || FieldEdit;
  return (
    <>
      {needsFieldInputs && <FieldEdit page={page} />}
      {type && <TagName page={page} />}
    </>
  );
}

export default ComponentTypeEdit;
