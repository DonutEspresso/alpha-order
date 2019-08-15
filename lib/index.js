'use strict';

const assert = require('assert');
const _ = require('lodash');

/**
 * sort an array or object by alpha order.
 * @public
 * @function sort
 * @param {Object | Array} obj an object or an array
 * @param {Boolean} recursive if true, sorts all nested objs and arrays
 * @returns {Object | Array}
 */
function sort(obj, recursive) {
    const isObj = _.isPlainObject(obj);
    const isArray = _.isArray(obj);

    assert.ok(isObj || isArray, 'input must be plain js object or array');

    if (isObj) {
        // if pojo, sort keys by alpha then create a new obj
        const sortedKeys = _(obj)
            .keys()
            .sort()
            .value();

        return _.reduce(
            sortedKeys,
            function(acc, key) {
                acc[key] = obj[key];

                if (
                    recursive &&
                    (_.isPlainObject(acc[key]) || _.isArray(acc[key]))
                ) {
                    acc[key] = sort(acc[key], true);
                }

                return acc;
            },
            {}
        );
    } else {
        // array may have objects contained in it. if so, attempt to sort those
        // objects first.
        const sortedSubObj = _.map(obj, function(val) {
            return _.isPlainObject(val) ? sort(val) : val;
        });

        return _.sortBy(sortedSubObj);
    }
}

module.exports = {
    sort: sort
};
