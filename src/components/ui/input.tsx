import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import type { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'> & {
	helperText?: string;
	isDirty?: boolean;
	isEyeOpen?: boolean;
	onIconEyeClick?: VoidFunction;
};

const Input = ({
	className,
	type,
	ref,
	helperText,
	isDirty = false,
	isEyeOpen = false,
	onIconEyeClick,
	...props
}: InputProps) => {
	return (
		<div>
			<div className="relative flex items-center">
				<input
					type={type}
					className={cn(
						'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
						className,
					)}
					ref={ref}
					{...props}
				/>
				{isDirty && (
					<div
						onClick={onIconEyeClick}
						onKeyUp={onIconEyeClick}
						className="absolute right-3 cursor-pointer"
					>
						{isEyeOpen && <Eye size={20} />}
						{!isEyeOpen && <EyeOff size={20} />}
					</div>
				)}
			</div>

			{helperText && <span className="text-error text-xs">{helperText}</span>}
		</div>
	);
};
Input.displayName = 'Input';

export { Input };
