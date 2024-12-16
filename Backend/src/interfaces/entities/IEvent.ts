export default interface IEvent{
    readonly _id?:string,
    eventTitle:string,
    eventDescription:string,
    eventCategory:string,
    eventType:string,
    eventDate:Date,
    eventTime:string,
    
}

export interface IEventCategory{
    readonly _id?:string,
    categoryName?:string,
    categoryType?: 'professional' | 'general'
    description?:string,
    createdAt?:Date
}