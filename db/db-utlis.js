import client from "./db-client.js";

const addEntity = async (name, obj) => {
  return await client.db("PasswordReset").collection(name).insertOne(obj);
};

const deleteEntity = async (name, mail) => {
  return await client
    .db("PasswordReset")
    .collection(name)
    .deleteMany({ email: mail });
};

const findEntity = async (name, mail) => {
  return await client
    .db("PasswordReset")
    .collection(name)
    .findOne({ email: mail });
};

const updateEntity = async (name, obj) => {
  return await client
    .db("PasswordReset")
    .collection(name)
    .updateOne({ email: obj.email }, { $set: { password: obj.password } });
};

export { addEntity, deleteEntity, findEntity, updateEntity };
