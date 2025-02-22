import { AnimatePresence, motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import type { useSidebar } from './sidebar.model';

type SidebarViewProps = ReturnType<typeof useSidebar>;

export default function SidebarView(props: SidebarViewProps) {
	const { handleButtonLogoutClick } = props;
	return (
		<>
			<AnimatePresence>
				<motion.div
					initial={{ x: '-100%' }}
					animate={{ x: 0 }}
					exit={{ x: '-100%' }}
					transition={{ type: 'spring', stiffness: 300, damping: 30 }}
					className="fixed inset-y-0 left-0 z-10 w-64 bg-gradient-to-b from-sky-400 to-sky-600 text-white shadow-lg"
				>
					<div className="p-4 border-t border-sky-300">
						<button
							onClick={handleButtonLogoutClick}
							type="button"
							className="flex items-center w-full p-2 text-sky-100 rounded-lg hover:bg-sky-500 transition-colors"
						>
							<LogOut className="w-5 h-5 mr-3" />
							Logout
						</button>
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	);
}
