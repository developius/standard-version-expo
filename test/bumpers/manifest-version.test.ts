import * as stub from '../stub';
import { readVersion, writeVersion } from '../../src/bumpers/manifest-version';
import { parse } from '../../src/expo';

describe('readVersion', () => {
	it('returns version from manifest', () => {
		expect(readVersion(stub.manifestRaw)).toBe(
			stub.manifest().expo.version,
		);
	});

	it('returns empty string by default', () => {
		const manifest = stub.manifest();
		delete manifest.expo.version;

		expect(readVersion(JSON.stringify(manifest))).toBe('');
	});
});

describe('writeVersion', () => {
	it('returns manifest with modified version', () => {
		const modified = writeVersion(stub.manifestRaw, '3.2.1');

		expect(readVersion(modified)).toBe('3.2.1');
	});

	it('returns manifest with added version', () => {
		const manifest = stub.manifest();
		delete manifest.expo.version;
		const modified = writeVersion(JSON.stringify(manifest), '1.2.3');

		expect(readVersion(modified)).toBe('1.2.3');
		expect(parse(modified).expo.runtimeVersion).toBe('1.2.3');
	});

	it('returns manifest with added runtimeVersion when a policy is not specified', () => {
		const manifest = stub.manifest();
		manifest.expo.runtimeVersion = "1.2.0";

		const modified = writeVersion(JSON.stringify(manifest), '1.2.3');
		expect(parse(modified).expo.runtimeVersion).toBe('1.2.3');
	})

	it('returns manifest with added runtimeVersion when a policy is specified', () => {
		const manifest = stub.manifest();
		// @ts-expect-error
		manifest.expo.runtimeVersion = { policy: "nativeVersion" };

		const modified = writeVersion(JSON.stringify(manifest), '1.2.3');
		expect(parse(modified).expo.runtimeVersion).toStrictEqual({ policy: "nativeVersion" });
	})
});
