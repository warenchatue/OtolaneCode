const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');
const Todo = require('../models/todoModel');

class TodoService {
  static async getAllTodos() {
    const db = getDB();
    const todos = await db.collection('todos').find().toArray();
    return todos;
  }

  static async createTodo(title, description) {
    const db = getDB();
    const todo = new Todo(title, description);
    const result = await db.collection('todos').insertOne(todo);
    return result;
  }

  static async updateTodo(id, updateFields) {
    const db = getDB();
    const result = await db
      .collection('todos')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateFields },
        { returnOriginal: false }
      );

    return result.value;
  }

  static async deleteTodo(id) {
    const db = getDB();
    const result = await db.collection('todos').findOneAndDelete({ _id: new ObjectId(id) });

    return result.value;
  }
}

module.exports = TodoService;
