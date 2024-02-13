export interface IApod {
    copyright?: string;
    date:Date,
    explanation:Text,
    hdurl: string,
    media_type: string; 
    service_version: string; 
    title: string
    url: string,
  }

export interface savedData extends Omit<IApod, 'service_version' | 'media_type'> {
    id:number,
    responseId:number,
    mediaType: string;
    serviceVersion: number;
    createdAt:Date,
    updatedAt:Date
}  


export interface FetchApodOptions {
    date?: string;         
    start_date?: string;   
    end_date?: string;     
    count?: number;
    thumbs?: boolean;
}
    
    