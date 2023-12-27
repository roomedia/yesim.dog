import { type RequestEvent } from "@sveltejs/kit";
import { load as _load } from "./[...userId]/+page";

export const load = async (event: RequestEvent) => {
    return await _load(event);
}
