"use client"
import React, { useState } from 'react'
import { AuthForm, AuthTitle, Container, InputField, SignupButton, StyledLink } from '../styled'
import { StyledButton, StyledInput } from '@/app/globalStyles'
import Link from 'next/link'
import FormError from '@/app/components/auth/FormError'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../contexts/authContext'
import toast from 'react-hot-toast'
import { MoonLoader } from 'react-spinners'

type UserData = {
  email: string;
  password: string;
}

const Signin = () => {
  const [userData, setUserData] = useState<UserData>({
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
    if (loading) return;
    setLoading(true);
    const { email, password } = userData;
    if (!email || !password) {
      setError("Bütün sahələri doldurmalısınız");
      return setLoading(false);
    }

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
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <Container>
      <AuthForm onSubmit={handleSubmit}>
        <AuthTitle>Hesabınıza daxil olun</AuthTitle>
        <InputField>
          <label htmlFor='emaiı'>Email</label>
          <StyledInput type='text' placeholder='Email' name='email' onChange={handleChangeInput} />
        </InputField>
        <InputField>
          <label htmlFor='password'>Şifrə</label>
          <StyledInput type='password' placeholder='Şifrə' name='password' onChange={handleChangeInput} />
        </InputField>
        {
          error &&
          <FormError message={error} />
        }
        <StyledButton>{loading ? <MoonLoader color="#55c2da" size={16} /> : 'Daxil ol'}</StyledButton>
        <SignupButton>Hələ hesabın yoxdur? <StyledLink><Link href={'/auth/signup'}>Qeydiyyatdan keç</Link></StyledLink> </SignupButton>
      </AuthForm>
    </Container>
  )
}

export default Signin