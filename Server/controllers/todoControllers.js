import { todo } from '../models/todoModel.js';

export const todoControllers = {
	getAll: (req, res) => {
		todo.find({}, function (err, docs) {
			if (!err) {
				res.json(docs);
			} else {
				res.status(500).json(err);
			}
		});
	},
	add: (req, res) => {
		let newProduct = new todo({
			date: req.body.date,
			text: req.body.text,
		});

		newProduct.save(function (err, doc) {
			if (!err) {
				res.json(doc);
			} else {
				res.status(500).json(err);
			}
		});
	},
	getById: (req, res) => {
		let id = req.params.id;
		todo.findById(id, (err, doc) => {
			if (!err) {
				res.json(doc);
			} else {
				res.status(500).json(err);
			}
		});
	},
	delete: (req, res) => {
		let id = req.params.id;
		todo.findByIdAndDelete(id, (err, doc) => {
			if (!err) {
				res.json(doc);
			} else {
				res.status(500).json(err);
			}
		});
	},
	update: (req, res) => {
		let id = req.params.id;
		let newProduct = new todo({
			_id: id,
			date: Date.now(),
			text: req.body.text,
			isCompleted: true,
		});
		todo.findByIdAndUpdate(id, newProduct, { runValidators: true }, (err, doc) => {
			if (!err) {
				res.json(newProduct);
			} else {
				res.status(500).json(err);
			}
		});
	},
};
