// @desc Get all test objects
// @route GET /api/test
// @access PUBLIC
export const getAll = (req, res) => {
  res.status(200).json({ msg: "Get Test Objects" });
}

// @desc Get test object
// @route GET /api/test/:id
// @access PUBLIC
export const get = (req, res) => {
  res.status(200).json({ msg: `Get Test Object ${req.params.id}` });
}

// @desc Post test object
// @route POST /api/test
// @access PRIVATE
export const add = (req, res) => {
  res.status(201).json({ msg: "Set Test Object" });
}

// @desc Update test object
// @route PUT /api/test/:id
// @access PRIVATE
export const update = (req, res) => {
  res.status(200).json({ msg: `Update Test Object ${req.params.id}` });
}

// @desc Remove test object
// @route DELETE /api/test/:id
// @access PRIVATE
export const remove = (req, res) => {
  res.status(200).json({ msg: `Delete Test Object ${req.params.id}` });
}
