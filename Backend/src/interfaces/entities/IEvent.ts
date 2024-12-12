export default interface IEvent{
    readonly _id?:string,
    eventTitle:string,
    eventDescription:string,
    eventCategory:string,
    eventType:string,
    eventDate:Date,
    eventTime:string,
    
}