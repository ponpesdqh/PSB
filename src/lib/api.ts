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
        const res = await fetch(`${apiUrl}?action=getPublicData`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            // Revalidate every 60 seconds (ISR - Incremental Static Regeneration)
            // This means the site is still static and extremely fast, but updates dynamically at max within 1 minute of Google Sheets change.
            next: { revalidate: 60 }
        });

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
