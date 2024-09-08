"use client"
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/authContext'
import styled from 'styled-components'
import { StyledButton, StyledInput } from '../globalStyles'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'


type UserData = {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
}

const Profile = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    oldPassword: '',
  })
  const [load, setLoad] = useState<boolean>(false)

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [loading, router, user])


  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(load) return
    setLoad(true)
    if(userData.name === user.name && userData.email === user.email) return;
    axios.post('/api/user', userData)
      .then((data) => {
        toast.success('Dəyişiklik uğurla yadda saxlanıldı'); 
      })
      .catch((error) => {
        console.log(error);
        toast.error('Xəta baş verdi'); 
      })
      .finally(() => {
        setLoad(false);
      })
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputField>
          <label htmlFor='emaiı'>İstifadəçi adı</label>
          <StyledInput placeholder='İstifadəçi adı' name="name" defaultValue={user?.name} onChange={handleChangeInput} />
        </InputField>
        <InputField>
          <label htmlFor='emaiı'>Email</label>
          <StyledInput placeholder='Email' name="email" defaultValue={user?.email} onChange={handleChangeInput} />
        </InputField>
        <StyledButton>{load ? <MoonLoader color="#55c2da" size={16}/> : 'Yadda saxla'}</StyledButton>
      </Form>
    </Container>
  )
}

export default Profile

const Container = styled.div`
  background-color: #fff;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

