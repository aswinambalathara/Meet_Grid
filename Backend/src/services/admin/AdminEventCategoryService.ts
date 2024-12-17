import { IEventCategory } from "../../interfaces/entities/IEvent";
import IEventCategoryRepository from "../../interfaces/repository/IEventCategoryRepository";
import { response, StatusCode } from "../../types/index";
import CustomError from "../../utils/CustomError";
import JoiService from "../../utils/validatorService";

export default class AdminEventCategoryService {
  constructor(
    private categoryRepository: IEventCategoryRepository,
    private validatorService: JoiService
  ) {}

  async create(eventCategory: IEventCategory): Promise<response> {
    this.validatorService.validateRequiredFields({
      categoryName: eventCategory.categoryName,
      categoryType: eventCategory.categoryType,
    });

    const isExist = await this.categoryRepository.findByName(
      eventCategory.categoryName!
    );
    if (isExist) {
      throw new CustomError(
        "Category already exist with same name",
        StatusCode.Conflict
      );
    }
    await this.categoryRepository.create(eventCategory);
    return { status: true, message: "event Category created" };
  }

  async getEventCategory(categoryId: string): Promise<IEventCategory> {
    this.validatorService.validateIdFormat(categoryId);
    const eventCategory = await this.categoryRepository.findById(categoryId);
    if (!eventCategory) {
      throw new CustomError("Event category not found", StatusCode.NotFound);
    }
    return eventCategory;
  }

  async getAllCategories(): Promise<IEventCategory[]> {
    return await this.categoryRepository.findAll();
  }

  async update(
    categoryId: string,
    eventCategory: Partial<IEventCategory>
  ): Promise<response> {
    this.validatorService.validateIdFormat(categoryId);
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      throw new CustomError("Category not found", StatusCode.NotFound);
    }
    await this.categoryRepository.update(categoryId, eventCategory);

    return { status: true, message: "Event Category Updated" };
  }

  async delete(categoryId: string): Promise<response> {
    this.validatorService.validateIdFormat(categoryId);
    const isExist = await this.categoryRepository.findById(categoryId);
    if (!isExist) {
      throw new CustomError("Category not found", StatusCode.NotFound);
    }
    await this.categoryRepository.delete(categoryId);
    return { message: "Event category deleted", status: true };
  }
  
}
