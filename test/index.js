'use strict';

// external modules
const assert = require('chai').assert;

// internal files
const alpha = require('../lib');

describe('alpha-order', function () {
    it('should sort simple pojo', function () {
        const unsorted = {
            b: 2,
            a: 1
        };
        const sorted = alpha.sort(unsorted);

        assert.deepEqual(sorted, unsorted);
        assert.equal(JSON.stringify(sorted), '{"a":1,"b":2}');
    });

    it('should sort simple array', function () {
        const unsorted = ['c', 'b', 'a'];
        const sorted = alpha.sort(unsorted);

        assert.deepEqual(sorted, ['a', 'b', 'c']);
    });

    it('should sort nested objects in arrays', function () {
        const unsorted = [
            { b: 2, a: 1 },
            { d: 4, c: 3 }
        ];
        const sorted = alpha.sort(unsorted);

        assert.deepEqual(sorted, unsorted);
        assert.equal(JSON.stringify(sorted), '[{"a":1,"b":2},{"c":3,"d":4}]');
    });

    it('should fail to sort a Class', function () {
        assert.throws(
            function () {
                alpha.sort(new Error('boom'));
            },
            assert.AssertionError,
            'input must be plain js object or array'
        );
    });

    it('should not sort simple pojo recursively', function () {
        const unsorted = {
            b: ['c', 'b', 'a'],
            a: {
                foo: {
                    ib: 2,
                    ia: 1
                },
                bar: 2
            }
        };
        const sorted = alpha.sort(unsorted, false);

        assert.deepEqual(sorted, unsorted);
        assert.equal(
            JSON.stringify(sorted),
            '{"a":{"foo":{"ib":2,"ia":1},"bar":2},"b":["c","b","a"]}'
        );
    });

    it('should sort simple pojo recursively', function () {
        const unsorted = {
            b: ['c', 'b', 'a'],
            a: {
                zebra: [
                    {
                        id: 2,
                        ic: 1
                    }
                ],
                foo: {
                    ib: 2,
                    ia: 1
                },
                bar: 2
            }
        };
        const sorted = alpha.sort(unsorted, true);

        assert.equal(
            JSON.stringify(sorted),
            '{"a":{"bar":2,"foo":{"ia":1,"ib":2},' +
                '"zebra":[{"ic":1,"id":2}]},' +
                '"b":["a","b","c"]}'
        );
    });
});
