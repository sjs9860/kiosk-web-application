import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useTheme } from '@mui/material/styles';

import {
  Form,
  useNavigation,
  useSubmit,
} from "react-router-dom";

export default function Search({ q }) {
  const navigation = useNavigation();
  const theme = useTheme();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  React.useEffect(() => {
    document.getElementById("search").value = q;
  }, [q])

  const handleQuery = (event) => {
    const isFirstSearch = q == null;
    submit(event.currentTarget.form, {
      replace: !isFirstSearch,
    });
  }

  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <Form id="search-form" role="search">
        <OutlinedInput
          size="small"
          id="search"
          placeholder="Search…"
          name="q"
          defaultValue={q}
          onChange={handleQuery}
          sx={{ flexGrow: 1, backgroundColor: theme.robotpi.light }}
          startAdornment={
            <InputAdornment position="start" sx={{ color: 'text.primary' }}>
              {!searching ? <SearchRoundedIcon fontSize="small" /> : <CircularProgress size={16} fontSize="small"/>}
            </InputAdornment>
          }
          inputProps={{
            'aria-label': 'search',
          }}
        />
        <div
          className="sr-only"
          aria-live="polite"
        ></div>
      </Form>
    </FormControl>
  );
}
