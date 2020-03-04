import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import { Redirect } from "react-router-dom";

type ModalProps = {
    message: string,
    status: string,
    onWaitingQueue?: any,
    redirect?: string
};

type ModalStates = {
    showModal: boolean,
    closed: boolean
}

export class GenericModal extends Component<ModalProps, ModalStates> {
    constructor(props: ModalProps) {
        super(props);

        this.state = {
            showModal: false,
            closed: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addWaitingList = this.addWaitingList.bind(this);
    }

    public openModal() {
        this.setState({ showModal: true });
    }

    public closeModal() {
        this.setStateWhenSuccess();
    }

    public addWaitingList() {
        this.setStateWhenSuccess();
        this.props.onWaitingQueue();
    }

    private setStateWhenSuccess() {
        const states = { showModal: false, closed: false };
        if (this.props.status === 'success') {
            states.closed = true;
        }
        
        this.setState(states);
    }

    render() {
        const headerClass = this.props.status === 'success' ? 'alert-success': 'alert-danger';

        if (this.props.redirect && this.state.closed && this.props.status === 'success') {
            return <Redirect to={this.props.redirect} />
        }

        return(
            <Modal show={this.state.showModal} onHide={this.closeModal}>
                <Modal.Header className={headerClass} closeButton>
                    <Modal.Title style={{textTransform: 'capitalize'}}>{this.props.status}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>{this.props.message}</Modal.Body>
                <Modal.Footer>
                    {this.props.onWaitingQueue && this.props.message !== 'The restaurant is closed in this hour' && this.props.status === 'error' && (
                        <Button variant="secondary" onClick={this.addWaitingList}>Add waiting list</Button>
                    )}
                    <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}