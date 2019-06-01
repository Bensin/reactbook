import React ,{Component} from 'react';
import { Card, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


const AddBookCta = () => (
    <Card>
        <Card.Content textAlign="center">
            <Card.Header>Add New Book</Card.Header>
            <Link to="/books/new">
                <Icon name="plus circle" size="massive"/>
            </Link>
            
        </Card.Content>
    </Card>
);

export default AddBookCta;