import React, { useState } from "react";
import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom";
import {
  useForm,
  useController,
} from "react-hook-form";
import { useTheme } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import RhfTextField from "../../components/data-form/TextField";
import { updateContact } from "../../mock/contacts";
import { Typography } from "@mui/material";


export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/contacts/${params.contactId}`);
}

function matchError(error, type) {
  return error && error.type === type;
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    control,
    formState,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ width: '50%', overflowY: 'scroll' }}>
      <Form
        method="post"
        id="contact-form"
        onSubmit={handleSubmit}
      >
        <Stack direction="row" gap={2}>
          <TextField
            variant="outlined"
            control={control}
            placeholder="First"
            label="First name"
            name="first"
            defaultValue={contact?.first}
            rules={{
              required: true,
            }}
            sx={{
              flexGrow: 1
            }}
          />
          {errors.first && <FormHelperText>First name is required.</FormHelperText>}
          <TextField
            variant="outlined"
            control={control}
            placeholder="Last"
            label="Last name"
            name="last"
            defaultValue={contact?.last}
            rules={{
              required: true,
            }}
            sx={{
              flexGrow: 1
            }}
          />
          {errors.last && <FormHelperText>Last name is required.</FormHelperText>}
        </Stack>
        <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
          <InputLabel id="demo-simple-select-helper-label">Room</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
        <Typography variant="h4">Gardian Information</Typography>
        <Stack direction="row" gap={2} sx={{mt:2}}>
          <TextField
            variant="outlined"
            control={control}
            placeholder="First"
            label="First name"
            name="gfirst"
            defaultValue={contact?.first}
            rules={{
              required: true,
            }}
            sx={{
              flexGrow: 1
            }}
          />
          {errors.first && <FormHelperText>First name is required.</FormHelperText>}
          <TextField
            variant="outlined"
            control={control}
            placeholder="Last"
            label="Last name"
            name="glast"
            defaultValue={contact?.last}
            rules={{
              required: true,
            }}
            sx={{
              flexGrow: 1
            }}
          />
          {errors.last && <FormHelperText>Last name is required.</FormHelperText>}
        </Stack>
        <Stack direction="row" gap={2} sx={{mt:2}}>
          <TextField
            variant="outlined"
            control={control}
            placeholder="Email"
            label="Email"
            name="gemail"
            defaultValue={contact?.first}
            rules={{
              required: true,
            }}
            sx={{
              flexGrow: 1
            }}
          />
          {errors.first && <FormHelperText>First name is required.</FormHelperText>}
          <TextField
            variant="outlined"
            control={control}
            placeholder="Phone Number"
            label="Phone Number"
            name="gpnumber"
            defaultValue={contact?.last}
            rules={{
              required: true,
            }}
            sx={{
              flexGrow: 1
            }}
          />
          {errors.last && <FormHelperText>Last name is required.</FormHelperText>}
        </Stack>
        <Stack direction="row" gap={2} sx={{mt:2}}>
          <TextField
            variant="outlined"
            control={control}
            placeholder="Address1"
            label="Address1"
            name="gaddr1"
            defaultValue={contact?.first}
            rules={{
              required: true,
            }}
            sx={{
              flexGrow: 1
            }}
          />
          {errors.first && <FormHelperText>First name is required.</FormHelperText>}
          <TextField
            variant="outlined"
            control={control}
            placeholder="Address2"
            label="Address2"
            name="gaddr2"
            defaultValue={contact?.last}
            rules={{
              required: true,
            }}
            sx={{
              flexGrow: 1
            }}
          />
          {errors.last && <FormHelperText>Last name is required.</FormHelperText>}
        </Stack>
        <Stack direction="row" gap={2} sx={{mt:2}}>
          <FormControl 
            sx={{
              flexGrow: 1
            }}
          >
            <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
          </FormControl>
          <TextField
            variant="outlined"
            control={control}
            placeholder="Zip Code"
            label="Zip Code"
            name="gzip"
            defaultValue={contact?.last}
            rules={{
              required: true,
            }}
            sx={{
              flexGrow: 1
            }}
          />
          {errors.last && <FormHelperText>Last name is required.</FormHelperText>}
        </Stack>
        <Stack direction="row" gap={2} sx={{ mt: 2, mb: 2}}>
          <Button
            type="submit"
            size="small"
            sx={{
              backgroundColor: theme.robotpi.lightFill,
              color: '#fff',
            }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            size="small"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Form>
    </Box>
  );
}