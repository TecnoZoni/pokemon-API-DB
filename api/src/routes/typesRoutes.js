const { Router } = require("express");

const { getPokemonsType } = require("../handlers/typesHandler");

const typesRouter = Router();

typesRouter.get("/", getPokemonsType);

module.exports = typesRouter;