import { Pie } from '@ant-design/charts';
import React from 'react';

const DemoPie: React.FC = () => {
	const data = [
		{
			type: 'ABC',
			value: 27,
		},
		{
			type: 'DEF',
			value: 25,
		},
		{
			type: 'GHI',
			value: 18,
		},
		{
			type: 'JKL',
			value: 15,
		},
		{
			type: 'MNO',
			value: 10,
		},
		{
			type: 'PQR',
			value: 5,
		},
	];
	const config = {
		appendPadding: 10,
		data,
		angleField: 'value',
		colorField: 'type',
		radius: 0.8,
		innerRadius: 0.64,
		height: 300,
		LegendCfg: {
			layout: 'horizontal',
			position: 'bottom',
		},
		label: {
			type: 'inner',
			offset: '-50%',
			content: ({ percent }: any) => `${percent * 100}%`,
			style: {
				fill: '#fff',
				fontSize: 14,
				textAlign: 'center',
			},
		},
	};
	return <Pie {...config} />;
};

export default DemoPie;
