// 0: Closed
// 1: Pending
// 2: Confirmed
// 3: Completed
// 4: Refunded
// 5: Failed
// 6: Expired

interface ORDER_STATUS_TYPE {
    id: number;
    name: string;
    color: string;
    icon: string;
    description: string;
}

export const ORDER_STATUS: ORDER_STATUS_TYPE[] = [
	{
		id: 0,
		name: 'Closed',
		color: '#f44336',
		icon: 'close',
		description: 'Order has been closed',
	},
	{
		id: 1,
		name: 'Pending',
		color: '#ff9800',
		icon: 'hourglass_empty',
		description: 'Order is pending',
	},
	{
		id: 2,
		name: 'Confirmed',
		color: '#863bff',
		icon: 'check_circle',
		description: 'Order has been confirmed',
	},
	{
		id: 3,
		name: 'Completed',
		color: '#4caf50',
		icon: 'check_circle',
		description: 'Order has been completed',
	},
	{
		id: 4,
		name: 'Refunded',
		color: '#2196f3',
		icon: 'check_circle',
		description: 'Order has been refunded',
	},
	{
		id: 5,
		name: 'Failed',
		color: '#f44336',
		icon: 'close',
		description: 'Order has failed',
	},
	{
		id: 6,
		name: 'Expired',
		color: '#f44336',
		icon: 'close',
		description: 'Order has expired',
	},
];
