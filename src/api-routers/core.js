import { ResultCommit } from "../models/core.js";

import { authenticateToken } from "../utils/index.js";

/* - - - - - - - - - - - - - - - - - - - - - - */

export function coreRouter(router) {
  router.get("/", authenticateToken, async (req, res) => {
    const resultCommitmentRecords = await ResultCommit.find({
      owner: req.user.id,
    });

    res.send(resultCommitmentRecords);
  });

  router.post("/result-commit", authenticateToken, async (req, res) => {
    if (!req.body.count || !req.body.kind) {
      res.status(400).send({ message: "count and kind fields are required!" });
      return;
    }

    const record = new ResultCommit({
      ...req.body,
      owner: req.user.id,
    });

    try {
      const data = await record.save(record);
      res.send(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Record.",
      });
    }
  });

  router.delete("/:recordId", authenticateToken, async (req, res) => {
    try {
      const note = await ResultCommit.findByIdAndRemove(req.params.recordId);

      if (!note) {
        return res.sendStatus(404);
      }
      res.sendStatus(204);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  return router;
}
