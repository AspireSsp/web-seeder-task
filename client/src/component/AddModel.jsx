import React, { useState } from 'react'
import axios from 'axios'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    Button,
  } from '@chakra-ui/react'

const AddModel = ({getAllNotes}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async()=>{
        try {
            const body = {
                title, description
            }
            const token = JSON.parse(localStorage.getItem('token'));
            const res = await axios.post(`http://localhost:8000/api/v1/note/add`, body,  {
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            if(res.status === 200){
                console.log("success");
                getAllNotes();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Button onClick={onOpen}>Add Note</Button> 
            <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Your Note</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input value={title} onChange={(e)=>{setTitle(e.target.value)}} ref={initialRef} placeholder='title' />
                </FormControl>
    
                <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Input value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder='description' />
                </FormControl>
                </ModalBody>
    
                <ModalFooter>
                <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
                    Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </>
    )
}

export default AddModel;
