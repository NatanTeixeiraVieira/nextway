import { useState } from 'react';

export const usePasswordInput = () => {
	const [passwordInputType, setPasswordInputType] = useState<
		'text' | 'password'
	>('password');

	const handleIconEyeClick = () => {
		setPasswordInputType((prev) => (prev === 'text' ? 'password' : 'text'));
	};

	return {
		passwordInputType,
		handleIconEyeClick,
	};
};
