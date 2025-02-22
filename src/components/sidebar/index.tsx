'use client';

import { logoutService } from './services/logout.service';
import { useSidebar } from './sidebar.model';
import SidebarView from './sidebar.view';

export default function Sidebar() {
	const methods = useSidebar({ logoutService });

	return <SidebarView {...methods} />;
}
