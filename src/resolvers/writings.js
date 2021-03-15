const { UserInputError } = require("apollo-server");

const Writing = require("../models/Writing");
const Author = require("../models/Author");
const { validateNotEmptyInput } = require("../utils/validators");

module.exports = {
  Query: {
    async getWritings() {
      try {
        const writings = Writing.find().sort({ createdAt: -1 });
        return writings;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createWriting(
      _,
      { writingInput: { title, collection, type, username } }
    ) {
      const writing = await Writing.findOne({ title });
      const author = await Author.findOne({ username });

      const { valid, errors } = validateNotEmptyInput({ title, username });

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
        collection,
        type,
        author: author.id,
      });

      const res = await newWriting.save();
      return {
        ...res._doc,
        id: res._id,
      };
    },
  },
};
