'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

export default function SimpleCard() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async()=>{
        const body = {
            email, password
        }
        const token = localStorage.getItem('token')
        const res = await axios.post(`http://localhost:8000/api/v1/user/login`, body)
        console.log(res);
        if(res.status === 200){
            localStorage.setItem('token', JSON.stringify(res.data.token));
            navigate('/')
        }
    }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                onClick={handleSubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}