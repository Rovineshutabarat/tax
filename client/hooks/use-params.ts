import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Params } from "@/types/params";

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;

export function useParams<
    T extends Record<string, any> = Record<string, any>,
>() {
    const router = useRouter();
    const currentParams = useSearchParams();

    const parseNumber = useCallback((value: string | null, fallback = 0) => {
        if (value === null) return fallback;
        const num = Number(value);
        return isNaN(num) ? fallback : num;
    }, []);

    const parseString = useCallback((value: string | null, fallback?: string) => {
        return value ?? fallback;
    }, []);

    const parseParams = (searchParams: URLSearchParams): Params<T> => {
        const body: any = {};
        searchParams.forEach((value, key) => {
            if (key !== "page" && key !== "size" && key !== "keyword") {
                body[key] = value;
            }
        });

        return {
            page: parseNumber(currentParams.get("page"), DEFAULT_PAGE),
            size: parseNumber(currentParams.get("size"), DEFAULT_SIZE),
            keyword: parseString(currentParams.get("keyword"), ""),
            body: body as T,
        };
    };

    const getParams = useMemo(() => parseParams(currentParams), [currentParams]);

    function getQueryString() {
        return currentParams.toString();
    }

    const setParams = useCallback(
        (params: Partial<Params<T>>) => {
            const searchParams = new URLSearchParams(currentParams.toString());

            function handleValue(prefix: string, value: any) {
                if (value === undefined || value === null || value === "") {
                    searchParams.delete(prefix);
                } else if (typeof value === "object" && !Array.isArray(value)) {
                    Object.entries(value).forEach(([key, val]) => {
                        handleValue(key, val);
                    });
                } else {
                    searchParams.set(prefix, String(value));
                }
            }

            Object.entries(params).forEach(([key, value]) => {
                handleValue(key, value);
            });

            const newQuery = searchParams.toString();
            router.push(newQuery ? `?${newQuery}` : "?");
        },
        [router, currentParams],
    );

    const resetParams = useCallback(() => {
        router.push("?");
    }, [router]);

    return useMemo(
        () => ({
            getParams,
            getQueryString,
            setParams,
            resetParams,
        }),
        [setParams, resetParams],
    );
}