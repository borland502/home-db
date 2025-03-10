import {
	integer,
	int,
	sqliteTable,
	text,
	sqliteView,
} from "drizzle-orm/sqlite-core";
import { IPv4 } from "ip-num";

export const nowTable = sqliteTable("now", {
	id: int("ID").notNull().unique().primaryKey({ autoIncrement: true }),
	name: text("NAME").notNull().$type<string>(),
	host_name: text("HOST_NAME").default("").$type<string>(),
	ip: text("IP").unique().$type<IPv4>(),
	mac: text("MAC").unique().$type<string>(),
	hw: text("HW").$type<string>(),
	date: text("DATE").$type<Date>(),
	known: int("KNOWN").default(0).$type<boolean>(),
	now: int("NOW").default(0).$type<boolean>(),
});

export const hostView = sqliteView("hosts").as((qb) =>
	qb
		.select({
			ip: nowTable.ip,
			host_name: nowTable.host_name,
			name: nowTable.name,
		})
		.from(nowTable)
);

export const historyTable = sqliteTable("history", {
	id: int("ID").notNull().unique().primaryKey({ autoIncrement: true }),
	host: int("HOST").default(0).$type<number>(),
	name: text("NAME").notNull().$type<string>(),
	ip: text("IP").$type<IPv4>(),
	mac: text("MAC").$type<string>(),
	hw: text("HW").$type<string>(),
	date: text("DATE").$type<Date>(),
	known: int("KNOWN").$type<boolean>(),
	state: int("STATE").$type<boolean>(),
});

export const systemTable = sqliteTable("system", {
	id: int("ID").notNull().unique().primaryKey({ autoIncrement: true }),
	manufacturer: text("manufacturer").notNull(),
	model: text("model").notNull(),
	version: text("version"),
	serial: text("serial"),
	uuid: text("uuid"),
	sku: text("sku"),
	virtual: int("virtual").notNull(),
});

export const biosTable = sqliteTable("bios", {
	id: int("ID").notNull().unique().primaryKey({ autoIncrement: true }),
	vendor: text("vendor").notNull(),
	version: text("version").notNull(),
	releaseDate: text("releaseDate").notNull(),
	revision: text("revision"),
	serial: text("serial"),
});

export const baseboardTable = sqliteTable("baseboard", {
	id: int("ID").notNull().unique().primaryKey({ autoIncrement: true }),
	manufacturer: text("manufacturer").notNull(),
	model: text("model").notNull(),
	version: text("version").notNull(),
	serial: text("serial"),
	assetTag: text("assetTag"),
	memMax: integer("memMax"),
	memSlots: integer("memSlots"),
});

export const chassisTable = sqliteTable("chassis", {
	id: int("ID").notNull().unique().primaryKey({ autoIncrement: true }),
	manufacturer: text("manufacturer").notNull(),
	model: text("model"),
	type: text("type").notNull(),
	version: text("version"),
	serial: text("serial"),
	assetTag: text("assetTag"),
	sku: text("sku"),
});

export const osTable = sqliteTable("os", {
	id: int("ID").notNull().unique().primaryKey({ autoIncrement: true }),
	platform: text("platform").notNull(),
	distro: text("distro").notNull(),
	release: text("release").notNull(),
	codename: text("codename").notNull(),
	kernel: text("kernel").notNull(),
	arch: text("arch").notNull(),
	hostname: text("hostname").notNull(),
	fqdn: text("fqdn").notNull(),
	codepage: text("codepage").notNull(),
	logofile: text("logofile").notNull(),
	serial: text("serial").notNull(),
	build: text("build").notNull(),
	servicepack: text("servicepack"),
	uefi: int("uefi").notNull(),
});

export const uuidTable = sqliteTable("uuid", {
	id: int("ID").notNull().unique().primaryKey({ autoIncrement: true }),
	os: text("os").notNull(),
	hardware: text("hardware"),
});

export const macTable = sqliteTable("mac", {
	id: int("ID").notNull().unique().primaryKey({ autoIncrement: true }),
	uuidId: int("uuidId").notNull(),
	mac: text("mac").notNull(),
});

export const versionTable = sqliteTable("version", {
	id: int("ID").notNull().unique().primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	version: text("version").notNull(),
});

export const cpuTable = sqliteTable("cpu", {
	id: int("ID").notNull().unique().primaryKey({ autoIncrement: true }),
	manufacturer: text("manufacturer").notNull(),
	brand: text("brand").notNull(),
	vendor: text("vendor").notNull(),
	family: text("family").notNull(),
	model: text("model").notNull(),
	stepping: text("stepping").notNull(),
	revision: text("revision"),
	voltage: text("voltage"),
	speed: integer("speed").notNull(),
	speedMin: integer("speedMin").notNull(),
	speedMax: integer("speedMax").notNull(),
	governor: text("governor").notNull(),
	cores: integer("cores").notNull(),
	physicalCores: integer("physicalCores").notNull(),
	performanceCores: integer("performanceCores").notNull(),
	efficiencyCores: integer("efficiencyCores").notNull(),
	processors: integer("processors").notNull(),
});
