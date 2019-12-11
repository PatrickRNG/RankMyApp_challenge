import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

const { Header : AntHeader } = Layout;

const H1 = styled.h1`
  color: #ccc;
`;

function Header() {
	return (
		<AntHeader>
			<H1>Ebay Alerter</H1>
		</AntHeader>
	);
}

export default Header;
