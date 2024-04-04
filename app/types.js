/**
 * @typedef {Object} Option
 * @property {string} value - The value of the option.
 * @property {string} label - The label of the option.
 */

/**
 * @typedef {Object} RangeParam
 * @property {string} key - The key of the parameter.
 * @property {number} [value] - The current value of the parameter.
 * @property {number} [min] - The minimum value of the parameter.
 * @property {number} [max] - The maximum value of the parameter.
 * @property {number} [step] - The step value of the parameter.
 * @property {number[]} [values] - The available values for the parameter.
 */

/**
 * @typedef {Object} SelectParam
 * @property {string} key - The key of the parameter.
 * @property {Option[]} options - The available options for the parameter.
 * @property {string} selected - The currently selected option.
 */

/**
 * @typedef {Object} Params
 * @property {RangeParam} quality - The quality parameter.
 * @property {RangeParam} batchSize - The batch size parameter.
 * @property {SelectParam} styles - The style parameter.
 * @property {SelectParam} settings - The setting parameter.
 * @property {SelectParam} backgrounds - The background parameter.
 * @property {SelectParam} moods - The mood parameter.
 * @property {SelectParam} colors - The color parameter.
 * @property {RangeParam} gender - The gender of the character.
 * @property {RangeParam} age - The age of the character.
 * @property {RangeParam} bodyStructure - The body structure of the character.
 * @property {SelectParam} race - The race of the character
 * @property {SelectParam} ethnicity - The ethnicity of the character.
 * @property {SelectParam} class - The class of the character.
 * @property {SelectParam} armor - The armor of the character.
 * @property {SelectParam} hairStyle - The hairstyle of the character.
 * @property {SelectParam} hairColor - The hair color of the character.
 */