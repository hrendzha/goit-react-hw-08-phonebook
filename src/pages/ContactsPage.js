import { useState } from 'react';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import Container from 'components/Container';

export default function ContactsPage() {
    const [filter, setFilter] = useState('');

    const handleFilterChange = e => setFilter(e.target.value);

    return (
        <Container>
            <h1>Phonebook</h1>
            <ContactForm />

            <h2>Contacts</h2>
            <Filter filter={filter} onFilterChange={handleFilterChange} />
            <ContactList filter={filter} />
        </Container>
    );
}
