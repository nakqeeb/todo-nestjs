import { UpdateStatusDto } from './dto/update-status.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
  Patch,
  Res,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('JWT-auth') // This is the one that needs to match the name in main.ts
@ApiTags('ToDo')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createTodoDto: CreateTodoDto, @Request() req: any) {
    console.debug(req.user);
    return this.todoService.create(createTodoDto, req.user._id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Request() req: any) {
    return this.todoService.findAll(req.user._id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.todoService.findOne(id, req.user._id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
    @Request() req: any,
    @Res() res,
  ) {
    await this.todoService.updateStatus(id, req.user._id, updateStatusDto);
    return res.status(200).json({ message: 'Status updated successfully.' });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Request() req: any, @Res() res) {
    await this.todoService.remove(id, req.user._id);
    return res.status(200).json({ message: 'Item deleted successfully.' });
  }
}
