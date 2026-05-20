import { z } from "zod/v4";
export declare const citizensTable: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "citizens";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "citizens";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "citizens";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        ageGroup: import("drizzle-orm/pg-core").PgColumn<{
            name: "age_group";
            tableName: "citizens";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        cohortId: import("drizzle-orm/pg-core").PgColumn<{
            name: "cohort_id";
            tableName: "citizens";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        registeredAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "registered_at";
            tableName: "citizens";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const insertCitizenSchema: z.ZodObject<{
    name: z.ZodString;
    ageGroup: z.ZodString;
    cohortId: z.ZodOptional<z.ZodNullable<z.ZodInt>>;
}, {
    out: {};
    in: {};
}>;
export type InsertCitizen = z.infer<typeof insertCitizenSchema>;
export type Citizen = typeof citizensTable.$inferSelect;
//# sourceMappingURL=citizens.d.ts.map