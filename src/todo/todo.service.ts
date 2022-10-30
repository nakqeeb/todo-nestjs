import { UpdateStatusDto } from './dto/update-status.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto, userId: Types.ObjectId) {
    const todo = await this.todoModel.create({ ...createTodoDto, userId });
    if (!todo) {
      throw new NotAcceptableException();
    }
    return todo;
  }

  async findAll(userId: string) {
    const todoItems = await this.todoModel.find({ userId });
    if (!todoItems) {
      throw new NotFoundException();
    }
    return todoItems;
  }

  async findOne(todoId: string, userId: string) {
    const todoItem = await this.todoModel.findOne({
      _id: todoId,
      userId: userId,
    });
    if (!todoItem) {
      throw new NotFoundException();
    }
    return todoItem;
  }

  async updateStatus(
    todoId: string,
    userId: string,
    updateStatusDto: UpdateStatusDto,
  ) {
    const updatedStatus = await this.todoModel.updateOne(
      {
        _id: todoId,
        userId: userId,
      },
      updateStatusDto,
    );
    console.debug(updatedStatus);
    if (updatedStatus.modifiedCount === 0) {
      throw new NotFoundException(`No id matches ${todoId} was found`);
    }
    return updatedStatus;
  }

  async remove(todoId: string, userId: string) {
    const deletedItem = await this.todoModel.deleteOne({
      _id: todoId,
      userId: userId,
    });
    console.debug(deletedItem);
    if (deletedItem.deletedCount === 0) {
      throw new NotFoundException(`No id matches ${todoId} was found`);
    }
    return deletedItem;
  }
}
