
import { DateTimeWidget } from "./form/date";
import { EditorField } from "./form/editor";
import { SelectFieldWidget } from "./form/select";
import { FileUploadField } from "./form/upload";
import { AsyncSelectWidget } from "./form/asyncSelect";

export const fields = {
  SelectFieldWidget: SelectFieldWidget,
  FileUploadField: FileUploadField,
  EditorField: EditorField,
  DateTimeWidget: DateTimeWidget,
  AsyncSelectWidget: AsyncSelectWidget,
};
