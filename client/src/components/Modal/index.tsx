import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';

type ModalProps = {
    message: string,
    status: string
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
    }

    public openModal() {
        this.setState({ showModal: true });
    }

    public closeModal() {
        this.setState({ showModal: false });
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
                    <Button variant="secondary" onClick={this.closeModal}>Ok</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}