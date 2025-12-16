declare global {
    interface ElectronPrintArgs {
        resultIds: string[];
    }

    interface ElectronAPI {
        printReceipt: (args: ElectronPrintArgs) => Promise<{ ok: boolean; reason?: string }>;
    }

    interface Window {
        electronAPI?: ElectronAPI;
    }
}

export { };