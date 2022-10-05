/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export function getEnvVarWithPrefix(prefix: string): {
	[k: string]: string | undefined;
} {

	return Object.fromEntries(Object.entries(process.env)
		.filter(([key]) => key.includes(prefix))
		.filter(([_, value]) => !(value === null || value === undefined || value.length === 0)));
}

/**
 * Use this to convert a key-value object of "[PREFIX_MY_OPTION, value]" to "--my-option=value".
 */
export function parseEnvVarAsArg(prefix: string, env: {
	[k: string]: string | undefined;
}): string[] {

	return Object.keys(env).map(key => {

		const name = key.replace(prefix, '')
			.replace(new RegExp('_', 'g'), '-');

		const arg = name.concat('=')
			.concat(env[key]!)
			.toLowerCase();
		return '--' + arg;

	});
}
