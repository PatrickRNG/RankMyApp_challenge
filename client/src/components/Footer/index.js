import React from 'react';
import { Layout } from 'antd';

const { Footer : AntFooter } = Layout;

function Footer() {
	return (
		<AntFooter style={{ textAlign: 'center' }}>
      RankMyApp Challenge @2019 created by Patrick Passarella
		</AntFooter>
	);
}

export default Footer;
