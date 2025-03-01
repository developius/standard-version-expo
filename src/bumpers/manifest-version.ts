import { parse, serialize } from '../expo';
import { VersionReader, VersionWriter } from '../types';

/**
 * Read the manifest version from the `expo.version` property.
 */
export const readVersion: VersionReader = (contents) => (
	parse(contents).expo.version || ''
);

/**
 * Write the manifest version to the `expo.version` and `expo.runtimeVersion` properties.
 */
export const writeVersion: VersionWriter = (contents, version) => {
	const manifest = parse(contents);
	manifest.expo.version = version;

	if (typeof manifest.expo.runtimeVersion !== "object") {
		manifest.expo.runtimeVersion = version;
	}

	return serialize(manifest, contents);
};
