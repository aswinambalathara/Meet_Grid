export default interface IEventCategory {
  readonly _id?: string;
  categoryName: string;
  categoryType: "Professional" | "General";
  description?: string;
}
