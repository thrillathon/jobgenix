import { redis } from "@/lib/redis";

type Degree = {
    name: string;
    id: string;
};

export type DegreesGroupedByField = {
    field: string;
    degrees: Degree[];
};

type DegreeObject = { value: string; label: string }[] | DegreesGroupedByField[]

    export async function setCacheDegrees(obj: DegreeObject, forUpload: boolean = false) {
        if (forUpload) await redis.set("degressUploadFormat", obj);
        else await redis.set("degrees", obj);
    }

export async function getCacheDegrees(forUpload: boolean=false): Promise<DegreeObject> {
    if(forUpload) return await redis.get("degressUploadFormat") as DegreeObject
    else return await redis.get("degrees") as DegreeObject
}