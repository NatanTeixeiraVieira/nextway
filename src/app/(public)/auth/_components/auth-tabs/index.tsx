'use client';

import { Card, CardContent } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import LoginForm from '../login-form';
import RegisterForm from '../register-form';

export default function AuthTabs() {
	const [activeTab, setActiveTab] = useState('login');

	return (
		<Card>
			<div className="flex border-gray-200 border-b">
				<TabButton
					active={activeTab === 'login'}
					onClick={() => setActiveTab('login')}
				>
					Login
				</TabButton>
				<TabButton
					active={activeTab === 'register'}
					onClick={() => setActiveTab('register')}
				>
					Cadastro
				</TabButton>
			</div>
			<CardContent className="min-h-[30rem] overflow-hidden">
				<AnimatePresence mode="wait">
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.2 }}
						className=" inset-0 flex p-6"
					>
						{activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
					</motion.div>
				</AnimatePresence>
			</CardContent>
		</Card>
	);
}

type TabButtonProps = {
	active: boolean;
	children: React.ReactNode;
	onClick: () => void;
};

function TabButton({ active, children, onClick }: TabButtonProps) {
	return (
		<button
			type="button"
			className={`relative flex-1 py-4 font-medium text-sm transition-colors ${active ? 'text-sky-600' : 'text-gray-500 hover:text-gray-700'}`}
			onClick={onClick}
		>
			{children}
			{active && (
				<motion.div
					className="absolute right-0 bottom-0 left-0 h-0.5 bg-sky-600"
					layoutId="activeTab"
				/>
			)}
		</button>
	);
}
