
export interface IFileStorageService {

    exists(storageKey: string): Promise<string>;
    
    upload(inputStream, storageKey: string): Promise<string>;
    
    download(storageKey: string): Promise<any>;
    
    uploadLocally(storageKey: string, localFilePath?: string): Promise<string>;
    
    downloadLocally(storageKey: string, localFilePath: string): Promise<string>;

    rename(existingStorageKey: string, newFileName: string): Promise<boolean>;

    getShareableLink(storageKey: string, durationInMinutes: number): string;

    delete(storageKey: string): Promise<boolean>;
}
