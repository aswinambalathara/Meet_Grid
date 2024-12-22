import { IEventCategory } from "../../interfaces/entities/IEvent";
import IEventCategoryRepository from "../../interfaces/repository/IEventCategoryRepository";
import { payloadResponse, response, StatusCode } from "../../types/index";
import CustomError from "../../utils/CustomError";
import JoiService from "../../utils/validatorService";

export default class AdminEventCategoryService {
  constructor(
    private categoryRepository: IEventCategoryRepository,
    private validatorService: JoiService
  ) {}

  async create(eventCategory: IEventCategory): Promise<payloadResponse> {
    this.validatorService.validateRequiredFields({
      categoryName: eventCategory.categoryName,
      categoryType: eventCategory.categoryType,
    });

    const isExist = await this.categoryRepository.findByName(
      eventCategory.categoryName!
    );

    if (isExist && !isExist.isDeleted) {
      throw new CustomError(
        "Category already exist with same name",
        StatusCode.Conflict
      );
    }

    if (isExist?.isDeleted) {
      eventCategory.isDeleted = false;
      const result = await this.categoryRepository.update(
        isExist.id,
        eventCategory
      );
      return {
        status: true,
        message: "event Category reactivated",
        data: result!,
      };
    }

    const result = await this.categoryRepository.create(eventCategory);
    return { status: true, message: "event Category created", data: result };
  }

  async getEventCategory(categoryId: string): Promise<IEventCategory> {
    this.validatorService.validateIdFormat(categoryId);
    const eventCategory = await this.categoryRepository.findById(categoryId);
    if (!eventCategory || eventCategory.isDeleted) {
      throw new CustomError("Event category not found", StatusCode.NotFound);
    }
    return eventCategory;
  }

  async getAllCategories(): Promise<IEventCategory[]> {
    return await this.categoryRepository.findAll();
  }

  async update(eventCategory: Partial<IEventCategory>): Promise<response> {
    console.log(eventCategory);
    const { _id, categoryName } = eventCategory;
    this.validatorService.validateIdFormat(_id as string);
    const category = await this.categoryRepository.findByName(categoryName!);

    if (category && category.id !== _id && !category.isDeleted) {
      throw new CustomError("Category already exist", StatusCode.Conflict);
    }

    if (category?.isDeleted && category.id !== _id) {
      await this.categoryRepository.delete(category.id);
    }
    await this.categoryRepository.update(_id as string, eventCategory);

    return { status: true, message: "Event Category Updated" };
  }

  async delete(categoryId: string): Promise<response> {
    this.validatorService.validateIdFormat(categoryId);
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new CustomError("Category not found", StatusCode.NotFound);
    }
    category.isDeleted = true;
    await category.save();
    return { message: "Event category soft deleted", status: true };
  }
}
