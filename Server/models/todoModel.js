import mongoose from 'mongoose';

const { Schema } = mongoose;

const todoShema = Schema({
	date: {
		type: Date,
		default: Date.now(),
	},
	text: String,
	isCompleted: Boolean,
	isDeleted: Boolean,
});

export const todo = mongoose.model('Todo', todoShema);
