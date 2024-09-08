"use client"
import React from 'react'
import Sidebar from '../components/admin/Sidebar'
import styled from 'styled-components';
import { useAuth } from '../contexts/authContext';
import Loading from '../components/loading';
import { useRouter } from 'next/navigation';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const {loading, user} = useAuth();
    const router = useRouter();

    if(loading) {
        return <Loading />
    }
    if(!loading && !user || user.role !== 'ADMIN') {
        return router.push('/');
    }

    return (
        <Container>
            <Left>
                <Sidebar />
            </Left>
            <Right>
                {children}
            </Right>
        </Container>
    )
}

export default AdminLayout

const Container = styled.div`
    display: flex;
    min-height: 85vh;
    background-color: #fff;
`;
const Left = styled.div`
    flex: 1;
    border-right: 1px solid #ddd;
`;
const Right = styled.div`
    flex: 3;
`;
