import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Outlet,
  NavLink as RouterNaviLink,
  useLoaderData,
  Form,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getContacts, createContact } from "../../mock/contacts";

import MainGrid from '../../components/MainGrid';
import Search from '../../components/Search';
import { Avatar, Typography } from '@mui/material';


export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/contacts/${contact.id}/edit`);;
}

export async function loader({ request }) {
  /**
   * Because this is a GET, not a POST, React Router does not call the action.
   * Submitting a GET form is the same as clicking a link: only the URL changes.
   * That's why the code we added for filtering is in the loader, not the action of this route.
   */
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);
  return { contacts, q };
}

function Contact(props) {
  const { id, avatarImageSrc, name, timestamp, message, description } = props
  const theme = useTheme();
  return (
    <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
      <CardContent>
        <Stack direction="row" gap={2} alignItems="center">
          <Box>
            <Avatar
              alt={name}
              src={
                avatarImageSrc ||
                `https://robohash.org/${id}.png?size=200x200`
              }
              variant='square'
            />
          </Box>
          <Stack gap={1} flexGrow={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexGrow={1}>
              <Box>
                <Typography>
                  {name}
                </Typography>
              </Box>
              <Box>
                <Typography noWrap>
                  {timestamp}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexGrow={1}>
              <Box>
                <Typography>
                  {message}
                </Typography>
              </Box>
              <Box>
                <Typography>
                  {description}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

function ContactList(props) {
  const { contacts } = props;
  const theme = useTheme();
  return (
    <Stack gap={2} sx={{height: 'inherit',overflowY: 'scroll'}}>
      {contacts.map(c => (
        <Link
          component={RouterNaviLink}
          to={`contacts/${c.id}`}
        >
          <Contact
            id={c.id}
            avatarImageSrc={c.avatar}
            name={c.first + ' ' + c.last}
            timestamp={format(new Date(c.createdAt), 'MM/dd hh:mm')}
            message={c.notes}
            description={c.twitter}
          />
        </Link>
      ))}
    </Stack>
  )
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <Stack direction="row" gap={4} sx={{ height: '100%', mb: '16px' }}>
      <Stack gap={2} sx={{height: 'inherit'}}>
        <Stack direction="row" gap={2}>
          <Search q={q} />
          <Form method="post">
            <Button
              fullWidth
              type="submit"
              size="small"
              sx={{
                backgroundColor: theme.robotpi.lightFill,
                color: '#fff',
              }}
            >
              New
            </Button>
          </Form>
        </Stack>
        <ContactList contacts={contacts} />
      </Stack>
      <Box id="detail" flexGrow={1} sx={{ width: "100%" }}>
        <Card id="contact" sx={{ height: '100%', width: '100%', overflow: 'scroll' }}>
          <Outlet />
        </Card>
      </Box>
    </Stack>
  );
}