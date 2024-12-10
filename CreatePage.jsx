import React, { useState } from 'react';
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Link,
  useToast,
  CloseButton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const CreatePage = ({ setUser }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (isSignUp) {
      if (!formData.name || !formData.email || !formData.password) {
        toast({
          title: 'All fields are required!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: 'Passwords do not match!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: 'Sign-Up successful!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setUser(formData.name);
      navigate('/');
    } else {
      if (!formData.email || !formData.password) {
        toast({
          title: 'Email and Password are required!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: 'Login successful!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setUser(formData.email);
      navigate('/');
    }
  };

  return (
    <Box
      p={6}
      maxWidth="400px"
      mx="auto"
      mt="20"
      bg="white"
      borderRadius="md"
      shadow="md"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      position="relative"
    >
      <CloseButton
        position="absolute"
        top="10px"
        right="10px"
        onClick={() => navigate('/')}
      />
      <Box width="100%" maxWidth="400px">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
          {isSignUp ? 'Create an Account' : 'Login to Your Account'}
        </Text>

        <VStack spacing={4}>
          {isSignUp && (
            <Input
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          )}
          <Input
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
          />
          <Input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
          />
          {isSignUp && (
            <Input
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              type="password"
            />
          )}

          <Button colorScheme="blue" width="full" onClick={handleSubmit}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </Button>

          <HStack>
            <Text>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </Text>
            <Link color="blue.500" onClick={() => setIsSignUp((prev) => !prev)}>
              {isSignUp ? 'Login here' : 'Create one'}
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default CreatePage;