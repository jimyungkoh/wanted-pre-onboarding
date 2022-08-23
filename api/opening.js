const express = require('express');
const openingService = require('../service/openingService');
const companyService = require('../service/companyService');

const router = express.Router();

/**
 * 요구사항 1. 채용공고 등록
 */
router.post('/',
  async (req, res, next) => {
    const company_id = req.body.company_id;
    const info = req.body;

    try {
      await companyService.validateCompanyId(company_id)

      res.status(201).json(await openingService.postOpening(info));
    } catch (e) {
      next(e);
    }
  }
);

/**
 * 요구사항 2. 채용공고 수정
 */
router.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  const contents = req.body;

  try {
    await openingService.validateOpeningId(id);

    res.status(200).json(await openingService.updateOpening(id, contents));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
