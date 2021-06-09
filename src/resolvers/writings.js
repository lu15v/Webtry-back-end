const { UserInputError } = require("apollo-server");

const Writing = require("../models/Writing");
const Author = require("../models/Author");
const { validateInput } = require("../utils/validators");

module.exports = {
  Query: {
    async getWritings() {
      try {
        const writings = await Writing.find().sort({ createdAt: -1 }).populate("author");
        return writings;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getWritingsByAuthor(_, { username }) {
      try {
        const author = await Author.findById(username);
        if (!author) {
          throw new UserInputError(
            "username not registered, please check and try again later",
            {
              errors: {
                author: "Author not found",
              },
            }
          );
        }

        const writings = await Writing.find({ author: author._id }).populate("author");
        
        return writings;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getWritingsByCompilation(_, { compilation }) {
      try {
        const writings = await Writing.find({ compilation }).populate("author");

        return writings;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getWritingById(_, { writingId }) {
      try {
        const writing = await Writing.findById(writingId).populate("author");

        if (writing) {
          return writing;
        }

        throw new UserInputError("Writing not registered", {
          errors: {
            writing: `Writing with the ID: ${writingId} was not found, check and try again`,
          },
        });
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createWriting(
      _,
      { writingInput: { title, body, compilation, type, username, createdAt } }
    ) {
      const writing = await Writing.findOne({ title });
      const author = await Author.findOne({ username });

      const { valid, errors } = validateInput({
        title,
        username,
        body,
      });

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      if (!author) {
        throw new UserInputError(`author not registered`, {
          errors: {
            username: `Author not found, please check if the author with the username: ${username} is registered`,
          },
        });
      }

      if (writing) {
        throw new UserInputError(
          `Writing '${title}' by '${username}' is already defined`,
          {
            errors: {
              title: "title already defined by author",
            },
          }
        );
      }

      const newWriting = new Writing({
        title,
        body,
        compilation,
        type,
        author: author.id,
        createdAt: createdAt ? new Date(createdAt).toISOString() : new Date().toISOString()
      });

      const res = await newWriting.save();
      return {
        ...res._doc,
        id: res._id,
      };
    },
    async updateViews(_, { writingId }) {
      try {
        const writing = await Writing.findById(writingId);
        writing.views += 1;
        writing.save();
        return writing.views;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
