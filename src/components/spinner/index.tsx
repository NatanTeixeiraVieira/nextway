import { cn } from '@/lib/utils';
import { LoaderCircle, type LucideProps } from 'lucide-react';

type SpinnerProps = LucideProps;

export default function Spinner({ className, ...rest }: SpinnerProps) {
	return <LoaderCircle className={cn('animate-spin', className)} {...rest} />;
}
