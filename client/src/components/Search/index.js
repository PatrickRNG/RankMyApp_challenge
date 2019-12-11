import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Select, message } from 'antd';
import styled from 'styled-components';

import AlertContext from '../../contexts/AlertContext';

const { Option } = Select;

const StyledInput = styled(Input)`
  width: 400px;
  margin: 3px 0 20px 0;

  &:first-child {
    margin-right: 20px;
  }
`;

const StyledSelect = styled(Select)`
  width: 200px;
`;

const StyledButton = styled(Button)`
  margin-top: 50px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

function Search({ addAlert }) {
	const { alert, setAlert } = useContext(AlertContext);

	function handleChange(e) {
		const { name, value } = e.target;
		setAlert({
			...alert,
			[name]: value
		});
	}

	function handleTimeChange(value) {
		setAlert({ ...alert, time: +value });
	}

	async function onSave() {
		const newAlert = await addAlert(alert);
		if (newAlert.search) {
			message.success('Alert added');
			setAlert({
				search: '',
				email: '',
				time: 10
			});
		}
	}

	return (
		<div>
			<Block>
				<label>Search phrase</label>
				<StyledInput
					onChange={handleChange}
					value={alert.search}
					name="search"
					placeholder="Search phrase"
				/>
			</Block>
			<Block>
				<label>E-mail</label>
				<StyledInput
					onChange={handleChange}
					value={alert.email}
					name="email"
					placeholder="E-mail"
				/>
			</Block>
			<Block>
				<label>Time</label>
				<StyledSelect
					onChange={handleTimeChange}
					value={alert.time}
					name="time"
				>
					<Option value="2">2 minutes</Option>
					<Option value="10">10 minutes</Option>
					<Option value="30">30 minutes</Option>
				</StyledSelect>
			</Block>
			<div>
				<StyledButton onClick={onSave} type="primary">
          Save
				</StyledButton>
			</div>
		</div>
	);
}

Search.propTypes = {
	addAlert: PropTypes.func
};

export default Search;
