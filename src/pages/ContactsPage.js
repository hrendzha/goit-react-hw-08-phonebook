import { useRef, useState } from 'react';
import { Container } from '@mui/material';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Section from 'components/Section';
import TitleWithIcon from 'components/TitleWithIcon';
import Wrapper from 'components/Wrapper';

export default function ContactsPage() {
  const [filter, setFilter] = useState('');
  const filterInputRef = useRef();

  const handleFilterChange = e => setFilter(e.target.value);

  return (
    <Section>
      <Container maxWidth="xs">
        <ContactForm />

        <Wrapper sx={{ mb: 0 }}>
          <TitleWithIcon title="Contacts" icon={ImportContactsOutlinedIcon} />
          <Filter
            filter={filter}
            onFilterChange={handleFilterChange}
            filterInputRef={filterInputRef}
          />
          <ContactList filter={filter} filterInputRef={filterInputRef} />
        </Wrapper>
      </Container>
    </Section>
  );
}
