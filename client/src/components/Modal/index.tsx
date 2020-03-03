import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';

type ModalProps = {
    message: string,
    status: string,
    onWaitingQueue?: any
};

type ModalStates = {
    showModal: boolean
}

export class GenericModal extends Component<ModalProps, ModalStates> {
    constructor(props: ModalProps) {
        super(props);

        this.state = {
            showModal: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addWaitingList = this.addWaitingList.bind(this);
    }

    public openModal() {
        this.setState({ showModal: true });
    }

    public closeModal() {
        this.setState({ showModal: false });
    }

    public addWaitingList() {
        this.setState({ showModal: false });
        this.props.onWaitingQueue();
    }

    render() {
        const headerClass = this.props.status === 'success' ? 'alert-success': 'alert-danger';
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