import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import  { pageUpdate, pageSave, pageDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import PageForm from './PageForm';



class PageEdit extends Component {
    state = { showModal: false };

    componentWillMount() {
        _.each(this.props.page, (value, prop) => {
            this.props.pageUpdate({ prop, value })
        });
    }

    onButtonPress() {
        const { title, description, type } = this.props;
        this.props.pageSave({ title, description, type , uid: this.props.page.uid });
    }
/*
    onTextPress() {
        const { phone, shift } = this.props;
        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }*/

    fireEmployee() {
        this.setState({ showModal: !this.state.showModal });
    }

    onAccept() {
        this.setState({ showModal: false });
        this.props.pageDelete({ uid: this.props.page.uid });
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <Card>
                <PageForm />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.fireEmployee.bind(this)}>
                        Delete Page
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this page?
                </Confirm>
            </Card>
        )
    }
}


const mapStateToProps = ({ pageForm }) => {
    const { title, description, type } = pageForm;
    return { title, description, type };
};

export default connect(mapStateToProps, {
    pageUpdate, pageSave, pageDelete
})(PageEdit);