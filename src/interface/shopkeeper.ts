import { Shopkeeper } from "@/drizzle/type";

export type ShopkeeperWithFamilyIdAndName = Shopkeeper & {
    family: {
        name: string;
    }
}