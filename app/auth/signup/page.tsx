"use client"
import React, { useState } from 'react'
import { AuthForm, AuthTitle, Container, InputField, SignupButton, StyledLink } from '../styled'
import { StyledButton, StyledInput } from '@/app/globalStyles'
import Link from 'next/link'
import FormError from '@/app/components/auth/FormError'
import axios from 'axios';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/contexts/authContext'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'


type UserData = {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { getUser } = useAuth();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { name, value } = e.target as HTMLInputElement;
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(loading) return;
    setLoading(true);

    const { name, email, password } = userData;
    if (!name || !email || !password) {
      setError("Bütün sahələri doldurmalısınız");
      return setLoading(false)
    }

    axios.post('/api/signup', userData)
      .then((data) => {
        signIn('credentials', {
          email: userData.email,
          password: userData.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            getUser();
            router.push('/')
          }
          if (callback?.error) {
            toast.error('Bir xəta baş verdi')
          }
        })
        .catch(() => {
          toast.error('Bir xəta baş verdi')
        })
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <Container>
      <AuthForm onSubmit={handleSubmit}>
        <AuthTitle>Yeni hesab yarat</AuthTitle>
        <InputField>
          <label htmlFor='name'>İstifadəçi adı</label>
          <StyledInput type='text' name='name' placeholder='Ad' onChange={handleChangeInput} />
        </InputField>
        <InputField>
          <label htmlFor='emaiı'>Email</label>
          <StyledInput type='text' name='email' placeholder='Email' onChange={handleChangeInput} />
        </InputField>
        <InputField>
          <label htmlFor='password'>Şifrə</label>
          <StyledInput type='password' name='password' placeholder='Şifrə' onChange={handleChangeInput} />
        </InputField>
        {
          error &&
          <FormError message={error} />
        }
        <StyledButton>{loading ? <MoonLoader color="#55c2da" size={16}/> : 'Qeydiyyatdan keç'}</StyledButton>
        <SignupButton>Hesabın var? <StyledLink><Link href={'/auth/signin'}>Daxil ol</Link></StyledLink> </SignupButton>
      </AuthForm>
    </Container>
  )
}

export default Signup