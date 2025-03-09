'use client';

import { api } from '@/utils/api';
import { useEffect } from 'react';
import { logoutService } from './services/logout.service';
import { useSidebar } from './sidebar.model';
import SidebarView from './sidebar.view';

export default function Sidebar() {
	const methods = useSidebar({ logoutService });

	useEffect(() => {
		const fetchData = async () => {
			await api.post('/user/v1/test');
		};

		fetchData();
	}, []);

	return <SidebarView {...methods} />;
}
