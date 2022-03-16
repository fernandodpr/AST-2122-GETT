module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      stock: Int,
      titulo: String,
      estudio: String,
      categoria: string[],
      pegi: INT,
      precio: Float,
      lanzamiento: String,
      plataforma: string[]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Game = mongoose.model("game", schema);
  return Game;
};
