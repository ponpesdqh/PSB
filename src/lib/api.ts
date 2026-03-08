export interface JenjangItem {
    label: string;
    base: string;
}

export interface PublicData {
    namaSekolah: string;
    tipeSekolah: string;
    jenjang: string;
    jenjangList: JenjangItem[];
    multiJenjang: boolean;
    tahunAjaran: string;
    logoUrl: string;
    warnaPrimer: string;
    warnaAksen: string;
    pesanSambutan: string;
    catatan: string;
    tglBuka: string;
    tglTutup: string;
    modeSederhana: boolean;
    infotesKeagamaan: string;
}

export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

export async function getPublicConfig(): Promise<PublicData | null> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
        console.error('NEXT_PUBLIC_API_URL is not set.');
        return null;
    }

    try {
        // BUG-4 FIX: `next: { revalidate }` only works in Server Components.
        // On client-side (useEffect), we use cache: 'no-store' instead.
        const isServer = typeof window === 'undefined';
        const fetchOptions: RequestInit = {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            ...(isServer ? { next: { revalidate: 60 } } as any : { cache: 'no-store' as RequestCache }),
        };

        const res = await fetch(`${apiUrl}?action=getPublicData`, fetchOptions);

        if (!res.ok) {
            console.error('Failed to fetch public data:', res.statusText);
            return null;
        }

        const json: ApiResponse<PublicData> = await res.json();
        if (json.status === 200 && json.data) {
            return json.data;
        }
        return null;
    } catch (err) {
        console.error('Network error when fetching public data:', err);
        return null;
    }
}
