import { memo, useMemo } from 'react';
import { List, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem';
import { useFetchContactsQuery } from 'services/api';
import filterContacts from 'utils/filterContacts';
import ContactItemSkeleton from 'components/ContactItemSkeleton';

ContactList.propTypes = {
  filter: PropTypes.string.isRequired,
  filterInputRef: PropTypes.object,
};

function ContactList({ filter, filterInputRef: { current: filterInputRef } }) {
  const {
    data: contacts = [],
    isLoading: isFirstTimeLoading,
    isFetching,
  } = useFetchContactsQuery();

  const countSkeletons = useMemo(() => {
    if (!filterInputRef) return;

    const spaceBelowFilterInput =
      window.innerHeight - filterInputRef.getBoundingClientRect().bottom;

    const skeletonHeight = 56;

    const countSkeletons = Math.floor(spaceBelowFilterInput / skeletonHeight);

    return countSkeletons > 0 ? Array(countSkeletons).fill(null) : 0;
  }, [filterInputRef]);

  const visibleContacts = filterContacts(contacts, filter);

  const isListEmpty = contacts.length === 0 && !filter && !isFetching;
  const isListEmptyAfterFiltration = visibleContacts.length === 0 && filter;
  const canShowSkeletons = isFirstTimeLoading && countSkeletons;

  return (
    <>
      {canShowSkeletons && (
        <List sx={{ width: '100%' }}>
          {countSkeletons.map((_, index) => (
            <ContactItemSkeleton key={index} />
          ))}
        </List>
      )}

      {contacts.length > 0 && (
        <List sx={{ width: '100%' }}>
          {visibleContacts.map(({ id, name, number }) => (
            <ContactListItem key={id} name={name} number={number} id={id} />
          ))}
        </List>
      )}

      {isListEmpty && (
        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          Contact list empty
        </Typography>
      )}

      {isListEmptyAfterFiltration && (
        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          No results
        </Typography>
      )}
    </>
  );
}

export default memo(ContactList);
