import React, { useEffect, useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, Button,
  } from '@chakra-ui/react';
import axios from 'axios'
import UpdateModel from './UpdateModel';
import AddModel from './AddModel';

const NotesTable = () => {

    const [notes, setNotes] = useState([]);
    
    const getAllNotes = async ()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        console.log('table token', token);
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/note/get`, {
                headers : {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            
            console.log(res);
            if(res.status === 200){
                setNotes(res?.data?.notes)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllNotes();
    }, [])
    



    const handleDelete = async(note)=>{
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const res = await axios.delete(`http://localhost:8000/api/v1/note/delete/${note?._id}`, { headers : {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            } });
            if(res.status === 200){
                console.log("success");
                getAllNotes();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div style={{display:'flex',  justifyContent:'end', margin: '20px'}}>
                <AddModel getAllNotes={getAllNotes}/>
            </div>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Description</Th>
                        <Th>Update</Th>
                        <Th>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        notes.map((note, index)=>(
                            <Tr key={index}>
                                <Td>{note.title}</Td>
                                <Td>{note.description}</Td>
                                <Td>
                                    <UpdateModel getAllNotes={getAllNotes} note={note} />
                                </Td>
                                <Td>
                                    <Button onClick={()=>{handleDelete(note)}}>Delete</Button>
                                </Td>
                            </Tr>
                        ))
                    }
                
                </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default NotesTable