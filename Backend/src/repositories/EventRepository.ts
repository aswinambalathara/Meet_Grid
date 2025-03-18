/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import IEvent from "../interfaces/entities/IEvent";
import IEventRepository from "../interfaces/repository/IEventRepository";
import EventModel from "../models/EventModel";
import { EventFilter } from "../types";

export default class EventRepository implements IEventRepository {
  private model = EventModel;

  async findByCategory(categoryId: string): Promise<IEvent | null> {
    return await this.model.findOne({ category: categoryId });
  }
  async findById(id: string): Promise<IEvent | null> {
    return await this.model.findById(id).populate('organizer','fullName image email phone bio professionalInfo.linkedinUrl','user').exec()
  }
  async findAll(): Promise<IEvent[]> {
    return await this.model.find().populate('category').exec()
  }
  async create(event: IEvent): Promise<IEvent> {
    const newEvent = new this.model(event);
    return await newEvent.save();
  }
  async update(id: string, event: Partial<IEvent>): Promise<IEvent | null> {
    return await this.model.findByIdAndUpdate(id, event, { new: true });
  }
  async delete?(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
  async find(filters: Partial<IEvent>): Promise<IEvent | null> {
    return await this.model.findOne({ filters });
  }
  async findEvents(filters: EventFilter): Promise<IEvent[]> {
    //console.log(filters);
    const pipeline: any[] = [];


    if (filters.coordinates) {
      pipeline.push({
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              parseFloat(filters.coordinates.longitude),
              parseFloat(filters.coordinates.latitude),
            ],
          },
          distanceField: "distance",
          spherical: true,
          maxDistance: filters.maxDistance || 500000,
          query: { eventType: { $ne: "Online" } },
        },
      });
    }

    const date = new Date()
    const physicalMatch: Record<string, any> = {};

    physicalMatch['endDate'] = {$gt:date};

    if (filters.categoryGroup) {
      physicalMatch["category.categoryType"] = filters.categoryGroup;
    }

    if (filters.category) {
      physicalMatch["category._id"] = new mongoose.Types.ObjectId(filters.category);
    }

    if (filters.eventType) {
      physicalMatch["eventType"] = filters.eventType;
    }

    if (filters.search) {
      const searchRegex = new RegExp(filters.search, "i");

      physicalMatch.$or = [
        { title: searchRegex },
        { "location.venueName": searchRegex },
        { "location.city": searchRegex },
        { "location.state": searchRegex },
      ];
    }

    pipeline.push(
      {
        $lookup: {
          from: "eventcategories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $match: physicalMatch,
      }
    );

    const onlinePipeline = [
      { $match: { eventType: "Online" } },
      {
        $lookup: {
          from: "eventcategories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      { $match: physicalMatch },
    ];

    pipeline.push({
      $unionWith: {
        coll: "events",
        pipeline: onlinePipeline,
      },
    });
    //projection

    pipeline.push({
      $project: {
        title: 1,
        _id: 1,
        description: 1,
        "catgory.categoryName": 1,
        "category.categoryType": 1,
        startDate: 1,
        endDate: 1,
        eventType: 1,
        eventBanner: 1,
        ticket: 1,
        distance: 1,
      },
    });

    //console.log(pipeline);
    const result = await this.model.aggregate(pipeline);
    //console.log(result);
    return result;
  }
}
