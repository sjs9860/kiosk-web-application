import TextField from "@mui/material/TextField";
import { useController, useForm } from "react-hook-form";

export default function RhfTextField({ control, name, rules, defaultValue }) {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <TextField
      {...field}
      error={invalid}
    />
  );
}