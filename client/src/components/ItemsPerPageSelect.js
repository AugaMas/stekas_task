import React from 'react';
import { Form } from 'react-bootstrap';
import { search } from '../helpers/search';
import { useHistory } from 'react-router-dom';

function ItemsPerPageSelect(props) {
    const history = useHistory();
    const itemsPerPage = +search.useQuery().get('size') || 10;
    const { addQuery } = search.useQueryBuilder();

    function handleChange(e) {
        history.push(history.location.pathname + '?' + addQuery('size', e.target.value));
    }

return (
    <Form>
        <Form.Group controlId="select">
            <Form.Label>{props.name}</Form.Label>
                <Form.Control as="select" size="md" value={itemsPerPage} onChange={(e) => {handleChange(e)}}>
                    {props.options.map((o, index) => <option key={index} value={o.value}>{o.label}</option>)}
                </Form.Control>
        </Form.Group>
    </Form>)
}

export default ItemsPerPageSelect;