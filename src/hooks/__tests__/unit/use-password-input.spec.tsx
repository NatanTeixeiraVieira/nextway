import { act, renderHook } from '@testing-library/react';
import { usePasswordInput } from '../../use-password-input';

describe('usePasswordInput unit tests', () => {
	it('should return initial values', () => {
		const { result } = renderHook(() => usePasswordInput());

		expect(result.current.passwordInputType).toBe('password');
		expect(typeof result.current.handleIconEyeClick).toBe('function');
		expect(Object.keys(result.current).length).toBe(2);
	});

	it('should toggle icon eye value', () => {
		const { result } = renderHook(() => usePasswordInput());
		act(() => {
			result.current.handleIconEyeClick();
		});

		expect(result.current.passwordInputType).toBe('text');

		act(() => {
			result.current.handleIconEyeClick();
		});

		expect(result.current.passwordInputType).toBe('password');
	});
});
