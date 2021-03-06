export const companyId = window.GLOBAL_VARIABLES ? window.GLOBAL_VARIABLES.companyId : -1;
export const appPlatformName = window.GLOBAL_VARIABLES ? window.GLOBAL_VARIABLES.appPlatformName : 'PFAC demo';
export const platform_prefix = window.GLOBAL_VARIABLES ? window.GLOBAL_VARIABLES.platform_prefix : '';

export const states = [
	{ abbr: 'AL', name: 'Alabama' },
	{ abbr: 'AK', name: 'Alaska' },
	{ abbr: 'AZ', name: 'Arizona' },
	{ abbr: 'AR', name: 'Arkansas' },
	{ abbr: 'CA', name: 'California' },
	{ abbr: 'CO', name: 'Colorado' },
	{ abbr: 'CT', name: 'Connecticut' },
	{ abbr: 'DE', name: 'Delaware' },
	{ abbr: 'DC', name: 'District Of Columbia' },
	{ abbr: 'FL', name: 'Florida' },
	{ abbr: 'GA', name: 'Georgia' },
	{ abbr: 'HI', name: 'Hawaii' },
	{ abbr: 'ID', name: 'Idaho' },
	{ abbr: 'IL', name: 'Illinois' },
	{ abbr: 'IN', name: 'Indiana' },
	{ abbr: 'IA', name: 'Iowa' },
	{ abbr: 'KS', name: 'Kansas' },
	{ abbr: 'KY', name: 'Kentucky' },
	{ abbr: 'LA', name: 'Louisiana' },
	{ abbr: 'ME', name: 'Maine' },
	{ abbr: 'MD', name: 'Maryland' },
	{ abbr: 'MA', name: 'Massachusetts' },
	{ abbr: 'MI', name: 'Michigan' },
	{ abbr: 'MN', name: 'Minnesota' },
	{ abbr: 'MS', name: 'Mississippi' },
	{ abbr: 'MO', name: 'Missouri' },
	{ abbr: 'MT', name: 'Montana' },
	{ abbr: 'NE', name: 'Nebraska' },
	{ abbr: 'NV', name: 'Nevada' },
	{ abbr: 'NH', name: 'New Hampshire' },
	{ abbr: 'NJ', name: 'New Jersey' },
	{ abbr: 'NM', name: 'New Mexico' },
	{ abbr: 'NY', name: 'New York' },
	{ abbr: 'NC', name: 'North Carolina' },
	{ abbr: 'ND', name: 'North Dakota' },
	{ abbr: 'OH', name: 'Ohio' },
	{ abbr: 'OK', name: 'Oklahoma' },
	{ abbr: 'OR', name: 'Oregon' },
	{ abbr: 'PA', name: 'Pennsylvania' },
	{ abbr: 'RI', name: 'Rhode Island' },
	{ abbr: 'SC', name: 'South Carolina' },
	{ abbr: 'SD', name: 'South Dakota' },
	{ abbr: 'TN', name: 'Tennessee' },
	{ abbr: 'TX', name: 'Texas' },
	{ abbr: 'UT', name: 'Utah' },
	{ abbr: 'VT', name: 'Vermont' },
	{ abbr: 'VA', name: 'Virginia' },
	{ abbr: 'WA', name: 'Washington' },
	{ abbr: 'WV', name: 'West Virginia' },
	{ abbr: 'WI', name: 'Wisconsin' },
	{ abbr: 'WY', name: 'Wyoming' },
	{ abbr: 'PR', name: 'Puerto Rico' },
];

export const invalid_ssn = [
	'000000000',
	'000000001',
	'010101010',
	'012345678',
	'101010101',
	'111111111',
	'111111234',
	'111223333',
	'121212121',
	'123121234',
	'123123123',
	'123456789',
	'131313131',
	'141414141',
	'151515151',
	'161616161',
	'171717171',
	'181818181',
	'191919191',
	'212121212',
	'222111111',
	'222211111',
	'222221111',
	'222222111',
	'222222211',
	'222222221',
	'222222222',
	'232323232',
	'234234234',
	'313131313',
	'323232323',
	'333111111',
	'333311111',
	'333331111',
	'333333111',
	'333333331',
	'333333333',
	'343434343',
	'345345345',
	'414141414',
	'434343434',
	'444111111',
	'444411111',
	'444441111',
	'444444111',
	'444444411',
	'444444441',
	'444444444',
	'454545454',
	'456456456',
	'515151515',
	'545454545',
	'555111111',
	'555511111',
	'555551111',
	'555555111',
	'555555511',
	'555555551',
	'555555555',
	'565656565',
	'567567567',
	'616161616',
	'656565656',
	'666111111',
	'666611111',
	'666661111',
	'666666111',
	'666666611',
	'666666661',
	'666666666',
	'676767676',
	'678678678',
	'717171717',
	'767676767',
	'777111111',
	'777711111',
	'777771111',
	'777777111',
	'777777711',
	'777777771',
	'777777777',
	'787878787',
	'789789789',
	'818181818',
	'876543210',
	'878787878',
	'888111111',
	'888811111',
	'888881111',
	'888888111',
	'888888811',
	'888888881',
	'888888888',
	'898989898',
	'919191919',
	'987654321',
	'987987987',
	'999111111',
	'999911111',
	'999991111',
	'999999111',
	'999999911',
	'999999991',
	'999999999',
];

export const years = (function() {
	let currentYear = new Date().getFullYear(),
		years_arr = [];
	let startYear = 1900;
	while (startYear <= currentYear) {
		years_arr.push({ abbr: currentYear, name: currentYear });
		currentYear--;
	}
	return years_arr;
})();

export const days = (function() {
	let startDay = 1,
		days_arr = [];
	let endDay = 31;
	while (startDay <= endDay) {
		// Pfac sign up expects dob in yyyy-mm-dd format, hence days are made 2 digits.
		startDay < 10
			? days_arr.push({ abbr: '0'+startDay, name: '0'+startDay })
			: days_arr.push({ abbr: startDay, name: startDay });
		startDay++;
	}
	return days_arr;
})();

export const months = [
	{ abbr: '01', name: 'January' },
	{ abbr: '02', name: 'February' },
	{ abbr: '03', name: 'March' },
	{ abbr: '04', name: 'April' },
	{ abbr: '05', name: 'May' },
	{ abbr: '06', name: 'June' },
	{ abbr: '07', name: 'July' },
	{ abbr: '08', name: 'August' },
	{ abbr: '09', name: 'September' },
	{ abbr: '10', name: 'October' },
	{ abbr: '11', name: 'November' },
	{ abbr: '12', name: 'December' },
];


export const organizations = [
	// Supported organisation types for Pfac Signup
	{ abbr: 'GOVERNMENT', name: 'Government' },
	{ abbr: 'JOINT STOCK', name: 'Joint Stock' },
	{ abbr: 'LIMITED', name: 'Limited Corporation' },
	{ abbr: 'CORPORATION', name: 'Private Corporation' },
	{ abbr: 'SOLE PROPRIETOR', name: 'Sole Ownership' },
	{ abbr: 'NON PROFIT ORG', name: 'Non profit Organisation' },
	{ abbr: 'PARTNERSHIP', name: 'Partnership' },
	{ abbr: 'PUBLIC COMPANY', name: 'Public Corporation' },
];

export const percentage = [
	{ abbr: '0', name: '0%' },
	{ abbr: '10', name: '10%' },
	{ abbr: '20', name: '20%' },
	{ abbr: '30', name: '30%' },
	{ abbr: '40', name: '40%' },
	{ abbr: '50', name: '50%' },
	{ abbr: '60', name: '60%' },
	{ abbr: '70', name: '70%' },
	{ abbr: '80', name: '80%' },
	{ abbr: '90', name: '90%' },
	{ abbr: '100', name: '100%' },
];

export const sales = [
	{ abbr: '100000', name: 'Under $100,000' },
	{ abbr: '200000', name: '$100,001 - $200,000' },
	{ abbr: '300000', name: '$200,001 - $300,000' },
	{ abbr: '400000', name: '$300,001 - $400,000' },
	{ abbr: '500000', name: '$400,001 - $500,000' },
	{ abbr: '600000', name: '$500,001 - $600,000' },
	{ abbr: '700000', name: '$600,001 - $700,000' },
	{ abbr: '800000', name: '$700,001 - $800,000' },
	{ abbr: '900000', name: '$800,001 - $900,000' },
	{ abbr: '1000000', name: '$900,001 - $1M' },
	{ abbr: '1100000', name: 'Over $1M' },
];

export const titles = [
	{ abbr: 'owner', name: 'Owner' },
	{ abbr: 'president', name: 'President' },
	{ abbr: 'vcepresicent', name: 'Vice President' },
	{ abbr: 'member', name: 'Member L.L.C.' },
	{ abbr: 'partner', name: 'Partner' },
	{ abbr: 'other', name: 'Other' },
];

export const gender = [
	{abbr: 'M', name: 'Male'},
	{abbr: 'F', name: 'Female'}
];

export const taxes = [
	{ abbr: 'foreign', name: 'A foreign person' },
	{ abbr: 'business', name: 'A business that can claim foreign entity status' },
	{ abbr: 'none', name: 'None' },
];
