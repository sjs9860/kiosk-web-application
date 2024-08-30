import React, { useEffect } from 'react';
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
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import scanImage from './image.png';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { allCountries } from 'country-region-data';
import { continents, countries, languages } from 'countries-list'

console.log(languages)

export default function Root() {
  const contact = {};
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    control,
    formState,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSelectChange = (name, value) => {
    contact[name] = value;
  };
  return <>
    <Card id="contact" sx={{ height: '100%', width: '100%', overflow: 'scroll' }}>
      <Stack direction="row" gap={8} sx={{ height: '100%' }}>
        <Box sx={{ flex: 1 }}>
          <Form
            method="post"
            id="contact-form"
            onSubmit={handleSubmit}
          >
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                control={control}
                placeholder="Robot Name"
                label="Robot Name"
                name="rbtName"
                defaultValue={contact?.rbtName}
                rules={{
                  required: true,
                }}
              />
            </FormControl>
            {errors.rbtName && <FormHelperText>First name is required.</FormHelperText>}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <TextField
                variant="outlined"
                control={control}
                placeholder="Wifi SSID"
                label="Wifi SSID"
                name="wifissid"
                defaultValue={contact?.wifissid}
                rules={{
                  required: true,
                }}
              />
            </FormControl>
            {errors.wifissid && <FormHelperText>Last name is required.</FormHelperText>}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <TextField
                variant="outlined"
                control={control}
                placeholder="Wifi Password"
                label="Wifi password"
                name="wifipw"
                defaultValue={contact?.wifipw}
                type="password"
                rules={{
                  required: true,
                }}
              />
            </FormControl>
            {errors.wifissid && <FormHelperText>Last name is required.</FormHelperText>}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="language-helper-label">Language</InputLabel>
              <Select
                labelId="language-helper-label"
                id="language-helper"
                name="language"
                defaultValue={contact?.language}
                label="Language"
                onChange={(event) => handleSelectChange('language', event.target.value)}
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
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="language-helper-label">Country / Region</InputLabel>
              <Select
                labelId="cn-helper-label"
                id="cn-helper"
                name="cn"
                defaultValue={contact?.cn}
                label="Country / Region"
                onChange={(event) => handleSelectChange('cn', event.target.value)}
              >
                <MenuItem value=""></MenuItem>
                {allCountries.map((c, i) => (<MenuItem key={`cn-option-${i}`} value={c[0]}>{c[0]}</MenuItem>))}
              </Select>
              {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>

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
            </Stack>
          </Form>
        </Box>
        <Box sx={{ flex: 1, height: '100%' }}>
          <Stack gap={2} sx={{ height: '100%' }}>
            <Box>
              <Button
                size="large"
                startIcon={<PlayArrowIcon />}
                sx={{
                  backgroundColor: theme.robotpi.lightFill,
                  color: '#fff',
                }}
              >
                Re-build Map
              </Button>
            </Box>
            <Box>
              <img src={scanImage} height="100%" />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Card>
  </>
}