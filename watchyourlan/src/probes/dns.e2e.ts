import { test, expect } from "playwright/test";
import { reverseLookup } from "./dns";
import { IPv4 } from "ip-num";

test.describe("reverseLookup Example Tests with Playwright", () => {
	test("should correctly resolve a known public hostname", async ({}) => {
		test.setTimeout(10000);
		// Using a well-known IP address with a known hostname (Google's public DNS)
		const ip = new IPv4("8.8.8.8");
		const hostnames = await reverseLookup(ip);

		// We expect at least one hostname to be returned and it should likely contain "google"
		expect(hostnames.length).toBeGreaterThan(0);
		expect(hostnames[0].toLowerCase()).toContain("google");
	});

	test("should correctly handle an IP with no known hostname", async ({}) => {
		test.setTimeout(10000);
		//Using a very unlikely private IP address
		const ip = new IPv4("192.168.254.254");
		const hostnames = await reverseLookup(ip);

		// We expect an empty string as there is no record
		expect(hostnames.length).toBe(1);
		expect(hostnames[0]).toEqual("");
	});

	test("should handle multiple IPs", async ({}) => {
		test.setTimeout(10000);
		const ips = [
			new IPv4("8.8.8.8"),
			new IPv4("1.1.1.1"),
			new IPv4("192.168.254.254"),
		];
		const hostnames = await reverseLookup(ips);
		expect(hostnames.length).toBe(3);
		expect(hostnames[0].toLowerCase()).toContain("dns.google");
		expect(hostnames[1].toLowerCase()).toContain("cloudflare");
		expect(hostnames[2]).toEqual("");
	});
});
