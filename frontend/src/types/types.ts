export type MessageSender = 'user' | 'model' | 'system';

export const MessageSender = {
    USER: 'user' as MessageSender,
    MODEL: 'model' as MessageSender,
    SYSTEM: 'system' as MessageSender,
};

export interface UrlContextMetadataItem {
    retrievedUrl: string; // Changed from retrieved_url
    urlRetrievalStatus: string; // Changed from url_retrieval_status
}

export interface ChatMessage {
    id: string;
    text: string;
    sender: MessageSender;
    timestamp: Date;
    isLoading?: boolean;
    urlContext?: UrlContextMetadataItem[];
}

export interface URLGroup {
    id: string;
    name: string;
    urls: string[];
}
