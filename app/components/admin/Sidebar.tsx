import { usePathname, useRouter } from 'next/navigation';
import React, { AbstractView } from 'react'
import styled from 'styled-components';

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const panel = [
        {
            name: 'Ana Səhifə',
            url: '/admin',
        },
        {
            name: 'Məhsullar',
            url: '/admin/products',
        },
        {
            name: 'Populyar məhsullar',
            url: '/admin/populars',
        },
        {
            name: 'Sifarişlər',
            url: '/admin/orders',
        }
    ]


  return (
    <StyledSidebar>
        {
            panel.map((item, index) => (
                <SidebarItem key={index} onClick={() => router.push(item.url)} $selected={pathname == item.url}>
                    <ItemName>{item.name}</ItemName>
                </SidebarItem>
            ))
        }
    </StyledSidebar>
  )
}

export default Sidebar


const StyledSidebar = styled.div`
    padding: 5px;
`;

const SidebarItem = styled.div<{$selected: boolean}>`
    padding: 1rem;
    background-color: ${({$selected}) => $selected && '#f7f7f7'};
    cursor: pointer;
    border-radius: 5px;
`;

const ItemName = styled.h4`
    color: #3d3d3d;
`;